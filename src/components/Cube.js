import React, { useMemo, useRef, useState } from 'react'
import { TextureLoader } from 'three'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'

function Box({ position, textureURL, title }) {
  const [hovered, hover] = useState(false)
  const boxTexture = useMemo(() => new TextureLoader().load(textureURL), [
    textureURL
  ])

  // console.log(position);

  // Maybe not a good idea for performance reasons??
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.002))

  return (
    <>
      <group position={position}>
        <mesh
          ref={ref}
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
        </mesh>
        <mesh
          position={[0, - 1, 0]}
        >
          <Billboard follow='true' lockZ={true} lockX={true} lockY={true}>
            <Text
              fontSize={0.2}
              outlineWidth={'5%'}
              outlineColor="#000000"
              outlineOpacity={1}
              maxWidth="3"
              textAlign='center'
              color='white'
            >
              {title}
            </Text>
          </Billboard>
        </mesh>
      </group>
    </>
  )
}

export default Box;