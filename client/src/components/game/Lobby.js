import { useState, useEffect } from "react";
import { useGameSession } from "../../utils/GameSessionContext";
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

export default function Lobby () {

  const { 
    socket,
    setGameScreen, 
    roomId, 
    joinRoom,
    joinRoomAsHost, 
    isHost
  } = useGameSession();
  
  const [nameInput, setNameInput] = useState('');
  const [roomInput, setRoomInput] = useState('');
  const me = Auth.getPlayerInfo()?.data;

  useEffect(() => {
    if (roomId) {
      socket.emit("join_room", {
        roomId,
        isHost,
        playerName: me.username,
      });
      setGameScreen('waitingRoom');
    }
  }, [socket, roomId, isHost, setGameScreen, nameInput, me]);

  const handleStartHost = async () => {
    joinRoomAsHost(generateRoomId());
  }

  const handleJoin = () => {
    joinRoom(roomInput.trim());
  }

  const handleInputChange = (e) => {
    if (e.target.name === 'name-input') setNameInput(e.target.value);
    if (e.target.name === 'join-input') setRoomInput(e.target.value);
  }

  const generateRoomId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const code = [];
    for (let i=0; i<4; i++) code.push(letters[(Math.floor(Math.random()*letters.length))]);
    return code.join('');
  }

  if (!Auth.loggedIn) {
    return (
      <>
      <p>You need to be logged in to view this page!</p>
      <button className="btn btn-primary m-1" onClick={() => window.location.replace('/')}>Return to Home Page</button>
      </>
    );
  }

  return (
    <section id="lobby">
      <Link to='/profile'>&larr; Back to Profile</Link>
      <div className="p-1">
        <label htmlFor="name-input" className="pr-2">You are playing as: {me.username}</label>
      </div>
      <p className="p-1">Host a game:
        <button className="ml-2 btn btn-primary" onClick={handleStartHost}>Host</button>
      </p>
      <p className="p-1">Or, join a game hosted by another player:</p>
      <div className="p-1">
        <label htmlFor="join-input" className="pr-2">Enter a room code:</label>
        <input name="join-input" className="textfield" value={roomInput} onChange={handleInputChange}></input>
        <button className="btn btn-primary" onClick={handleJoin}>Join</button>
      </div>
    </section>
  );
}