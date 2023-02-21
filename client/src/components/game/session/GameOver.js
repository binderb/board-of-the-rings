import { useGameSession } from '../../../utils/GameSessionContext';

export default function QuizPrompt () {

  const { 
    roomId,
    isHost,
    socket,
    winner
  } = useGameSession();

  const handleEndGame = () => {
    socket.emit('end_game', roomId);
  }

  return (
    <>
      <p className="mt-3">{winner.id === socket.id ? `You were ` : `${winner.name} was `} victorious!</p>
      {isHost ?
      <button className="btn btn-primary m-1" onClick={handleEndGame}>End Game</button>
      : null}
    </>
  );

}