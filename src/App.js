import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Stats, OrbitControls, Billboard, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

import './App.css';

function Dome() {
  const texture = useLoader(THREE.TextureLoader, 'img/nebula.jpg')
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[800, 100, 100]} />
      <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

function Box(props) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const ConanOBrienNeedsAFriend = useLoader(TextureLoader, 'tiles/ConanOBrienNeedsAFriend.jpeg')
  // add rotation to render loop
  useFrame((state, delta) => (ref.current.rotation.y += 0.01))
  return (
    <mesh
      {...props}
      ref={ref}
      onCLick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={ConanOBrienNeedsAFriend} color={hovered ? 'blue' : 'white'} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />

      <group position={[1, 3, 0]}>
        <Suspense fallback={null}>
          <Box />
        </Suspense>
        <Billboard follow='true'>
          <Text fontSize={0.2} outlineWidth={'5%'} outlineColor="#000000" outlineOpacity={1} position={[0, - 1, 0]} maxWidth="3" textAlign='center'>
            Conan O'Brien Needs A Friend
          </Text>
        </Billboard>
      </group>
      <Suspense fallback={null}>
        <Dome />
      </Suspense>

      <Stars radius={80} depth={50} count={1500} factor={8} saturation={0} fade speed={3} />
      <primitive object={new THREE.AxesHelper(5)} />
      <Stats showPanel={0} />
    </Canvas>
  );
}

export default App;
