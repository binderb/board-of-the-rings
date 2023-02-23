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
  }
}

export default function Player ({initialPosition, playerId, texture}) {
  const {
    players,
    boardStepSize
  } = useGameSession();

  const currentFrame = useRef(0);
  const t = useRef(0);
  const frameCount = 5;
  //texture.repeat.set(1/frameCount,1);
  // texture.offset.x = currentFrame / frameCount;
  const [me, setMe] = useState(null);
  const [frameTime, setFrameTime] = useState(500);
  const [startFrame, setStartFrame] = useState(0);
  const [endFrame, setEndFrame] = useState(0);
  const [loop, setLoop] = useState(true);
  const [reset, setReset] = useState(false);
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
      setFrameTime(animations[me.animationState].frameTime);
      setStartFrame(animations[me.animationState].startFrame);
      setEndFrame(animations[me.animationState].endFrame);
      setLoop(animations[me.animationState].loop);
      currentFrame.current = animations[me.animationState].startFrame;
      
      setReset(true);
    }
  }, [me]);

  useFrame ((_, delta) => {
    if (me) {
      // Update player board position if needed.
      const playerIndex = players.indexOf(me);
      const offset = 0.5;
      const boardPositionX = ((me.boardPosition*boardStepSize) + playerIndex*offset) - ((players.length-1)*offset / 2);
      const boardPositionY = 1;
      const boardPositionZ = (0 - playerIndex*offset) + ((players.length-1)*offset / 2);
      playerRef.current.position.lerp(vec.set(boardPositionX,boardPositionY,boardPositionZ),0.08);
      //layerRef.current.lookAt(state.camera)
      if (reset) {
        t.current = 0;
        playerRef.current.geometry.attributes.uv.setXY(0, (currentFrame.current/frameCount), 1);
        playerRef.current.geometry.attributes.uv.setXY(1, ((currentFrame.current+1)/frameCount), 1);
        playerRef.current.geometry.attributes.uv.setXY(2, (currentFrame.current/frameCount), 0);
        playerRef.current.geometry.attributes.uv.setXY(3, ((currentFrame.current+1)/frameCount), 0);
        playerRef.current.geometry.attributes.uv.needsUpdate = true;
        setReset(false);
      }

      t.current += delta * 1000;
      if (t.current >= frameTime) {
        //console.log(`${t.current}, ${currentFrame}`);
        if (currentFrame.current >= endFrame) {
          if (loop) currentFrame.current = startFrame;
          else currentFrame.current = endFrame;
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
