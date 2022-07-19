import React, { Suspense, useRef, useState } from 'react'
import * as THREE from "three";
import { useFrame, useLoader } from '@react-three/fiber'


function Sun() {
  const [hovered, hover] = useState(false)

  const [colorMap, normalMap] = useLoader(THREE.TextureLoader, [
    './img/textures/texture-sxm.png',
    './img/textures/texture-sxm-normal.png'
  ])

  const [cloudMap] = useLoader(THREE.TextureLoader, [
    './img/textures/clouds.png'
  ])



  const sunRef = useRef()
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.001))


  return (
    <>
      <Suspense fallback={null}>
        <mesh ref={ref}>
          <sphereBufferGeometry
            args={[2.02, 30, 30]}
            attach="geometry"
          />
          <meshPhongMaterial
            attach="material"
            map={cloudMap}
            transparent
          />
        </mesh>

        <mesh
          ref={sunRef}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}

        >
          <sphereBufferGeometry
            args={[2, 20, 30]}
            attach="geometry"
          />
          <meshPhongMaterial
            attach="material"
            color={hovered ? 'hotpink' : 'white'}
            map={colorMap}
            normalMap={normalMap}
            metalness={1}
            shininess={2}
            flatShading={false}
          />
        </mesh>
      </Suspense>

    </>
  )
}

export default Sun;