import { useContext } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import ImmersiveControls from '@depasquale/three-immersive-controls';
import * as THREE from 'three'
import { gsap } from "gsap";

import IntroContext from '../IntroContext';

export const Control = () => {
  const { intro } = useContext(IntroContext)
  const { camera, gl, scene } = useThree()

  const controls = new ImmersiveControls(camera, gl, scene, {
    initialPosition: new THREE.Vector3(0, 0, 415),
    gravity: false,
    floor: false,
    showExitVRButton: false,
    showEnterVRButton: false
  });

  const tl = gsap.timeline();

  intro &&
    tl.to(controls.player.position, {
      duration: 6,
      z: 17,
      ease: "power1.inOut"
    })

  useFrame(() => (controls.update()))
}