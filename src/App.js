import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import StatsImpl from "stats.js"

import './App.css';

extend({ OrbitControls });

function Stats() {
  const [stats] = useState(() => new StatsImpl())
  useEffect(() => {
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    return () => document.body.removeChild(stats.dom)
  }, [])
  return useFrame(state => {
    stats.begin()
    state.gl.render(state.scene, state.camera)
    stats.end()
  }, 1)
}

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
      <Stats />
    </Canvas>
  );
}

export default App;
