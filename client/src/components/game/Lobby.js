
import { useState, useEffect } from "react";

export default function Lobby ({ socket, roomId, setRoomId, setGameScreen, isHost, setIsHost, setMe }) {
  
  const [nameInput, setNameInput] = useState('');
  const [roomInput, setRoomInput] = useState('');

  useEffect(() => {
    if (roomId) {
      setMe({
        name: nameInput.trim()
      });
      socket.emit("join_room", {
        roomId,
        isHost,
        playerName: nameInput.trim(),
      });
      setGameScreen('waitingRoom');
    }
  }, [roomId]);

  const handleStartHost = async () => {
    setIsHost(true);
    setRoomId(generateRoomId());
  }

  const handleJoin = () => {
    setRoomId(roomInput.trim());
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

  return (
    <section id="lobby">
      <div className="p-1">
        <label htmlFor="name-input" className="pr-2">Enter your name:</label>
        <input name="name-input" className="textfield" value={nameInput} onChange={handleInputChange}></input>
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