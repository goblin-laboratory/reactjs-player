import React from 'react';
import logo from './logo.svg';
import { Button } from 'antd';
import ReactPlayer from './components/ReactPlayer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div>
          <Button type="primary">Button</Button>
        </div>
        <ReactPlayer />
      </header>
    </div>
  );
}

export default App;
