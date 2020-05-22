import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import io from 'socket.io-client'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './views/Main';
import GetStarted from './views/GetStarted';
import Chatroom from './views/Chatroom';

function App() {

  // Pass callback function to initialize socket. No need to destructure to 'setSocket' function since we wont be updating the socket state
  const [socket] = useState(() => io(':8000'));
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  
  useEffect(() => {
    // Set up all event listeners in the useEffect callback function
    socket.on('message-from-server', msg => {
      console.log(msg);
      console.log(messages);
      setMessages(prevMessages => {
        return [...prevMessages, msg.msgData];
      })
    });

    // return callback function to ensure that the underlying socket will be closed if App is unmounted
    // this would be critical if we were creating the socket in a subcomponent
    return () => socket.disconnect(true);
  },[]);

  const clickHandler = (e) => {
    socket.emit("message_from_client", {"message": "client clicked a button!"});
  }

  return (
    <div className="App">
      <Main/>
      <Router>
        <GetStarted path="/" socket={socket} user={user} setUser={setUser}/>
        <Chatroom path="chatroom/" socket={socket} user={user} messages={messages}/>
      </Router>
    </div>
  );
}

export default App;
