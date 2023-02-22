import { useAnimatedSprite } from 'use-animated-sprite';
// import { useGameSession } from '../../../utils/GameSessionContext';
import { useRef } from 'react';


export default function BackgroundComponent ({sprite, position, scale}) {

  const backgroundRef = useRef();
  const backgroundTexture = useAnimatedSprite(backgroundRef, {
    spriteSheetUrl: sprite,
    xCount: 1,
    yCount: 1,
    spriteFrames: 1,
    spriteX: 0,
    spriteY: 0,
    intervalFunc: () => 0.5
  });

  return (
    <sprite ref={backgroundRef} position={position} scale={scale}>
      <spriteMaterial map={backgroundTexture} />
    </sprite>
  );
}