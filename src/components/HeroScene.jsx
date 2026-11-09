import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, MeshDistortMaterial, RoundedBox, Sparkles, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const W = 1
const H = 2.08

// Rounded-rectangle plane with UVs normalised to 0..1 so a texture fills it.
function useScreenGeometry(w, h, r) {
  return useMemo(() => {
    const s = new THREE.Shape()
    const x = -w / 2
    const y = -h / 2
    s.moveTo(x + r, y)
    s.lineTo(x + w - r, y)
    s.quadraticCurveTo(x + w, y, x + w, y + r)
    s.lineTo(x + w, y + h - r)
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    s.lineTo(x + r, y + h)
    s.quadraticCurveTo(x, y + h, x, y + h - r)
    s.lineTo(x, y + r)
    s.quadraticCurveTo(x, y, x + r, y)
    const g = new THREE.ShapeGeometry(s, 12)
    const pos = g.attributes.position
    const uv = g.attributes.uv
    for (let i = 0; i < pos.count; i++) {
      uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h)
    }
    return g
  }, [w, h, r])
}

// object-fit: cover (anchored to top) for a texture on a w×h plane
function coverTexture(tex, w, h) {
  const img = tex.image
  if (!img) return
  const imgAspect = img.width / img.height
  const planeAspect = w / h
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  if (imgAspect > planeAspect) {
    tex.repeat.set(planeAspect / imgAspect, 1)
    tex.offset.set((1 - tex.repeat.x) / 2, 0)
  } else {
    tex.repeat.set(1, imgAspect / planeAspect)
    tex.offset.set(0, 1 - tex.repeat.y)
  }
  tex.needsUpdate = true
}

function Phone({ src, ...props }) {
  const tex = useTexture(src)
  const sw = W - 0.07
  const sh = H - 0.07
  const screen = useScreenGeometry(sw, sh, 0.11)
  useMemo(() => coverTexture(tex, sw, sh), [tex, sw, sh])

  return (
    <group {...props}>
      <RoundedBox args={[W, H, 0.09]} radius={0.14} smoothness={6}>
        <meshPhysicalMaterial color="#15161b" metalness={0.85} roughness={0.25} clearcoat={1} clearcoatRoughness={0.15} />
      </RoundedBox>
      <mesh geometry={screen} position={[0, 0, 0.0465]}>
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      {/* dynamic island */}
      <mesh position={[0, H / 2 - 0.1, 0.048]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.3]}>
        <capsuleGeometry args={[0.03, 0.17, 4, 12]} />
        <meshBasicMaterial color="#000" />
      </mesh>
    </group>
  )
}

function Rig({ children, pointer }) {
  const group = useRef()
  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2)
    const k = 1 - Math.pow(0.002, dt)
    g.rotation.y += (pointer.current.x * 0.45 + scroll * 0.6 - g.rotation.y) * k
    g.rotation.x += (-pointer.current.y * 0.18 + scroll * 0.15 - g.rotation.x) * k
    g.position.y += (scroll * 1.6 - g.position.y) * k
  })
  return <group ref={group}>{children}</group>
}

function Scene({ theme, pointer, compact }) {
  const dark = theme === 'dark'
  return (
    <>
      <ambientLight intensity={dark ? 0.4 : 0.9} />
      <directionalLight position={[3, 4, 5]} intensity={dark ? 1.4 : 2} />
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 4, 4]} scale={[8, 1.5, 1]} />
        <Lightformer intensity={2} color="#4f7cff" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} />
        <Lightformer intensity={2} color="#a855f7" position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} />
      </Environment>

      <Rig pointer={pointer}>
        <group scale={compact ? 0.82 : 0.92} position={compact ? [0, 0, 0] : [0.1, -0.1, 0]}>
          {/* glowing blob behind phones */}
          <mesh position={[0, 0, -1.6]} scale={compact ? 1.25 : 1.45}>
            <icosahedronGeometry args={[1, 32]} />
            <MeshDistortMaterial
              color={dark ? '#3b5bff' : '#7c9bff'}
              emissive={dark ? '#5b21b6' : '#c4b5fd'}
              emissiveIntensity={dark ? 0.5 : 0.3}
              roughness={0.15}
              metalness={0.4}
              distort={0.45}
              speed={1.6}
            />
          </mesh>

          <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
            <Phone src="/apps/evoke-1.jpg" position={[-1.15, -0.1, -0.55]} rotation={[0.05, 0.42, 0.1]} scale={0.88} />
          </Float>
          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.8}>
            <Phone src="/apps/dapup-1.jpg" position={[0, 0.08, 0.35]} rotation={[0, -0.12, 0]} />
          </Float>
          <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
            <Phone src="/apps/shedrives-1.jpg" position={[1.2, -0.15, -0.5]} rotation={[0.05, -0.5, -0.1]} scale={0.88} />
          </Float>

          <Sparkles count={70} scale={[6, 4, 3]} size={2.2} speed={0.35} color={dark ? '#9fb4ff' : '#4f46e5'} opacity={0.8} />
        </group>
      </Rig>
    </>
  )
}

export default function HeroScene({ theme }) {
  const pointer = useRef({ x: 0, y: 0 })
  const wrap = useRef(null)
  const [visible, setVisible] = useState(true)
  const [compact, setCompact] = useState(() => window.innerWidth < 900)

  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const resize = () => setCompact(window.innerWidth < 900)
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    if (wrap.current) io.observe(wrap.current)
    window.addEventListener('pointermove', move)
    window.addEventListener('resize', resize)
    return () => {
      io.disconnect()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div ref={wrap} style={{ width: '100%', height: '100%' }}>
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.4], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Scene theme={theme} pointer={pointer} compact={compact} />
      </Canvas>
    </div>
  )
}
