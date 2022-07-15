import { Suspense, useEffect, useState } from 'react'
import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import { Stats, Sparkles, Stars, FirstPersonControls } from '@react-three/drei'
import * as THREE from 'three'

import query from './components/Query'
import './App.css';

import Cube from './components/Cube';
import Dome from './components/Dome';
import Sun from './components/Sun';


// Generate random number exept -1 thru 1, since that's where the sun is occupied
function generateRandom(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return (num >= -1 && num <= 1) ? generateRandom(min, max) : num;
}

function App() {

  const [podcastCollection, setpodcastCollection] = useState([]);

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
    <VRCanvas vr="true">
      <DefaultXRControllers />

      <FirstPersonControls
        lookSpeed={0.05}
        movementSpeed={2}
      />

      {/* <PerspectiveCamera makeDefault position={[-6, 5, 6]} /> */}

      <ambientLight intensity={0.5} />

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

      <Sun />

      <Suspense fallback={null}>
        <Dome />
      </Suspense>

      <Sparkles count={400} scale={40 * 2} size={40} noise={1} speed={0.15} />

      <Stars
        radius={80}
        depth={50}
        count={1500}
        factor={8}
        saturation={0}
        fade speed={3}
      />

      {/* debug */}
      <primitive object={new THREE.AxesHelper(5)} />
      <Stats showPanel={0} />
    </VRCanvas>
  );
}

export default App;
