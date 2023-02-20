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
    setBoardCameraPosition,
    boardStepSize
  } = useGameSession();
  
  useEffect(() => {
    socket.on('receive_picked_correct', (players) => {
      setPlayers(players);
      console.log(boardCameraPosition);
      console.log(boardStepSize);
      const newCameraPosition = [
        boardCameraPosition[0]+boardStepSize,
        boardCameraPosition[1],
        boardCameraPosition[2]
      ]
      console.log(newCameraPosition);
      setBoardCameraPosition(newCameraPosition);
    });

    socket.on('receive_advance_turn', () => {
      advanceTurn();
    });   

    return () => {
      socket.off('receive_picked_correct');
      socket.off('receive_advance_turn');
    };
  }, [socket, players, setPlayers, advanceTurn, boardCameraPosition, setBoardCameraPosition, boardStepSize]);

  const handlePassTurn = () => {
    pickQuestion();
    socket.emit('advance_turn', roomId);
  }

  return (
    <>
      <Board />
      {(players[turn].id === socket.id) ?
        <>
          <p className="mt-3">It's my turn!</p>
          <QuizPrompt />
          <button className="btn btn-primary m-1 mb-2" onClick={handlePassTurn}>Pass Turn</button>
        </>
        :
        <>
        <p className="mt-3">It's {players[turn].name}'s turn.</p>
        </>
      }
    </>
  );
}