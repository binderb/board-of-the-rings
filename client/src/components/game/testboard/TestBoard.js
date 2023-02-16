import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import TestScene from './TestScene';

export default function TestBoard ({playerPosition, initialPlayerPosition}) {

  const playerRef = useRef();

  const setupCamera = (state) => {
    state.camera.fov = 40;
    state.camera.zoom = 3;
    state.camera.position.set(0,2,10);
    state.camera.rotation.set(-0.1,0,0);
  }

  return (
    <section id='board' className='h-[200px] w-full bg-green-900'>
      <Canvas onCreated={setupCamera}>
        <TestScene playerRef={playerRef} playerPosition={playerPosition} initialPlayerPosition={initialPlayerPosition} />
      </Canvas>
    </section>
  );
}