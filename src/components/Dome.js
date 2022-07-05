import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

function Dome() {
  const texture = useLoader(THREE.TextureLoader, 'img/nebula.jpg')
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[800, 100, 100]} />
      <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

export default Dome;