import { useFrame, useThree } from '@react-three/fiber'
import ImmersiveControls from '@depasquale/three-immersive-controls';
import * as THREE from 'three'

export const Control = () => {
  const { camera, gl, scene } = useThree()

  const controls = new ImmersiveControls(camera, gl, scene, {
    initialPosition: new THREE.Vector3(0, 0, 15),
    gravity: false,
    floor: false,
    showExitVRButton: false,
    showEnterVRButton: false
  });

  useFrame(() => (controls.update()))
}


