import React, { useMemo } from 'react'
import { TextureLoader } from 'three'
import * as THREE from 'three'

export default function ModalThumbnail(props) {
  // const [clicked, click] = useState(false)
  const art = props.artwork
  const boxTexture = useMemo(() => new TextureLoader().load(art), [
    art
  ])
  return (
    <mesh position={[-5.7, -5.3, 0]}>
      <planeBufferGeometry args={[2.4, 2.4]} color={0x00ff00} />
      <meshBasicMaterial
        attach='material'
        roughness={0.25}
        metalness={0.8}
        map={boxTexture}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
