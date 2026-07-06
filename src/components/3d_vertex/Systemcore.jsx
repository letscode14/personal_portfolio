import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Knot({ interactive }) {
    const mesh = useRef()
    const inner = useRef()
    const group = useRef()
    const target = useRef({ x: 0, y: 0 })

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += 0.08 * delta
            mesh.current.rotation.y += 0.12 * delta
        }
        if (inner.current) {
            inner.current.rotation.x -= 0.05 * delta
            inner.current.rotation.y -= 0.09 * delta
        }
        if (interactive && group.current) {
            target.current.x = state.pointer.y * 0.25
            target.current.y = state.pointer.x * 0.25
            group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.03
            group.current.rotation.y += (target.current.y - group.current.rotation.y) * 0.03
        }
    })

    return (
        <group ref={group}>
            <mesh ref={mesh}>
                <torusKnotGeometry args={[1, 0.32, 160, 20, 2, 3]} />
                <meshBasicMaterial color="#0b0b0a" wireframe transparent opacity={0.55} />
            </mesh>
            <mesh ref={inner} scale={0.6}>
                <torusKnotGeometry args={[1, 0.32, 100, 14, 2, 3]} />
                <meshBasicMaterial color="#0b0b0a" wireframe transparent opacity={0.25} />
            </mesh>
        </group>
    )
}

export default function SystemCore({ interactive = false }) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 5.4], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
                <Knot interactive={interactive} />
            </Canvas>
        </div>
    )
}