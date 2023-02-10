
import { useState, useEffect } from "react";

export default function Lobby ({ socket, roomId, setRoomId }) {
  
  const [hostStatus, setHostStatus] = useState('');
  const [roomInput, setRoomInput] = useState('');
  
  useEffect(() => {
    socket.on('receive_current_roommates', (data) => {
      console.log(`received roommates: ${data}`);
    });

    return () => {
      socket.off('receive_current_roommates');
    };
  }, []);

  useEffect(() => {
    if (roomId) {
      socket.emit("join_room", roomId);
      setHostStatus(`Your room code is: ${roomId}`);
    }
  }, [roomId]);

  const handleStartHost = async () => {
    setRoomId(generateRoomId());
  }

  const handleJoin = () => {
    setRoomId(roomInput.trim());
  }

  const handleInputChange = (e) => {
    setRoomInput(e.target.value);
  }

  const generateRoomId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const code = [];
    for (let i=0; i<4; i++) code.push(letters[(Math.floor(Math.random()*letters.length))]);
    return code.join('');
  }

  return (
    <section id="lobby">
      <p className="p-1">Host a game:</p>
      <div className="p-1">
        <button className="btn btn-primary" onClick={handleStartHost}>Host</button>
        <span className="pl-2">{hostStatus}</span>
      </div>
      <p className="p-1">Or, join a game hosted by another player:</p>
      <div className="p-1">
        <label htmlFor="join-input" className="pr-2">Enter a join code:</label>
        <input name="join-input" className="textfield" value={roomInput} onChange={handleInputChange}></input>
        <button className="btn btn-primary" onClick={handleJoin}>Join</button>
      </div>
    </section>
  );
}