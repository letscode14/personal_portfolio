import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'

// Distribute node points evenly on a sphere using a golden-spiral,
// then connect each node to its nearest neighbours -> reads like a
// literal automation/integration graph rather than a generic shape.
function useGraph(count, radius) {
  return useMemo(() => {
    const points = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      points.push([
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ])
    }

    const edges = []
    for (let i = 0; i < points.length; i++) {
      const dists = points
        .map((p, j) => ({ j, d: i === j ? Infinity : dist(points[i], p) }))
        .sort((a, b) => a.d - b.d)
      const nearest = dists.slice(0, 2)
      nearest.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!edges.find((e) => e.key === key)) {
          edges.push({ key, a: points[i], b: points[j] })
        }
      })
    }
    return { points, edges }
  }, [count, radius])
}

function dist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
}

const LABELS = ['GHL', 'Vapi', 'n8n', 'Make', 'Zapier', 'Webhooks']

function Node({ position, label, showLabel }) {
  return (
    <group position={position}>
      <mesh>
        <icosahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color="#0b0b0a" wireframe={false} />
      </mesh>
      {label && showLabel && (
        <Html distanceFactor={8} zIndexRange={[0, 0]} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: '#0b0b0a',
              whiteSpace: 'nowrap',
              transform: 'translate(10px, -8px)',
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

function Graph({ interactive = true, count = 22, radius = 1.6, autoRotateSpeed = 0.08 }) {
  const group = useRef()
  const { points, edges } = useGraph(count, radius)
  const target = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += autoRotateSpeed * delta
    if (interactive) {
      target.current.x = state.pointer.y * 0.25
      target.current.y = state.pointer.x * 0.25
      group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.03
      group.current.rotation.z += (target.current.y * 0.2 - group.current.rotation.z) * 0.03
    }
  })

  return (
    <group ref={group}>
      {edges.map((e) => (
        <Line key={e.key} points={[e.a, e.b]} color="#0b0b0a" lineWidth={0.6} transparent opacity={0.35} />
      ))}
      {points.map((p, i) => (
        <Node key={i} position={p} label={LABELS[i % LABELS.length]} showLabel={interactive && i < LABELS.length} />
      ))}
    </group>
  )
}

export default function AutomationGraph({ interactive = true, className = '' }) {
  const [ready, setReady] = useState(false)
  return (
    <div className={className} style={{ width: '100%', height: '100%', opacity: ready ? 1 : 0, transition: 'opacity 0.8s ease' }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        onCreated={() => setReady(true)}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Graph interactive={interactive} />
      </Canvas>
    </div>
  )
}
