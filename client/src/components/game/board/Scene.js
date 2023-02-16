import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Marker from '../testboard/BoardSpace';

import { useGameSession } from '../../../utils/GameSessionContext';

export default function Scene () {

  const { boardCameraPosition } = useGameSession();
  const vec = new THREE.Vector3();

  useFrame(state => {
    // state.camera.lookAt(boardCameraPosition);
    state.camera.position.lerp(vec.set(...boardCameraPosition), 0.1);
    state.camera.updateProjectionMatrix();
  });

  return (
    <>
    {/* <PerspectiveCamera makeDefault> */}
      <directionalLight color="green" position={[0,2,5]} />
      <Marker position={[0,0,0]} />
      <Marker position={[1,0,0]} />
      <Marker position={[2,0,0]} />
      <Marker position={[3,0,0]} />
      <Marker position={[4,0,0]} />
      <Marker position={[5,0,0]} />
      <Marker position={[6,0,0]} />
    {/* </PerspectiveCamera> */}
    </>
  );
}
