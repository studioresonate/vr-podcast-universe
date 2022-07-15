import React, { useMemo, useRef, useState } from 'react'
// import { TextureLoader } from 'three'
// import { useFrame } from '@react-three/fiber'

function Sun() {
  const [hovered, hover] = useState(false)
  // const SunTexture = useMemo(() => new TextureLoader().load(textureURL), [
  //   textureURL
  // ])

  // Maybe not a good idea for performance reasons??
  const ref = useRef()


  return (
    <>
      <mesh
        ref={ref}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
        color={hovered ? 'hotpink' : 'white'}
      >
        <sphereBufferGeometry
          args={[2, 15, 8]}
          attach="geometry"
        />
        <meshStandardMaterial
          attach="material"
          color={0x00d0ff}
          wireframe
        />
      </mesh>

    </>
  )
}

export default Sun;