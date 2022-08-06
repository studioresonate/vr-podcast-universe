import { useEffect, useRef, useState } from 'react'
import { useAspect, Text } from '@react-three/drei'
import * as THREE from 'three'

import { useSinglePost } from '../../hooks/'

export default function PodcastModal() {
  const size = useAspect(1024, 512)
  const playRef = useRef()
  const [post, isLoading] = useSinglePost()

  // const [clicked, click] = useState(false)
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: 'https://videos.ctfassets.net/ydi6vzm9xood/4FKwgfyNBD8Z6FLZG0vhmJ/10e5ee7d33562e05548a8f6c9b0ab9ea/StarTalk.mp4',
      crossOrigin: 'Anonymous',
      loop: false,
      muted: true
    }),
  )
  // video.muted = "muted"
  // useEffect(() => void video.play(), [video])


  function playVideo() {
    video.play()
    video.muted = false
    playRef.current.visible = false
  }

  useEffect(() => {
    void video.play()
    // Play video, then pause after 500ms. Wonky (or genius??) work around
    // to set video poster rather, than getting a black screen before video gets loaded.
    // This is assuming that the video doesn't start off with a black screen... in which case
    // we're back to square one :-|

    const videotimer = setTimeout(() => {
      video.pause()
    }, 500);
    return () => clearTimeout(videotimer);
  }, [video]);

  const renderPost = () => {
    if (isLoading) return <Text>Loading...</Text>

    console.log(post);
    return (
      <>
        <group>
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
              {post.podcastTitle}
            </Text>

            {/* video */}
            <mesh scale={size} >
              <planeBufferGeometry args={[0.3, 0.3]} />
              <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide}>
                <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
              </meshBasicMaterial>
            </mesh>

            {/* play button */}
            <mesh
              position={[0.1, 0, 0.1]}
              rotation={[0, 0, 1.57]}
              // onClick={(event) => click(!clicked)}
              onClick={playVideo}
              ref={playRef}
            >
              <planeGeometry args={[1, 3.6]} />
              <Text
                fontSize={0.5}
                outlineOpacity={1}
                maxWidth="10"
                textAlign='center'
                color='white'
                rotation={[0, 0, -1.58]}
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

          <group>
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
                  {` ${post.hostNames}`}
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
          </group>
        </group>
      </>
    )
  }

  return (
    <>
      {renderPost()}
    </>
  )
}
