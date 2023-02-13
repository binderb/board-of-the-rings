import { useState } from 'react';
import io from 'socket.io-client';

import Lobby from '../components/game/Lobby';
import WaitingRoom from '../components/game/WaitingRoom';
import HostLeft from '../components/game/HostLeft';
import GameSession from '../components/game/GameSession';

// This connects our front-end user to the socket
// server, and will prompt a message on the server.
const socket = io();

export default function SocketTest () {
  
  const [gameScreen, setGameScreen] = useState('lobby');
  const [roomId, setRoomId] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [roommates, setRoommates] = useState(0);

  return (
    <>
    <h1>Game Session</h1>
    <p>
      Testing basic host/join/interact functions for a turn-based game.
    </p>
    {gameScreen === 'lobby' ? <Lobby socket={socket} roomId={roomId} setRoomId={setRoomId} setGameScreen={setGameScreen} isHost={isHost} setIsHost={setIsHost} /> : null}
    {gameScreen === 'waitingRoom' ? <WaitingRoom socket={socket} roomId={roomId} setRoomId={setRoomId} setGameScreen={setGameScreen} isHost={isHost} setIsHost={setIsHost} roommates={roommates} setRoommates={setRoommates} /> : null}
    {gameScreen === 'hostLeft' ? <HostLeft setGameScreen={setGameScreen} /> : null}
    {gameScreen === 'gameSession' ? <GameSession /> : null}
    </>
  )
}