import { Suspense, useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import Cube from './Cube'
// import query from '../../components/Query'
import { usePosts } from '../../hooks/'


// Generate random number exept -1 thru 1, since that's where the sun is occupied
function generateRandom(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return (num >= -1 && num <= 1) ? generateRandom(min, max) : num;
}

function Cubes() {
  // const [podcastCollection, setpodcastCollection] = useState([]);
  const [posts, isLoading] = usePosts()

  const cubez = useRef()
  useFrame(() => (cubez.current.rotation.y += 0.002))

  const renderPosts = () => {
    if (isLoading) return <Text>Loading</Text>
    // console.log(posts);

    return posts.map(post => (
      <Cube
        key={post.fields.slug}
        slug={post.fields.slug}
        position={[
          generateRandom(-10, 10),
          generateRandom(-10, 10),
          generateRandom(-10, 10)
        ]}
        textureURL={`${post.fields.coverArt.fields.file.url}?fit=scale&w=300&h=300&q=70`}
        title={post.fields.podcastTitle}
      // onClick={() => history.push("/page23")}
      />
    ))
  }

  return (
    <group ref={cubez}>
      <Suspense fallback={null}>
        {renderPosts()}
      </Suspense>
    </group>
  );
}

export default Cubes;
