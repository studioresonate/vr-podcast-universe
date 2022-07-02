import { useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import './App.css';

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the three.js Camera, and the canvas html element.
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};


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
      <CameraControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
}

export default App;
