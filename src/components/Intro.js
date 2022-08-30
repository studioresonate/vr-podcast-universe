import { useContext } from 'react'
import IntroContext from '../IntroContext'

import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

export default function Intro() {
  const { changeIntro } = useContext(IntroContext)
  const introMap = useLoader(TextureLoader, '../img/textures/texture-intro.png')
  return (
    <mesh
      onClick={() => changeIntro()}
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
