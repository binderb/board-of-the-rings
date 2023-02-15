import React, { useState, useContext } from 'react';
import { io } from 'socket.io-client';

// This connects our front-end user to the socket
// server, and will prompt a message on the server.
const socket = io();

// Create the game session context using React.CreateContext()
export const GameSessionContext = React.createContext();

// Create a custom hook that allows easy access to our GameSessionContext values
export const useGameSession = () => useContext(GameSessionContext);

// Creating our game session provider. Accepts an argument of "props", here we're plucking off the "children" object.
export default function GameSessionProvider({ children }) {
  
  // Global state variables for the game session
  const [gameScreen, setGameScreen] = useState('lobby');
  const [roomId, setRoomId] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(0);

  // Methods
  const joinRoom = (id) => {
    setRoomId(id);
  }

  const joinRoomAsHost = (id) => {
    setIsHost(true);
    setRoomId(id);
  }

  const leaveRoom = () => {
    socket.emit('leave_room', roomId);
    setRoomId(null);
  }

  const leaveRoomAsHost = () => {
    socket.emit('leave_room',roomId);
    socket.emit('host_left', roomId);
    setRoomId(null);
    setIsHost(false);
  }

  const advanceTurn = () => {
    if (turn >= players.length-1) setTurn(0);
    else setTurn(turn+1);
  }

  // The provider component will wrap all other components inside of it that need access to our global state
  return (
    // Dark theme and toggle theme are getting provided to the child components
    <GameSessionContext.Provider value={{
      socket,
      gameScreen,
      setGameScreen,
      roomId,
      isHost,
      joinRoom,
      joinRoomAsHost,
      leaveRoom,
      leaveRoomAsHost,
      players,
      setPlayers,
      turn,
      advanceTurn
    }}>
      {children}
    </GameSessionContext.Provider>
  );
}
