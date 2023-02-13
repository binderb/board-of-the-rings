import { useEffect } from "react";

export default function WaitingRoom ({ socket, roomId, roommates, setRoommates, isHost, setRoomId, setGameScreen, setIsHost }) {

  

  useEffect(() => {
    socket.on('receive_current_roommates', (data) => {
      setRoommates(data);
    });

    socket.on('receive_host_left', (data) => {
      socket.emit('leave_room', roomId);
      setRoomId(null);
      setGameScreen('hostLeft');
    });

    socket.on('receive_start_game', (data) => {
      setGameScreen('gameSession');
    });   

    return () => {
      socket.off('receive_current_roommates');
      socket.off('receive_host_left');
      socket.off('receive_start_game');
    };
  }, [socket, roomId, setGameScreen, setRoomId, setRoommates]);

  const handleCancelHost = () => {
    socket.emit('leave_room',roomId);
    socket.emit('host_left', roomId);
    setRoomId(null);
    setIsHost(false);
    setGameScreen('lobby');
  }

  const handleCancelPlayer = () => {
    socket.emit('leave_room',roomId);
    setRoomId(null);
    setGameScreen('lobby');
  }

  const handleStartGame = () => {
    socket.emit('start_game',roomId);
  }

  return (
    <>
      {isHost
        ?
        <p>You are the host. Click "Start" when all players have joined!</p>
        :
        <p>Waiting for the host to start the game...</p>
      }
      <p>Your room code is: {roomId}</p>
      <p>Players in this room: {roommates}</p>
      { isHost ?
        <>
        <button className="btn btn-primary m-1" onClick={handleCancelHost}>Cancel</button>
        <button className="btn btn-primary m-1" onClick={handleStartGame}>Start Game</button>
        </>
        :
        <button className="btn btn-primary m-1" onClick={handleCancelPlayer}>Cancel</button>
      }
    </>
    

  );

}