import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { GameSessionContext, useGameSession } from '../../../utils/GameSessionContext';
import Scene from '../board/Scene';

export default function Board () {

  const {
    boardCameraPosition,
    boardStepSize
  } = useGameSession();

  const backgrounds = [
    "bg-[#99FFFF]", // Shire
    "bg-[#1b77d8]", // Bree
    "bg-[#662200]" // Orodruin
  ]

  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);

  useEffect ( () => {
    setCurrentBackground(backgrounds[boardCameraPosition[0]/boardStepSize])
  }, [boardCameraPosition, backgrounds, boardStepSize]);

  const setupCamera = (state) => {
    state.camera.fov = 40;
    state.camera.zoom = 3;
    state.camera.position.set(0,2,10);
    state.camera.rotation.set(-0.1,0,0);
  }

  return (
    <section id='board' className={`h-[250px] duration-1000 w-full ${currentBackground}`}>
      <Canvas onCreated={setupCamera}>
        <Scene />
      </Canvas>
    </section>
  );
}