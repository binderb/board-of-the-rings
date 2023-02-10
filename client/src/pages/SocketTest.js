import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// This connects our front-end user to the socket
// server, and will prompt a message on the server.
const socket = io();

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
    <h1>Socket Test Page</h1>
    <p>
      Instructions: Open this page in two (or more) different windows, and view them side-by-side. Messages sent on one window should be displayed immediately on the other window, and vice versa.
    </p>
    <p>
      Next steps: Right now, the server is configured to emit to EVERYONE whenever one of the clients sends an event. We can build an interface to allow a player to "host" a closed game and let others join by invitation.
    </p>
    <input className='rounded p-1 mr-2 bg-green-700 text-highlight placeholder-green-600' placeholder='message...' onChange={(e) => {setMessage(e.target.value)}}/>
    <button className='rounded bg-green-800 p-1 px-2 hover:bg-green-700' onClick={sendMessage}>Submit Message</button>
    <h1 className='py-3'>Message: </h1>
    {messageReceived}
    </>
  )
}