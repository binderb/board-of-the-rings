// import playerTexture from '../../../assets/textures/playerTexture.png';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useAnimatedSprite } from 'use-animated-sprite';
import { useGameSession } from '../../../utils/GameSessionContext';

export default function Player ({initialPosition, playerId}) {
  const {
    players
  } = useGameSession();
  const playerRef = useRef();
  const vec = new THREE.Vector3();
  const playerTexture = useAnimatedSprite(playerRef, {
    spriteSheetUrl: '/assets/textures/playerSheet.png',
    xCount: 2,
    yCount: 1,
    spriteFrames: 2,
    spriteX: 1,
    spriteY: 1,
    interval: 0.5
  });

  useFrame (() => {
    const me = players.find(e => e.id === playerId);
    const playerIndex = players.indexOf(me);
    const offset = 0.2;
    const boardPositionX = (me.boardPosition + playerIndex*offset) - ((players.length-1)*offset / 2);
    const boardPositionY = 0.55;
    const boardPositionZ = (0 - playerIndex*offset) + ((players.length-1)*offset / 2);
    playerRef.current.position.lerp(vec.set(boardPositionX,boardPositionY,boardPositionZ),0.08);
  });
  
  return (
    <sprite ref={playerRef} position={initialPosition}>
      <spriteMaterial map={playerTexture} />
    </sprite>
  );
}
