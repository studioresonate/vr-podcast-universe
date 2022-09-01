import * as THREE from 'three'
import { Suspense, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Sparkles, Stars, useGLTF } from '@react-three/drei'

function RocketModel() {
  const gltf = useGLTF('/models/rocket.gltf')
  return (<primitive object={gltf.scene} />)
}

function SatelliteModel() {
  const gltf = useGLTF('/models/satellite.gltf')
  return (<primitive object={gltf.scene} />)
}


function Dome() {
  const texture = useLoader(THREE.TextureLoader, 'img/nebula.jpg')
  const rocketRef = useRef()
  const satelliteRef = useRef()
  useFrame(() => (rocketRef.current.rotation.x += 0.01))
  return (
    <Suspense fallback={null}>
      <group position={[-2, 0, 311]} rotation={[0, 0, 0.2]} ref={rocketRef}>
        <RocketModel />
      </group>

      <group position={[5, 0, 160]} rotation={[10, 20, 0]} ref={satelliteRef}>
        <SatelliteModel />
      </group>

      <mesh>
        <sphereBufferGeometry attach="geometry" args={[800, 100, 100]} />
        <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
      </mesh>

      <mesh>
        <Sparkles
          count={500}
          scale={500}
          size={80}
          noise={1}
          speed={0.15} />

        <Stars
          radius={80}
          depth={50}
          count={1500}
          factor={8}
          saturation={0}
          fade speed={3}
        />
      </mesh>
    </Suspense>
  )
}

export default Dome;