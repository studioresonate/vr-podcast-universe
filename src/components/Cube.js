import React, { useMemo, useState } from 'react'
import { TextureLoader } from 'three'
import { Billboard, Text } from '@react-three/drei'

function Box({ setRef, position, textureURL, title }) {
  const [hovered, hover] = useState(false)
  const boxTexture = useMemo(() => new TextureLoader().load(textureURL), [
    textureURL
  ])


  return (
    <mesh
      ref={setRef}
      position={position}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)} castShadow
    >
      <boxGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial
        attach='material'
        roughness={0.25}
        metalness={0}
        map={boxTexture}
        color={hovered ? 'hotpink' : 'white'}
      />
      <Billboard follow='true'>
        <Text
          fontSize={0.2}
          outlineWidth={'5%'}
          outlineColor="#000000"
          outlineOpacity={1}
          position={[0, - 1, 0]}
          maxWidth="3"
          textAlign='center'
          color='white'
        >
          {title}
        </Text>
      </Billboard>
    </mesh>
  )
}

export default Box;