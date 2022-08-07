import { Text } from '@react-three/drei'
import { useSinglePost } from '../../hooks/'

import ModalVideo from './ModalVideo'
import ModalThumbnail from './ModalThumbnail'

export default function PodcastModal() {
  const [post, isLoading] = useSinglePost()
  // const [clicked, click] = useState(false)
  // console.log(post);

  const renderPost = () => {
    if (isLoading) return <Text>Loading...</Text>
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

            <ModalVideo videoUrl={post.videoPreview.fields.file.url} />

            {/* close button */}
            <mesh position={[6.8, 3.3, 0.1]}>
              <circleGeometry args={[0.5, 32]} />
              <meshBasicMaterial color={0xf3f3f3} />
            </mesh>

            <ModalThumbnail
              artwork={`${post.coverArt.fields.file.url}?fit=scale&w=300&h=300&q=70`}
            />
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
