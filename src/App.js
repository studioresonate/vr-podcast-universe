import { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Stats, OrbitControls, Billboard, Stars, Text } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

import './App.css';

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
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Stars radius={100} depth={50} count={2000} factor={8} saturation={0} fade speed={2} />

      <group position={[1, 3, 0]}>
        <Box />
        <Billboard follow='true'>
          <Text fontSize={0.2} outlineWidth={'5%'} outlineColor="#000000" outlineOpacity={1} position={[0, - 1, 0]} maxWidth="3" textAlign='center'>
            This is a BOX! And some very long text that would go here!
          </Text>
        </Billboard>
      </group>

      <Stats showPanel={0} />
    </Canvas>
  );
}

export default App;
