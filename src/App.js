import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { VRCanvas } from '@react-three/xr'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Stats, useCursor, useAspect, Text } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { Control } from './util/VRControl'



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

  console.log(camera.position);

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


document.body.insertAdjacentHTML('afterbegin', `
    <p class="instructions">Move with <span class="circle">L</span> thumbstick in VR or <span>W</span>, <span>A</span>, <span>S</span>, and <span>D</span> keys. Rotate with <span class="circle">R</span> thumbstick in VR or arrow keys. &larr; &uarr; &rarr;	&darr;</p>
`)


function PodcastModal() {
  const size = useAspect(1024, 512)
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), { src: 'https://videos.ctfassets.net/ydi6vzm9xood/4FKwgfyNBD8Z6FLZG0vhmJ/10e5ee7d33562e05548a8f6c9b0ab9ea/StarTalk.mp4', crossOrigin: 'Anonymous', loop: false, muted: true }),
  )
  video.muted = "muted"
  useEffect(() => void video.play(), [video])

  return (
    <>
      <group position={[0, 2, 4]}>
        <Text
          fontSize={0.8}
          outlineWidth={'5%'}
          outlineColor="#000000"
          outlineOpacity={1}
          maxWidth="10"
          textAlign='left'
          color='white'
          position={[-3.6, -4.2, 0]}
          anchorX="left"
          anchorY="top"
        // ref={textRef}
        >
          StarTalk this is a super long headline
        </Text>

        {/* video */}
        <mesh scale={size}>
          <planeBufferGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide}>
            <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
          </meshBasicMaterial>
        </mesh>

        {/* play button */}
        <mesh position={[0.1, 0, 0.1]} rotation={[0, 0, 1.57]}>
          <planeGeometry args={[1, 3.6]} />
          <Text
            fontSize={0.5}
            // outlineWidth={'5%'}
            // outlineColor="#000000"

            outlineOpacity={1}
            maxWidth="10"
            textAlign='center'
            color='white'
            // rotation={[3.8, 0.1, 0.64]}
            rotation={[0, 0, -1.6]}
            position={[0, 0, 0.01]}
          // ref={textRef}
          >
            PLAY
          </Text>
          <meshBasicMaterial color={0x0051e6} />
        </mesh>

        {/* close button */}
        <mesh position={[6.8, 3.3, 0.1]}>
          <circleGeometry args={[0.5, 32]} />
          <meshBasicMaterial color={0xf3f3f3} />
        </mesh>

        {/* thumbnail */}
        <mesh position={[-5.7, -5.3, 0]}>
          <planeBufferGeometry args={[2.4, 2.4]} color={0x00ff00} />
          <meshBasicMaterial />
        </mesh>
      </group>

      <mesh rotation={[0, -0.5, 0]}>
        <group position={[8.5, 4, 0]}>
          <Text
            fontSize={0.4}
            outlineWidth={'5%'}
            outlineColor="#000000"
            outlineOpacity={1}
            maxWidth="10"
            textAlign='left'
            color='white'
            anchorX="left"
          >
            HOSTS
          </Text>
        </group>
        <group position={[8.5, 3.4, 0]}>
          <Text
            fontSize={0.3}
            outlineWidth={'5%'}
            outlineColor="#000000"
            outlineOpacity={1}
            maxWidth="10"
            textAlign='left'
            color='white'
            anchorX="left"
          >
            Neil deGrasse Tyson, Chuck Nice
          </Text>
        </group>
        <group position={[8.5, 2.2, 0]}>
          <Text
            fontSize={0.2}
            outlineWidth={'5%'}
            outlineColor="#000000"
            outlineOpacity={1}
            maxWidth="6"
            textAlign='left'
            color='white'
            anchorX="left"
            anchorY="top"
            lineHeight={2}
          >
            Congue nullam lacinia habitasse rhoncus eu finibus pulvinar, ornare aliquam ante nam diam sem, mattis ullamcorper netus venenatis platea massa. Elementum lobortis diam nisi finibus integer vestibulum dictum accumsan, curae fusce ridiculus habitasse justo sit rhoncus eros ut, montes facilisi duis massa praesent senectus ante. Et malesuada ipsum elementum tempor augue nibh orci montes, pellentesque penatibus dis metus lacinia nunc porta inceptos, tempus ridiculus sagittis enim conubia parturient proin. Maximus pretium dictum curae integer hendrerit porttitor rutrum turpis vestibulum vehicula, accumsan nunc mauris porta etiam ultrices odio sed per proin
          </Text>
        </group>
      </mesh>


    </>
  )
}




function App() {
  return (
    <VRCanvas vr="true" camera={{ position: [0, 0, 15] }}  >
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
      <Control />
      <PodcastModal />

      {/* <XR /> */}

      {/* debug */}
      {/* <primitive object={new THREE.AxesHelper(5)} /> */}
      <Stats showPanel={0} />
    </VRCanvas>
  );
}

export default App;
