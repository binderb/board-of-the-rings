import { useEffect } from "react";

export default function GameSession ({ socket, roomId, players, turn, setTurn, me }) {
  
  useEffect(() => {
    socket.on('receive_advance_turn', () => {
      console.log("turn passing!");
      if (turn >= players.length-1) {
        console.log('conditional passed.');
        console.log(turn);
        setTurn(0);
      } else {
        console.log('conditional failed.');
        console.log(turn);
        console.log(players.length-1);
        setTurn(turn+1);
      }
    });   

    return () => {
      socket.off('receive_advance_turn');
    };
  }, [turn, players, setTurn, socket]);

  const handlePassTurn = () => {
    socket.emit('advance_turn', roomId);
  }

  return (
    <>
      {(players[turn].name === me.name) ?
        <>
          <p>It's my turn!</p>
          <button className="btn btn-primary m-1" onClick={handlePassTurn}>Pass Turn</button>
        </>
        :
        <p>It's {players[turn].name}'s turn.</p>
      }

      
    </>
  );
}