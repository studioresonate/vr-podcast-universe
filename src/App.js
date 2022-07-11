import { Suspense, useEffect, useState } from 'react'
import query from './components/Query'

import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import { Stats, Stars, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

import './App.css';

import Cube from './components/Cube';
import Dome from './components/Dome';



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
    <VRCanvas>
      <DefaultXRControllers />

      <PerspectiveCamera makeDefault position={[-6, 5, 6]} />

      <ambientLight intensity={0.5} />

      <Suspense fallback={null}>
        {podcastCollection.map(podcast => (
          <>
            <Cube
              key={podcast.sys.id}
              useRef={podcast.sys.id}
              position={[
                Math.random() * (5 - -5) + -5,
                Math.random() * (5 - -5) + -5,
                Math.random() * (5 - -5) + -5
              ]}
              textureURL={`${podcast.coverArt.url}?fit=scale&w=300&h=300`}
              title={podcast.podcastTitle}
            />
          </>
        ))}
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

      {/* debug */}
      <primitive object={new THREE.AxesHelper(5)} />
      <Stats showPanel={0} />
    </VRCanvas>
  );
}

export default App;
