function backToHome() {
  window.location.href = '/';
}

export default function Rules() {
  return (
    <>
      <div className="ruleset">
        <div className="flex flex-col items-center">
          <button className="btn btn-primary mb-2" onClick={backToHome}>Home</button>
          <h1 className="p-0">Board of the Rings</h1>
        </div>
        <p className="medieval">An Unexpected Party Game</p>
        <h2>Rules of Play</h2>
        <h4>Game Objective</h4>
        <p>
          Players are trying to get The One Ring to Mount Doom - only there can
          it be unmade! Advance through each game space by correctly answering a
          trivia question. Once you reach the final space (Mount Doom) and
          correctly answer one last question, The Ring is destroyed and you win!
        </p>
        <br></br>
        <h4>The Game Board</h4>
        <p>
          There are several spaces on the game board, representing the areas of
          Middle Earth Frodo and Sam journeyed through on their mission to
          destroy the ring. The final game board space represents Mount Doom.
        </p>
        <br></br>
        <h4>On Your Turn</h4>
        <p>
          On your turn, the game will tell you that it's your turn and you will
          be asked a trivia question. Answer correctly to advance to the next
          game board space. Press the pass turn button after your turn to pass
          play to the next player.
        </p>
        <br></br>
        <h4>Winning the Game</h4>
        <p>
          The game ends when a player reaches Mount Doom, the final game board
          space. Once this is accomplished, the ring is destroyed and the game
          ends!
        </p>
        <br></br>
        <p className="medieval">For Frodo!</p>
      </div>
    </>
  );
}
