import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import './App.css';

function Box(props) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
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
      <meshStandardMaterial color={hovered ? 'blue' : 'purple'} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
}

export default App;
