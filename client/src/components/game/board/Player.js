// import playerTexture from '../../../assets/textures/playerTexture.png';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGameSession } from '../../../utils/GameSessionContext';

const animations = {
  "walking" : {
    startFrame : 0,
    endFrame : 1,
    frameTime: 500,
    loop: true
  },
  "studyMap" : {
    startFrame : 2,
    endFrame : 3,
    frameTime : 500,
    loop: false
  },
  "correct" : {
    startFrame : 4,
    endFrame : 4,
    frameTime : 99999,
    loop: false
  },
  "incorrect" : {
    startFrame : 5,
    endFrame : 5,
    frameTime : 99999,
    loop: false
  },
  "victory" : {
    startFrame : 6,
    endFrame : 6,
    frameTime : 99999,
    loop: false
  }
}

export default function Player ({initialPosition, playerId, texture}) {
  const {
    players,
    boardStepSize
  } = useGameSession();

  const currentFrame = useRef(0);
  const t = useRef(0);
  const frameCount = 7;
  const [me, setMe] = useState(null);
  const frameTime = useRef(500);
  const startFrame = useRef(0);
  const endFrame = useRef(0);
  const loop = useRef(true);
  const reset = useRef(false);
  const playerRef = useRef();
  const vec = new THREE.Vector3();

  useEffect (() => {
    // might only want to call if players me is different from state me
    if (me !== players.find(e => e.id === playerId)) {
      setMe(players.find(e => e.id === playerId));
    }
  }, [players, playerId, me]);

  useEffect (() => {
    if (me?.animationState) {
      console.log(me.animationState);
      frameTime.current = animations[me.animationState].frameTime;
      startFrame.current = animations[me.animationState].startFrame;
      endFrame.current = animations[me.animationState].endFrame;
      loop.current = animations[me.animationState].loop;
      currentFrame.current = animations[me.animationState].startFrame;
      reset.current = true;
    }
  }, [me]);

  useFrame ((_, delta) => {
    if (me) {
      // Update player board position if needed.
      const playerIndex = players.indexOf(me);
      const offsetX = 0.8;
      const offsetY = 0.2;
      const boardPositionX = ((me.boardPosition*boardStepSize) + playerIndex*offsetX) - ((players.length-1)*offsetX / 2);
      const boardPositionY = 1;
      const boardPositionZ = (0 - playerIndex*offsetY) + ((players.length-1)*offsetY / 2);
      playerRef.current.position.lerp(vec.set(boardPositionX,boardPositionY,boardPositionZ),0.08);
      //layerRef.current.lookAt(state.camera)
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
        //console.log(`${t.current}, ${currentFrame}`);
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
    }
  });
  
  return (
    <mesh scale={[2,2,1]} ref={playerRef} position={initialPosition}>
      <planeGeometry args={[0.75,1]} />
      <meshToonMaterial map={texture} transparent={true} />
    </mesh>
  );
}
