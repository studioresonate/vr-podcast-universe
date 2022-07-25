import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
// import { VRCanvas, useXR } from '@react-three/xr'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stats, useCursor, Text } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import ImmersiveControls from '@depasquale/three-immersive-controls';


import './App.css';

// import Cubes from './components/Podcast';
import Space from './components/Space';
import Sun from './components/Sun';
// import XR from './util/Xr'

import query from './components/Query'


// Generate random number exept -1 thru 1, since that's where the sun is occupied
function generateRandom(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return (num >= -1 && num <= 1) ? generateRandom(min, max) : num;
}

// Cubes
function Cubes() {
  const [podcastCollection, setpodcastCollection] = useState([]);
  const cubez = useRef()

  const { camera, gl, scene } = useThree()

  // Immersive controls
  const controls = new ImmersiveControls(camera, gl, scene, {
    initialPosition: new THREE.Vector3(0, 0, 15),
    gravity: false,
    floor: false,
    showExitVRButton: false,
    showEnterVRButton: true
  });


  useFrame(() => (controls.update()))
  useFrame(() => (cubez.current.rotation.y += 0.002))

  useEffect(() => {
    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: `Bearer ${process.env.REACT_APP_CONTENT_DELIVERY}`,
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      }
    )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        // rerender the entire component with new data
        setpodcastCollection(data.podcastCollection.items);
        // console.log(data.podcastCollection.items);
      });
  }, []);

  if (!podcastCollection) {
    return "Loading...";
  }

  return (
    <group ref={cubez}>
      <Suspense fallback={null}>
        {podcastCollection.map(podcast => (
          <Cube
            key={podcast.sys.id}
            position={[
              generateRandom(-10, 10),
              generateRandom(-10, 10),
              generateRandom(-10, 10)
            ]}
            textureURL={`${podcast.coverArt.url}?fit=scale&w=300&h=300&q=70`}
            title={podcast.podcastTitle}
          />
        ))}
      </Suspense>
    </group>
  );
}

// Cube
function Cube({ position, textureURL, title }) {
  const [hovered, hover] = useState(false)
  const boxTexture = useMemo(() => new TextureLoader().load(textureURL), [
    textureURL
  ])

  useCursor(hovered, /*'pointer', 'auto'*/)

  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.02))

  // Text lookAt
  // const { player } = useXR();
  const textRef = useRef()
  const { camera } = useThree()

  // const controllerGrip0 = gl.xr.getControllerGrip(0)
  // controllerGrip0.addEventListener("connected", (e) => {
  //   console.log(e.data.gamepad)
  // })

  // Only works for when isPresenting is true
  // useFrame(() => textRef.current.lookAt(player.position))
  // Desktop view
  useFrame(() => textRef.current.lookAt(camera.position))

  return (
    <>
      <group position={position}>
        <mesh
          ref={ref}
          // onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)} castShadow
          onClick={() => {
            console.log('Clicked')
          }}
        >
          <boxGeometry attach='geometry' args={[1, 1, 1]} />
          <meshStandardMaterial
            attach='material'
            roughness={0.25}
            metalness={0.8}
            map={boxTexture}
            color={hovered ? 'hotpink' : 'white'}
          />
        </mesh>

        <mesh position={[0, - 1, 0]}>
          <Text
            fontSize={0.2}
            outlineWidth={'5%'}
            outlineColor="#000000"
            outlineOpacity={1}
            maxWidth="3"
            textAlign='center'
            color='white'
            ref={textRef}
          >
            {title}
          </Text>
        </mesh>
      </group>
    </>
  )
}




function App() {
  return (
    <Canvas vr="true" camera={{ position: [0, 0, 15] }}  >
      {/* <DefaultXRControllers
        rayMaterial={{ color: 'white' }}
        hideRaysOnBlur={false}
      /> */}

      {/* <OrbitControls
        maxDistance={30}
        minDistance={3}
        maxPolarAngle={Math.PI * 0.8}
        minPolarAngle={Math.PI * 0.2}
        autoRotate
        autoRotateSpeed={0.2}
      /> */}

      <ambientLight intensity={0.4} castShadow />
      <pointLight intensity={3.5} position={[4, 12, 2]} castShadow />
      <Cubes />
      <Sun />
      <Space />

      {/* <XR /> */}

      {/* debug */}
      {/* <primitive object={new THREE.AxesHelper(5)} /> */}
      <Stats showPanel={0} />
    </Canvas>
  );
}

export default App;
