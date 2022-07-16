import React, { useRef, useState } from 'react'
// import { TextureLoader } from 'three'
// import { useFrame } from '@react-three/fiber'

function Sun() {
  const [hovered, hover] = useState(false)
  // const SunTexture = useMemo(() => new TextureLoader().load(textureURL), [
  //   textureURL
  // ])

  // Maybe not a good idea for performance reasons??
  const sunRef = useRef()


  return (
    <>
      <mesh
        ref={sunRef}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}

      >
        <sphereBufferGeometry
          args={[2, 15, 8]}
          attach="geometry"
        />
        <meshStandardMaterial
          attach="material"
          color={hovered ? 'hotpink' : 'white'}
          wireframe
        />
      </mesh>

    </>
  )
}

export default Sun;