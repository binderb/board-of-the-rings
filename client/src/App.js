import io from 'socket.io-client';

// This connects our front-end user to the socket
// server, and will prompt a message on the server.
const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
      App online!<br/>
      Check the server console to see when users connect to the app!
    </div>
  );
}

export default App;
