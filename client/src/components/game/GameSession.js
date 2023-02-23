import { useEffect } from "react";
import { useGameSession } from "../../utils/GameSessionContext";
import { useMutation } from '@apollo/client';
import QuizPrompt from './session/QuizPrompt';
import GameOver from './session/GameOver';
import Board from './session/Board';
import Auth from '../../utils/auth';
import { UPDATE_MY_WINS } from "../../utils/mutations";

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
    boardMax,
    gameOver,
    setGameOver,
    setWinner,
    resetGameSession
  } = useGameSession();

  const [incrementWins] = useMutation(UPDATE_MY_WINS);
  
  useEffect(() => {
    socket.on('receive_picked_correct', async (returnedPlayers) => {
      // let newPlayers = players.map( (e,i) => {
      //   if (e.id === socket.id) return {...players[i], animationState: "correct"};
      //   else return {...players[i]}
      // });
      // setPlayers(newPlayers);
      // await new Promise(resolve => setTimeout(resolve, 500));
      // newPlayers = returnedPlayers.map( (e,i) => {
      //   if (e.id === socket.id) return {...returnedPlayers[i], animationState: "walking"};
      //   else return {...returnedPlayers[i]}
      // });
      // setPlayers(newPlayers);
      setPlayers(returnedPlayers);
      const newCameraPosition = [
        boardCameraPosition[0]+boardStepSize,
        boardCameraPosition[1],
        boardCameraPosition[2]
      ]
      setBoardCameraPosition(newCameraPosition);
    });

    socket.on('receive_win_condition', async (players) => {
      setPlayers(players);
      const newCameraPosition = [
        boardCameraPosition[0]+boardStepSize,
        boardCameraPosition[1],
        boardCameraPosition[2]
      ]
      setBoardCameraPosition(newCameraPosition);
      const winner = players.find(e => e.boardPosition === boardMax);
      setWinner(winner);
      setGameOver(true);
      console.log(winner.id === socket.id ? `I won!` : `${winner.name} won!`);
      if (winner.id === socket.id) {
        await incrementWins();
      }
    });

    socket.on('receive_advance_turn', () => {
      advanceTurn();
    });

    socket.on('receive_end_game', () => {
      resetGameSession();
      window.location.replace('/profile');
    });

    return () => {
      socket.off('receive_picked_correct');
      socket.off('receive_win_condition');
      socket.off('receive_advance_turn');
    };
  });

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
      {!gameOver ? 
        // The game is still going.
        <>
        {(players[turn].id === socket.id) ?
          // It's my turn.
          <>
            <p className="mt-3">It's my turn!</p>
            <QuizPrompt />
            <button className="btn btn-primary m-1 mb-2" onClick={handlePassTurn}>Pass Turn</button>
          </>
          :
          // It's another player's turn.
          <>
            <p className="mt-3">It's {players[turn].name}'s turn.</p>
          </>
        }
        </>
      :
        // The game is over and we have a winner!
        <GameOver />
      }
    </>
  );
}