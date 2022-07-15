import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import { Stats, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// import query from './components/Query'
import './App.css';

import Cubes from './components/Podcast/index';
import Space from './components/Space';
import Sun from './components/Sun';


function App() {

  return (
    <VRCanvas vr="true">
      <DefaultXRControllers />

      <OrbitControls
        lookSpeed={0.05}
        movementSpeed={2}
      />
      {/* <PerspectiveCamera makeDefault position={[-6, 5, 6]} /> */}
      <ambientLight intensity={0.5} />
      <Cubes />
      <Sun />
      <Space />


      {/* debug */}
      <primitive object={new THREE.AxesHelper(5)} />
      <Stats showPanel={0} />
    </VRCanvas>
  );
}

export default App;
