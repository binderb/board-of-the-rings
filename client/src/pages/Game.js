import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Lobby from '../components/game/Lobby';

// This connects our front-end user to the socket
// server, and will prompt a message on the server.
const socket = io();

export default function SocketTest () {
  
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [gameScreen, setGameScreen] = useState('lobby');
  const [roomId, setRoomId] = useState('');

  const sendMessage = () => {
    socket.emit("send_message", { message });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("received message!");
      setMessageReceived(data.message);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <>
    <h1>Game Session</h1>
    <p>
      Testing basic host/join/interact functions for a turn-based game.
    </p>
    {gameScreen === 'lobby' ? <Lobby socket={socket} roomId={roomId} setRoomId={setRoomId} /> : null}
    </>
  )
}