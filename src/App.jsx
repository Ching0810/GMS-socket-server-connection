import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { ulid } from 'ulid';

function App() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const establishConnectionAndSetState = async () => {
      try {
        await establishConnection();
        console.log('WebSocket connection established.');
      } catch (error) {
        console.error('Failed to establish WebSocket connection:', error);
      }
    };
    establishConnectionAndSetState();
  }, []);

  // Function to establish WebSocket connection
  const establishConnection = () => {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket('ws://10.12.10.22:8000/rgp_gms/v1/game/ws');

      socket.onopen = function(event) {
        console.log('WebSocket connection opened:', event);
        setWs(socket);
        resolve();
      };

      socket.onmessage = function(event) {
        console.log('Message from server:', JSON.parse(event.data));
      };

      socket.onclose = function(event) {
        console.log('WebSocket connection closed:', event);
      };

      socket.onerror = function(event) {
        console.error('WebSocket error:', event);
        reject(new Error('WebSocket error'));
      };
    });
  };

  const sendMessage = (action, data) => {
    if (!ws) {
      console.error('WebSocket connection not established');
      return;
    }

    const id = ulid();
    const message = {
      "action": action,
      "id": id,
      "target": "rgp-machine",
      "data": data
    };

    ws.send(JSON.stringify(message));
    console.log(message);
  };

  const handleRegister = () => {
    const data = {
      player_token: "eyJhbGciOiJIUzI1NiJ9.eyJsaWNlbnNlZV9pZCI6NTAwMDAsImNhc2lub19pZCI6NTAwMDAsInByb3BlcnR5X2lkIjo1MDAwMSwicGxheWVyX2lkIjoxLCJsb2dpbl9uYW1lIjoiY2hvbmdpbiIsImFjY3RfbG9naW4iOiJjaG9uZ2luIiwiaG9sZGVybmFtZSI6IlBILTUwMDAxIiwiY3VycmVuY3lfaWQiOjEsImN1cnJlbmN5IjoiUEhQIiwid2hpdGVsaXN0ZWQiOmZhbHNlLCJ0ZXN0X21vZGUiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyMy0xMC0yNCAwMzoyNzozNiJ9.s6K_KU8C9_tJHgYaE5jizYpkK6xX-fqNcyejry8_bjQ",
      machine_token: "50001|1|zone1|1|location1|1|machine1|01HXTXW8GVPDG35MK1DQWB6X1G|50000"
    };

    sendMessage("register", data);
  };

  const handleUnregister = () => {
    const data = {
      player_token: "eyJhbGciOiJIUzI1NiJ9.eyJsaWNlbnNlZV9pZCI6NTAwMDAsImNhc2lub19pZCI6NTAwMDAsInByb3BlcnR5X2lkIjo1MDAwMSwicGxheWVyX2lkIjoxLCJsb2dpbl9uYW1lIjoiY2hvbmdpbiIsImFjY3RfbG9naW4iOiJjaG9uZ2luIiwiaG9sZGVybmFtZSI6IlBILTUwMDAxIiwiY3VycmVuY3lfaWQiOjEsImN1cnJlbmN5IjoiUEhQIiwid2hpdGVsaXN0ZWQiOmZhbHNlLCJ0ZXN0X21vZGUiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyMy0xMC0yNCAwMzoyNzozNiJ9.s6K_KU8C9_tJHgYaE5jizYpkK6xX-fqNcyejry8_bjQ",
      machine_token: "50001|1|zone1|1|location1|1|machine1|01HXTXW8GVPDG35MK1DQWB6X1G|50000"
    };

    sendMessage("unregister", data);
  };

  const handleOpenMachine = () => {
    const data = {
      "game_id": 718019537,
      "property_id": 50001,
      "lang": "en"
    };

    sendMessage("open_machine", data);
  };

  const handleTouchStream = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const windowX = window.innerWidth
    const windowY = window.innerHeight
    const data = {
      "game_id": 540314848,
      "property_id": 50001,
      "x": x,
      "y": y,
      "windowX": windowX,
      "windowY": windowY
    };

    if (event.target.className !== 'button') {
      sendMessage("touch_stream", data);
    }
  };

  const handleSpin = () => {
    const data = {
      "game_id": 718019537,
      "property_id": 50001,
    };

    sendMessage("spin", data);
  };

  const handleUpdateDenom = () => {
    const data = {
      "game_id": 718019537,
      "property_id": 50001,
      "denom_index": 1
    };

    sendMessage("update_denom", data);
  };

  const handleUpdateMultiplier = () => {
    const data = {
      "game_id": 718019537,
      "property_id": 50001,
      "multiplier_index": 2
    };

    sendMessage("update_multiplier", data);
  };

  const handleBackToLobby = () => {
    const data = {
      "game_id": 718019537,
      "property_id": 50001,
      "multiplier_index": 2
    };

    sendMessage("back_to_lobby", data);
  };

  const handleTakeWin = () => {
    const data = {
      "game_id": 718019537,
      "property_id": 50001,
    };

    sendMessage("take_win", data);
  };

  return (
    // <div onClick={handleTouchStream} style={{width: '100vw', height: '100vh', display: 'block'}}>
    <div style={{width: '100vw', height: '100vh', display: 'block'}} onClick={handleTouchStream}>
      <div style={{margin: '30px'}}>
        <button onClick={handleRegister} className='button'>
          register
        </button>
        <button onClick={handleUnregister} className='button'>
          unregister
        </button>
        <button onClick={handleOpenMachine} className='button'>
          open machine
        </button>
        <button onClick={handleSpin} className='button'>
          spin
        </button>
        <button onClick={handleUpdateDenom} className='button'>
          update denom
        </button>
        <button onClick={handleUpdateMultiplier} className='button'>
          update multiplier
        </button>
        <button onClick={handleBackToLobby} className='button'>
          back to lobby
        </button>
        <button onClick={handleTakeWin} className='button'>
          take win
        </button>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;