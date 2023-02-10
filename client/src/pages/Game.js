import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// This connects our front-end user to the socket
// server, and will prompt a message on the server.
const socket = io('http://localhost:3001');

export default function SocketTest () {
  
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
    <>
    <h1>Game Session</h1>
    <p></p>
    </>
  )
}