import { useEffect } from "react";
import { useGameSession } from "../../utils/GameSessionContext";

export default function WaitingRoom () {

  const { 
    socket,
    setGameScreen,
    roomId,
    players,
    setPlayers, 
    isHost,
    leaveRoom,
    leaveRoomAsHost,
    pickQuestion,
    turn
  } = useGameSession();

  useEffect(() => {
    socket.on('receive_current_players', (players) => {
      setPlayers(players);
    });

    socket.on('receive_host_left', () => {
      leaveRoom();
      setGameScreen('hostLeft');
    });

    socket.on('receive_start_game', () => {
      setGameScreen('gameSession');
      const newPlayers = players.map( (e,i) => {
        if (i === turn) return {...players[i], animationState: "studyMap"};
        else return {...players[i], animationState: "walking"};
      });
      setPlayers(newPlayers);
    });   

    return () => {
      socket.off('receive_current_roommates');
      socket.off('receive_host_left');
      socket.off('receive_start_game');
    };
  });

  const handleCancelHost = () => {
    leaveRoomAsHost();
    setGameScreen('lobby');
  }

  const handleCancelPlayer = () => {
    leaveRoom();
    setGameScreen('lobby');
  }

  const handleStartGame = () => {
    pickQuestion();
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
      <p>Players in this room: {players.length}</p>
      <div>
        {players.map( (player) => 
          <div key={player.id} className='bg-primary rounded p-2 px-4 m-1 block'>
            {player.isHost ? `${player.name} (host)` : player.name}
          </div>
        )}
      </div>
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