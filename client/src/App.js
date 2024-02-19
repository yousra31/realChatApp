import './App.scss';
import io from 'socket.io-client';
import Room from './components/Room';
import {useChatContext} from './context/useChatContext';
import { useState } from 'react';

function App() {

  const socket = io.connect("http://localhost:3001")
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="App">
      <useChatContext.Provider value={{socket, username, setUsername, room, setRoom}}>
        <Room/>
      </useChatContext.Provider>
    </div>
  );
}

export default App;
