import React, { useMemo, useRef, useState } from 'react'
import { TextureLoader } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { history } from '../../components/history'
import PodcastModal from './Modal'

function Cube({ position, textureURL, title, slug }) {
  const [hovered, hover] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const boxTexture = useMemo(() => new TextureLoader().load(textureURL), [
    textureURL
  ])

  // useCursor(hovered, 'pointer', 'auto')

  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.02))

  // Text lookAt
  // const { player } = useXR();
  const textRef = useRef()
  const { camera } = useThree()

  // const controllerGrip0 = gl.xr.getControllerGrip(0)
  // controllerGrip0.addEventListener("connected", (e) => {
  //   console.log(e.data.gamepad)
  // })

  // Only works for when isPresenting is true
  // useFrame(() => textRef.current.lookAt(player.position))
  // Desktop view
  useFrame(() => textRef.current.lookAt(camera.position))

  const podcastOpen = () => {
    history.push(slug)
    setOpenModal(true)
  }

  return (
    <>
      <group position={position}>
        <mesh
          ref={ref}
          // onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          castShadow
          onClick={podcastOpen}
        // onClick={() => {
        //   setOpenModal(true)
        // }}
        >
          <boxGeometry attach='geometry' args={[1, 1, 1]} />
          <meshStandardMaterial
            attach='material'
            roughness={0.25}
            metalness={0.8}
            map={boxTexture}
            color={hovered ? 'hotpink' : 'white'}
          />
        </mesh>

        <mesh position={[0, - 1, 0]}>
          <Text
            fontSize={0.2}
            outlineWidth={'5%'}
            outlineColor="#000000"
            outlineOpacity={1}
            maxWidth="3"
            textAlign='center'
            color='white'
            ref={textRef}
          >
            {title}
          </Text>
        </mesh>
      </group>
      {openModal && <PodcastModal slug={slug} closeModal={setOpenModal} />}
    </>
  )
}

export default Cube;