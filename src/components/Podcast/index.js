import { Suspense, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import Cube from './Cube'
import query from '../../components/Query'


// Generate random number exept -1 thru 1, since that's where the sun is occupied
function generateRandom(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return (num >= -1 && num <= 1) ? generateRandom(min, max) : num;
}

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

export default Cubes;
