// import playerTexture from '../../../assets/textures/playerTexture.png';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

const animations = {
  "invisible" : {
    startFrame : 19,
    endFrame: 19,
    frameTime: 9999,
    loop: false
  },
  "static" : {
    startFrame : 0,
    endFrame : 0,
    frameTime: 9999,
    loop: false
  },
  "destroy" : {
    startFrame : 0,
    endFrame : 19,
    frameTime : 100,
    loop: false
  }
}

export default function Ring ({initialPosition, texture, animation}) {

  const currentFrame = useRef(0);
  const t = useRef(0);
  const frameCount = 20;
  const frameTime = useRef(200);
  const startFrame = useRef(0);
  const endFrame = useRef(0);
  const loop = useRef(true);
  const reset = useRef(false);
  const playerRef = useRef();

  useEffect (() => {
    frameTime.current = animations[animation].frameTime;
    startFrame.current = animations[animation].startFrame;
    endFrame.current = animations[animation].endFrame;
    loop.current = animations[animation].loop;
    currentFrame.current = animations[animation].startFrame;
    reset.current = true;
  }, [animation]);

  useFrame ((_, delta) => {
    if (reset.current) {
      t.current = 0;
      playerRef.current.geometry.attributes.uv.setXY(0, (currentFrame.current/frameCount), 1);
      playerRef.current.geometry.attributes.uv.setXY(1, ((currentFrame.current+1)/frameCount), 1);
      playerRef.current.geometry.attributes.uv.setXY(2, (currentFrame.current/frameCount), 0);
      playerRef.current.geometry.attributes.uv.setXY(3, ((currentFrame.current+1)/frameCount), 0);
      playerRef.current.geometry.attributes.uv.needsUpdate = true;
      reset.current = false;
    }

    t.current += delta * 1000;
    if (t.current >= frameTime.current) {
      if (currentFrame.current >= endFrame.current) {
        if (loop.current) currentFrame.current = startFrame.current;
        else currentFrame.current = endFrame.current;
      } else {
        currentFrame.current += 1;
      }
      t.current = 0;
      playerRef.current.geometry.attributes.uv.setXY(0, (currentFrame.current/frameCount), 1);
      playerRef.current.geometry.attributes.uv.setXY(1, ((currentFrame.current+1)/frameCount), 1);
      playerRef.current.geometry.attributes.uv.setXY(2, (currentFrame.current/frameCount), 0);
      playerRef.current.geometry.attributes.uv.setXY(3, ((currentFrame.current+1)/frameCount), 0);
      playerRef.current.geometry.attributes.uv.needsUpdate = true;
    }
  });
  
  return (
    <mesh scale={[1,1,1]} ref={playerRef} position={initialPosition}>
      <planeGeometry args={[0.75,1]} />
      <meshToonMaterial map={texture} transparent={true} />
    </mesh>
  );
}
