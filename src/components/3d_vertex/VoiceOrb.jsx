import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Wireframe icosahedron that breathes with organic noise — an abstract
 * stand-in for a "listening" voice agent. Pure line art so it sits
 * naturally in a b/w editorial system.
 *
 * Props:
 *   active   — bool. When true, amplitude + rotation speed increase
 *              (drive this from Vapi's onSpeechStart/onSpeechEnd events).
 *   color    — line color, defaults to white (use on a dark panel).
 */
export default function VoiceOrb({ active = false, color = '#f2f2f0' }) {
  const mountRef = useRef(null)
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 4.4)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Base geometry — subdivided icosahedron gives an even, organic vertex spread
    const geometry = new THREE.IcosahedronGeometry(1.5, 4)
    const posAttr = geometry.attributes.position
    const basePositions = Float32Array.from(posAttr.array)

    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    })
    const orb = new THREE.Mesh(geometry, material)
    scene.add(orb)

    // A second, larger faint shell for depth
    const shellGeometry = new THREE.IcosahedronGeometry(1.9, 1)
    const shellMaterial = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    })
    const shell = new THREE.Mesh(shellGeometry, shellMaterial)
    scene.add(shell)

    // cheap 3D pseudo-noise (no external noise lib needed)
    const noise = (x, y, z, t) =>
      Math.sin(x * 2.1 + t) * Math.cos(y * 1.7 - t * 0.8) * Math.sin(z * 1.9 + t * 1.3)

    const clock = new THREE.Clock()
    let frameId

    const animate = () => {
      const t = clock.getElapsedTime()
      const amp = activeRef.current ? 0.16 : 0.06
      const speed = activeRef.current ? 1.6 : 0.5

      const arr = posAttr.array
      for (let i = 0; i < arr.length; i += 3) {
        const bx = basePositions[i]
        const by = basePositions[i + 1]
        const bz = basePositions[i + 2]
        const n = noise(bx, by, bz, t * speed)
        const scale = 1 + n * amp
        arr[i] = bx * scale
        arr[i + 1] = by * scale
        arr[i + 2] = bz * scale
      }
      posAttr.needsUpdate = true

      orb.rotation.y += 0.0022 * (activeRef.current ? 2.4 : 1)
      orb.rotation.x += 0.0009
      shell.rotation.y -= 0.0012
      shell.rotation.x += 0.0006

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      shellGeometry.dispose()
      material.dispose()
      shellMaterial.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [color])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
