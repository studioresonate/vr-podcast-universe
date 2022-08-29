import { useFrame, useThree } from '@react-three/fiber'
import ImmersiveControls from '@depasquale/three-immersive-controls';
import * as THREE from 'three'
import { gsap } from "gsap";


export const Control = () => {
  const { camera, gl, scene } = useThree()

  const controls = new ImmersiveControls(camera, gl, scene, {
    initialPosition: new THREE.Vector3(0, 0, 415),
    gravity: false,
    floor: false,
    showExitVRButton: false,
    showEnterVRButton: false
  });

  const tl = gsap.timeline();
  tl.to(controls.player.position, {
    duration: 6,
    delay: 1,
    z: 17,
    ease: "power1.inOut"
  });

  useFrame(() => (controls.update()))
}