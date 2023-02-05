import io from 'socket.io-client';
import { useEffect, useState } from "react";

// This connects our front-end user to the socket
// server, and will prompt a message on the server.
const socket = io('http://localhost:3001');

function App() {

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const sendMessage = () => {
    socket.emit("send_message", { message });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("received message!");
      setMessageReceived(data.message);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <div className="App">
      <input placeholder='message...' onChange={(e) => {setMessage(e.target.value)}}/>
      <button onClick={sendMessage}>Submit Message</button>
      <h1>Message: </h1>
      {messageReceived}
    </div>
  );
}

export default App;
