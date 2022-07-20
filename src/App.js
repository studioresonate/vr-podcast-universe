import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import { Stats, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// import query from './components/Query'
import './App.css';

import Cubes from './components/Podcast';
import Space from './components/Space';
import Sun from './components/Sun';
import XR from './util/Xr'

function App() {

  return (
    <VRCanvas vr="true" camera={{ position: [0, 0, 15] }}  >
      <DefaultXRControllers
        rayMaterial={{ color: 'white' }}
        hideRaysOnBlur={false}
      />

      <OrbitControls
        maxDistance={30}
        minDistance={3}
        maxPolarAngle={Math.PI * 0.8}
        minPolarAngle={Math.PI * 0.2}
        autoRotate
        autoRotateSpeed={0.2}
      />

      <ambientLight intensity={0.4} castShadow />
      <pointLight intensity={3.5} position={[4, 12, 2]} castShadow />
      <Cubes />
      <Sun />
      <Space />

      <XR />

      {/* debug */}
      <primitive object={new THREE.AxesHelper(5)} />
      <Stats showPanel={0} />
    </VRCanvas>
  );
}

export default App;
