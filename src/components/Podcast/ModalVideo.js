import { useEffect, useRef, useState } from 'react'
import { useAspect, Text } from '@react-three/drei'
import * as THREE from 'three'

export default function ModalVideo(props) {
  const size = useAspect(1024, 512)
  const playRef = useRef()
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: props.videoUrl,
      crossOrigin: 'Anonymous',
      loop: false,
      muted: true
    }),
  )


  function playVideo() {
    video.play()
    video.muted = false
    playRef.current.visible = false
  }

  useEffect(() => {
    // void video.play()
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
        // We can now safely pause video...
        video.pause();
      })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
    }
    // Play video, then pause after 500ms. Wonky (or genius??) work around
    // to set video poster rather, than getting a black screen before video gets loaded.
    // This is assuming that the video doesn't start off with a black screen... in which case
    // we're back to square one :-|

    const videotimer = setTimeout(() => {
      video.pause()
    }, 500);
    return () => clearTimeout(videotimer);
  }, [video]);
  return (
    <>
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
    </>
  )
}
