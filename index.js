import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './chat.js';
import './index.css';  // Für Tailwind

ReactDOM.render(
  <React.StrictMode>
    <Chat />
  </React.StrictMode>,
  document.getElementById('root')
);
