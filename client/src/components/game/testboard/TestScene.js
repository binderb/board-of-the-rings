import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BoardSpace from './BoardSpace';
import Player from './Player';
import { useGameSession } from '../../../utils/GameSessionContext';

export default function Scene ({playerRef, playerPosition, initialPlayerPosition}) {

  const { boardCameraPosition } = useGameSession();

  const vec = new THREE.Vector3();

  useFrame(state => {
    state.camera.position.lerp(vec.set(...boardCameraPosition), 0.1);
    state.camera.updateProjectionMatrix();
    playerRef.current.position.lerp(vec.set(...playerPosition),0.1);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0,2,5]} />
      <Player playerRef={playerRef} position={initialPlayerPosition} />
      <BoardSpace position={[0,0,0]} />
      <BoardSpace position={[1,0,0]} />
      <BoardSpace position={[2,0,0]} />
      <BoardSpace position={[3,0,0]} />
      <BoardSpace position={[4,0,0]} />
      <BoardSpace position={[5,0,0]} />
      <BoardSpace position={[6,0,0]} />
      <BoardSpace position={[7,0,0]} />
      <BoardSpace position={[8,0,0]} />
      <BoardSpace position={[9,0,0]} />
      <BoardSpace position={[10,0,0]} />
    </>
  );
}
