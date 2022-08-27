import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

export default function Intro() {
  // const [intro, setIntro] = useState(true)

  const introMap = useLoader(TextureLoader, '../img/textures/texture-intro.png')
  return (
    <mesh
      onClick={() => { console.log("Chee") }}
      position={[0, 0, 411]}
    >
      <planeGeometry attach='geometry' args={[5.8, 4]} />
      <meshBasicMaterial
        attach='material'
        roughness={0.25}
        metalness={0.8}
        map={introMap}
        transparent={true}
      />
    </mesh>
  )
}
