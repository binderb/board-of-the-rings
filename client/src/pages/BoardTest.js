import TestBoard from "../components/game/testboard/TestBoard";
import { useGameSession } from "../utils/GameSessionContext"
import { useState } from 'react';

export default function BoardTest () {
  const { setBoardCameraPosition } = useGameSession();
  const initialPlayerPosition = [0,0.55,0];
  const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);

  return (
    <>
    <h1>Board Test</h1>
    <TestBoard initialPlayerPosition={initialPlayerPosition} playerPosition={playerPosition} />
    <button className="btn btn-primary m-1 block" onClick={() => setBoardCameraPosition([0,2,10])}>Camera Pos 1</button>
    <button className="btn btn-primary m-1 block" onClick={() => setBoardCameraPosition([1,2,10])}>Camera Pos 2</button>
    <button className="btn btn-primary m-1 block" onClick={() => setPlayerPosition([0,0.55,0])}>Player Pos 1</button>
    <button className="btn btn-primary m-1 block" onClick={() => setPlayerPosition([1,0.55,0])}>Player Pos 2</button>
    </>
  )
}