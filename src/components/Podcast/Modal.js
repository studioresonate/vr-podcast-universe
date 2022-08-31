import React, { useContext, useRef } from 'react'
import { Text } from '@react-three/drei'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { useSinglePost } from '../../hooks/'
// import { useFrame } from '@react-three/fiber'

import ModalContext from '../../ModalContext';

import { history } from '../../components/history'
import ModalVideo from './ModalVideo'
import ModalThumbnail from './ModalThumbnail'

export default function PodcastModal() {
  // const { camera } = useThree()
  const { modal, changeModal, podSlug } = useContext(ModalContext)
  const [post, isLoading] = useSinglePost(podSlug)
  // const [clicked, click] = useState(false)
  // console.log(post);

  const modalRef = useRef()
  // useFrame(() => modalRef.current.lookAt(camera.position))

  const podcastClose = () => {
    history.push('/')
    // closeModal(false)
    changeModal()
  }
  // console.log("I'm visible " + visible);
  const renderPost = () => {
    if (isLoading) return <Text>Loading...</Text>
    return (
      <>
        <group ref={modalRef}>
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

            <ModalVideo videoUrl={post.videoPreview?.fields.file.url} />

            {/* close button */}
            <mesh
              position={[6.8, 3.3, 0.1]}
              onClick={podcastClose}
            >
              <Text
                fontSize={0.2}
                textAlign='center'
                color='white'
              >
                close
              </Text>
              <circleGeometry args={[0.5, 32]} />
              <meshBasicMaterial color={0x0051e6} />
            </mesh>

            <ModalThumbnail
              artwork={`${post.coverArt.fields.file.url}?fit=scale&w=300&h=300&q=70`}
            />
          </group>

          <group>
            <mesh rotation={[0, -0.5, 0]}>
              {/* hosts */}
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

              {/* description */}
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
                  {documentToPlainTextString(post.description)}
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
      {modal && renderPost()}
    </>
  )
}
