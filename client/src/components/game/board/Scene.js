import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BoardSpace from './BoardSpace';
import Player from './Player';
import { useGameSession } from '../../../utils/GameSessionContext';

export default function Scene () {

  const { 
    boardCameraPosition,
    players
  } = useGameSession();

  const vec = new THREE.Vector3();

  useFrame(state => {
    state.camera.position.lerp(vec.set(...boardCameraPosition), 0.1);
    state.camera.updateProjectionMatrix();
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0,2,5]} />
      {players.map( (player, index) => {
        const offset = 0.2;
        // const boardPositionX = (player.boardPosition + index*offset) - ((players.length-1)*offset / 2);
        // const boardPositionY = 0.55;
        // const boardPositionZ = (0 - index*offset) + ((players.length-1)*offset / 2);
        const boardPositionX = 0;
        const boardPositionY = 0;
        const boardPositionZ = 0;
        return (
          <Player key={player.id} playerId={player.id} initialPosition={[boardPositionX,boardPositionY,boardPositionZ]} />
        );
      })}
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
