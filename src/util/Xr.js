import { useEffect } from 'react'
import { useXR } from '@react-three/xr'

const XR = () => {
  const { player, isPresenting } = useXR();
  // console.log('Are we in VR mode? ' + isPresenting);
  useEffect(() => {
    if (isPresenting) {
      // player.position.x = 0;
      // player.position.y = 1;
      // player.position.z += 10;
    } else {
      // player.position.x = 0;
      // player.position.y = 0;
      // player.position.z = 1;
    }
  }, [player, isPresenting]);

  return null;
};

export default XR