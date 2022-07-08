import { Suspense, useRef } from 'react'
// import { Canvas } from '@react-three/fiber'
import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import { Stats, OrbitControls, Stars, PerspectiveCamera, Plane } from '@react-three/drei'
import * as THREE from 'three'

import './App.css';

import Cube from './components/Cube';
import Dome from './components/Dome';

import ConanOBrienNeedsAFriend from './tiles/ConanOBrienNeedsAFriend.jpeg';
import TwoBears1Cave from './tiles/2Bears1Cave.jpeg';
import StarTalk from './tiles/StarTalk.jpeg';
import OfficeLadies from './tiles/OfficeLadies.jpeg';
import LeVarBurtonReads from './tiles/LeVarBurtonReads.jpeg';


function App() {
  const cameraPoint = useRef();
  const _ConanOBrienNeedsAFriendBoxRef = useRef();
  const _TwoBears1Cave = useRef();
  const _StarTalk = useRef();
  const _OfficeLadies = useRef();
  const _LeVarBurtonReads = useRef();

  return (
    <VRCanvas>
      <DefaultXRControllers />

      <PerspectiveCamera makeDefault position={[-6, 5, 6]}>
        <mesh>
          <Plane args={[0.1, 0.1]} ref={cameraPoint} />
        </mesh>
      </PerspectiveCamera>

      {/* <OrbitControls /> */}
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>

        <Cube
          setRef={_ConanOBrienNeedsAFriendBoxRef}
          position={[-5, 2, 3]}
          textureURL={ConanOBrienNeedsAFriend}
          title="Conan O'Brien Needs A Friend"
        />

        <Cube
          setRef={_TwoBears1Cave}
          position={[3, -1, 3]}
          textureURL={TwoBears1Cave}
          title="2 Bears, 1 Cave"
        />

        <Cube
          setRef={_StarTalk}
          position={[4, 2, -2]}
          textureURL={StarTalk}
          title="StarTalk Radio"
        />

        <Cube
          setRef={_OfficeLadies}
          position={[-4, -2, -5]}
          textureURL={OfficeLadies}
          title="Office Ladies"
        />

        <Cube
          setRef={_LeVarBurtonReads}
          position={[-5, 3, -4]}
          textureURL={LeVarBurtonReads}
          title="LeVar Burton Reads"
        />

      </Suspense>

      <Suspense fallback={null}>
        <Dome />
      </Suspense>

      <Stars
        radius={80}
        depth={50}
        count={1500}
        factor={8}
        saturation={0}
        fade speed={3}
      />
      <Dome />

      {/* debug */}
      <primitive object={new THREE.AxesHelper(5)} />
      <Stats showPanel={0} />
    </VRCanvas>
  );
}

export default App;
