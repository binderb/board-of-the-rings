import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import BackgroundComponent from './BackgroundComponent';
import BoardSpace from './BoardSpace';
import Player from './Player';
import { useGameSession } from '../../../utils/GameSessionContext';
import Ring from './Ring';

export default function Scene () {

  const { 
    boardCameraPosition,
    players,
    ringAnimation
  } = useGameSession();

  const vec = new THREE.Vector3();
  const hobbitTexture = useLoader(THREE.TextureLoader, '/assets/textures/playerSheet-Hobbit.webp');
  const ringTexture = useLoader(THREE.TextureLoader, '/assets/textures/ringSheet.webp');

  useFrame(state => {
    state.camera.position.lerp(vec.set(...boardCameraPosition), 0.1);
    state.camera.updateProjectionMatrix();
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0,2,5]} />
      <BackgroundComponent sprite="/assets/textures/shire.webp" position={[0,0.75,-2]} scale={[6,3,2]} />
      <BackgroundComponent sprite="/assets/textures/bree.webp" position={[5.5,0.5,-2]} scale={[7,3,2]} />
      <BackgroundComponent sprite="/assets/textures/weathertop.webp" position={[10.5,0.75,-2]} scale={[7,3,2]} />
      <BackgroundComponent sprite="/assets/textures/moria.webp" position={[15,1,-2]} scale={[5,3,2]} />
      <BackgroundComponent sprite="/assets/textures/anduin.webp" position={[20,0.75,-2]} scale={[5.5,3.5,2]} />
      <BackgroundComponent sprite="/assets/textures/emynmuil.webp" position={[25,0.5,-2]} scale={[5.5,3.5,2]} />
      <BackgroundComponent sprite="/assets/textures/orodruin.webp" position={[30,0.75,-2]} scale={[4,3,2]} />

      <Ring texture={ringTexture} initialPosition={[30.8,1.5,1]} animation={ringAnimation} />
      {players.map( (player, index) => {
        const offsetX = 0.8;
        const offsetY = 0.2;
        const boardPositionX = (0 + index*offsetX) - ((players.length-1)*offsetX / 2);
        const boardPositionY = 1;
        const boardPositionZ = (0 - index*offsetY) + ((players.length-1)*offsetY / 2);
        return (
          <Player key={player.id} texture={hobbitTexture} playerId={player.id} initialPosition={[boardPositionX,boardPositionY,boardPositionZ]} />
        );
      })}
      <BoardSpace position={[0,0,0]} />
      <BoardSpace position={[5,0,0]} />
      <BoardSpace position={[10,0,0]} />
      <BoardSpace position={[15,0,0]} />
      <BoardSpace position={[20,0,0]} />
      <BoardSpace position={[25,0,0]} />
      <BoardSpace position={[30,0,0]} />
    </>
  );
}
