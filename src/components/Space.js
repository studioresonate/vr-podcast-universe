import * as THREE from 'three'
import { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { Sparkles, Stars, useGLTF } from '@react-three/drei'

function RocketModel() {
  const gltf = useGLTF('/models/rocket.gltf')
  return (<primitive object={gltf.scene} />)
}

function Dome() {
  const texture = useLoader(THREE.TextureLoader, 'img/nebula.jpg')
  return (
    <Suspense fallback={null}>
      <group position={[0, 0, 300]} rotation={[0, 20, 0]}>
        <RocketModel />
      </group>
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[800, 100, 100]} />
        <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
      </mesh>

      <mesh>
        <Sparkles
          count={400}
          scale={40 * 2}
          size={40}
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