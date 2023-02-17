// import playerTexture from '../../../assets/textures/playerTexture.png';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useAnimatedSprite } from 'use-animated-sprite';

export default function Player ({playerRef, position}) {
  const playerTexture = useAnimatedSprite(playerRef, {
    spriteSheetUrl: '/assets/textures/playerSheet.png',
    xCount: 2,
    yCount: 1,
    spriteFrames: 2,
    spriteX: 1,
    spriteY: 1,
    interval: 0.5
  });
  
  useLoader(TextureLoader, '/assets/textures/playerTexture.png');

  return (
    <sprite ref={playerRef} position={position}>
      <spriteMaterial map={playerTexture} />
    </sprite>
  );
}
