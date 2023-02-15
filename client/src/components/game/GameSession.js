import { useEffect } from "react";
import { useGameSession } from "../../utils/GameSessionContext";
import QuizPrompt from './session/QuizPrompt';

export default function GameSession () {

  const {
    socket, 
    roomId, 
    players, 
    turn, 
    advanceTurn 
  } = useGameSession();
  
  useEffect(() => {
    socket.on('receive_advance_turn', () => {
      advanceTurn();
    });   

    return () => {
      socket.off('receive_advance_turn');
    };
  }, [socket, players, advanceTurn]);

  const handlePassTurn = () => {
    socket.emit('advance_turn', roomId);
  }

  return (
    <>
      {(players[turn].id === socket.id) ?
        <>
          <p>It's my turn!</p>
          <QuizPrompt />
          <button className="btn btn-primary m-1" onClick={handlePassTurn}>Pass Turn</button>
        </>
        :
        <p>It's {players[turn].name}'s turn.</p>
      }
    </>
  );
}