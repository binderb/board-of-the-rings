import { useEffect } from "react";
import { useGameSession } from "../../utils/GameSessionContext";
import { useMutation } from '@apollo/client';
import QuizPrompt from './session/QuizPrompt';
import Board from './session/Board';
import Auth from '../../utils/auth';
// import { }

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
    boardStepSize,
    boardMax
  } = useGameSession();

  // const [incrementWins] = useMutation()
  
  useEffect(() => {
    socket.on('receive_picked_correct', (players) => {
      setPlayers(players);
      const newCameraPosition = [
        boardCameraPosition[0]+boardStepSize,
        boardCameraPosition[1],
        boardCameraPosition[2]
      ]
      setBoardCameraPosition(newCameraPosition);
    });

    socket.on('receive_win_condition', (players) => {
      setPlayers(players);
      const winner = players.find(e => e.boardPosition === boardMax);

      console.log(winner.id === socket.id ? `I won!` : `${winner.name} won!`);
      const newCameraPosition = [
        boardCameraPosition[0]+boardStepSize,
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
      socket.off('receive_win_condition');
      socket.off('receive_advance_turn');
    };
  }, [socket, players, setPlayers, advanceTurn, boardCameraPosition, setBoardCameraPosition, boardStepSize, boardMax]);

  const handlePassTurn = () => {
    pickQuestion();
    socket.emit('advance_turn', roomId);
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