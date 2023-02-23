import { useGameSession } from '../utils/GameSessionContext';
import Lobby from '../components/game/Lobby';
import WaitingRoom from '../components/game/WaitingRoom';
import HostLeft from '../components/game/HostLeft';
import GameSession from '../components/game/GameSession';

export default function Game () {

  const { gameScreen } = useGameSession();

  return (
    <>
    {gameScreen === 'lobby' ? <Lobby /> : null}
    {gameScreen === 'waitingRoom' ? <WaitingRoom /> : null}
    {gameScreen === 'hostLeft' ? <HostLeft /> : null}
    {gameScreen === 'gameSession' ? <GameSession /> : null}
    </>
  )
}