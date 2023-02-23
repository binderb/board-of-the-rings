import { useGameSession } from "../../utils/GameSessionContext";

export default function HostLeft () {
  
  const { setGameScreen } = useGameSession();

  const handleReturn = () => {
    setGameScreen('lobby');
  }

  return (
    <>
      <h1 className="p-0">Host Disconnected</h1>
      <p>The game host has closed their room. :( Click below to return to the lobby!</p>
      <button className="btn btn-primary m-1" onClick={handleReturn}>Return to Lobby</button>  
    </>
  );
}