// import playerTexture from '../../../assets/textures/playerTexture.png';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useAnimatedSprite } from 'use-animated-sprite';
import { useGameSession } from '../../../utils/GameSessionContext';

export default function Player ({initialPosition, playerId}) {
  const {
    players,
    boardStepSize
  } = useGameSession();
  const playerRef = useRef();
  const vec = new THREE.Vector3();
  const playerWalk = useAnimatedSprite(playerRef, {
    spriteSheetUrl: '/assets/textures/playerSheet-Hobbit.png',
    xCount: 5,
    yCount: 1,
    spriteFrames: 1,
    spriteX: 4,
    spriteY: 1,
    intervalFunc: () => 0.5
  });


  useFrame (() => {
    const me = players.find(e => e.id === playerId);
    const playerIndex = players.indexOf(me);
    const offset = 0.5;
    const boardPositionX = ((me.boardPosition*boardStepSize) + playerIndex*offset) - ((players.length-1)*offset / 2);
    const boardPositionY = 1;
    const boardPositionZ = (0 - playerIndex*offset) + ((players.length-1)*offset / 2);
    playerRef.current.position.lerp(vec.set(boardPositionX,boardPositionY,boardPositionZ),0.08);
  });
  
  return (
    <sprite scale={[1.5,2,1]} ref={playerRef} position={initialPosition}>
      <spriteMaterial map={playerWalk} />
    </sprite>
  );
}
