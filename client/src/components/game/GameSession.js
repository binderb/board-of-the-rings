import { useEffect } from "react";
import { useGameSession } from "../../utils/GameSessionContext";
import { useMutation } from '@apollo/client';
import QuizPrompt from './session/QuizPrompt';
import OpponentPrompt from './session/OpponentPrompt';
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
    setRingAnimation,
    setRingPosition,
    resetGameSession
  } = useGameSession();

  const [incrementWins] = useMutation(UPDATE_MY_WINS);
  
  useEffect(() => {
    socket.on('receive_picked_correct', async ({players: returnedPlayers}) => {
      const correctId = returnedPlayers.find(e => e.animationState === 'correct').id;
      let newPlayers = players.map( (e,i) => {
        if (e.id === correctId) return {...players[i], animationState: "correct"};
        else return {...players[i]}
      });
      setPlayers(newPlayers);
      await new Promise(resolve => setTimeout(resolve, 500));
      newPlayers = returnedPlayers.map( (e,i) => {
        if (e.id === correctId) return {...returnedPlayers[i], animationState: "walking"};
        else return {...returnedPlayers[i]}
      });
      setPlayers(newPlayers);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCameraPosition = [
        boardCameraPosition[0]+boardStepSize,
        boardCameraPosition[1],
        boardCameraPosition[2]
      ]
      setBoardCameraPosition(newCameraPosition);
    });

    socket.on('receive_picked_incorrect', ({players: returnedPlayers}) => {
      console.log(returnedPlayers);
      setPlayers(returnedPlayers);
    });

    socket.on('receive_win_condition', async ({players: returnedPlayers}) => {
      const correctId = returnedPlayers.find(e => e.animationState === 'correct').id;
      let newPlayers = players.map( (e,i) => {
        if (e.id === correctId) return {...players[i], animationState: "correct"};
        else return {...players[i]}
      });
      setPlayers(newPlayers);
      await new Promise(resolve => setTimeout(resolve, 500));
      newPlayers = returnedPlayers.map( (e,i) => {
        if (e.id === correctId) return {...returnedPlayers[i], animationState: "walking"};
        else return {...returnedPlayers[i]}
      });
      setPlayers(newPlayers);
      await new Promise(resolve => setTimeout(resolve, 1000));
      newPlayers = newPlayers.map( (e,i) => {
        if (e.id === correctId) return {...returnedPlayers[i], animationState: "victory"};
        else return {...returnedPlayers[i]}
      });
      setPlayers(newPlayers);
      setRingAnimation('static');
      await new Promise(resolve => setTimeout(resolve, 200));
      setRingAnimation('destroy');
      await new Promise(resolve => setTimeout(resolve, 1900));
      newPlayers = newPlayers.map( (e,i) => {
        if (e.id === correctId) return {...returnedPlayers[i], animationState: "correct"};
        else return {...returnedPlayers[i]}
      });
      setPlayers(newPlayers);
      const newCameraPosition = [
        boardCameraPosition[0]+boardStepSize,
        boardCameraPosition[1],
        boardCameraPosition[2]
      ]
      setBoardCameraPosition(newCameraPosition);
      const winner = returnedPlayers.find(e => e.boardPosition === boardMax);
      setWinner(winner);
      setGameOver(true);
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
      socket.off('receive_picked_incorrect');
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
            <OpponentPrompt />
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