import { useEffect } from 'react'
import { DefaultXRControllers, VRCanvas, useXR } from '@react-three/xr'
import { Stats, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// import query from './components/Query'
import './App.css';

import Cubes from './components/Podcast';
import Space from './components/Space';
import Sun from './components/Sun';

const XR = () => {
  const { player, isPresenting } = useXR();
  console.log(isPresenting);
  useEffect(() => {
    if (isPresenting) {
      player.position.x = 0;
      player.position.y = 1;
      player.position.z += 10;
    } else {
      player.position.x = 0;
      player.position.y = 0;
      player.position.z = 2;
    }
  }, [player, isPresenting]);

  return null;
};

function App() {

  return (
    <VRCanvas vr="true" >
      <DefaultXRControllers
        rayMaterial={{ color: 'white' }}
        hideRaysOnBlur={false}
      />

      <OrbitControls
        maxDistance={13}
        minDistance={3}
        maxPolarAngle={Math.PI * 0.8}
        minPolarAngle={Math.PI * 0.2}
        autoRotate
        autoRotateSpeed={0.2}
      />

      <ambientLight intensity={0.9} />
      <pointLight intensity={1.5} position={[4, 0, 0]} />
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
