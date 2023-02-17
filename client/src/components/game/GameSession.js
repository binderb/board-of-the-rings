import { useEffect } from "react";
import { useGameSession } from "../../utils/GameSessionContext";
import QuizPrompt from './session/QuizPrompt';
import Board from './session/Board';

export default function GameSession () {

  const {
    socket, 
    roomId, 
    players, 
    turn, 
    advanceTurn,
    pickQuestion,
    setPlayers,
    boardCameraPosition,
    setBoardCameraPosition
  } = useGameSession();
  
  useEffect(() => {
    socket.on('receive_picked_correct', (players) => {
      setPlayers(players);
      const newCameraPosition = [
        boardCameraPosition[0]+1,
        boardCameraPosition[1],
        boardCameraPosition[2]
      ]
      setBoardCameraPosition(newCameraPosition);
    });

    socket.on('receive_advance_turn', () => {
      advanceTurn();
    });   

    return () => {
      socket.off('receive_picked_correct');
      socket.off('receive_advance_turn');
    };
  }, [socket, players, setPlayers, advanceTurn, boardCameraPosition, setBoardCameraPosition]);

  const handlePassTurn = () => {
    pickQuestion();
    socket.emit('advance_turn', roomId);
  }

  return (
    <>
      {(players[turn].id === socket.id) ?
        <>
          <p>It's my turn!</p>
          <QuizPrompt />
          <button className="btn btn-primary m-1 mb-2" onClick={handlePassTurn}>Pass Turn</button>
        </>
        :
        <>
        <p>It's {players[turn].name}'s turn.</p>
        </>
      }
      <Board />
    </>
  );
}