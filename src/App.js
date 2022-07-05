import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

import './App.css';

import Cube from './components/Cube';
import Dome from './components/Dome';

import ConanOBrienNeedsAFriend from './tiles/ConanOBrienNeedsAFriend.jpeg';
import TwoBears1Cave from './tiles/2Bears1Cave.jpeg';

function App() {
  const _ConanOBrienNeedsAFriendBoxRef = useRef();
  const _TwoBears1Cave = useRef();
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />

      <Cube
        setRef={_ConanOBrienNeedsAFriendBoxRef}
        position={[0, 1, 0]}
        textureURL={ConanOBrienNeedsAFriend}
        title="Conan O'Brien Needs A Friend"
      />

      <Cube
        setRef={_TwoBears1Cave}
        position={[3, -1, 3]}
        textureURL={TwoBears1Cave}
        title="2 Bears, 1 Cave"
      />

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
    </Canvas>
  );
}

export default App;
