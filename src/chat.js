// chat.js
import * as React from 'react';
const { useState } = React;

// Hardcoded Passwörter für dich und deine Kollegen
const VALID_USERS = {
  'spieler1': 'pass123',
  'spieler2': 'pass123',
  'spieler3': 'pass123'
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Drag & Drop Funktionen bleiben gleich
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    // Überprüfe ob der Benutzer existiert und das Passwort stimmt
    if (VALID_USERS[username] === password) {
      setIsLoggedIn(true);
      // Login-Zeit als erste System-Nachricht
      setMessages([{
        text: `${username} ist dem Chat beigetreten`,
        user: 'System',
        time: new Date().toLocaleTimeString()
      }]);
    } else {
      setLoginError('Falscher Benutzername oder Passwort');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newMessage = {
        text: inputText,
        user: username,
        time: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMessages([]);
  };

  return (
    <div 
      className="fixed bg-gray-800 rounded-lg shadow-lg w-80"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        opacity: 0.9
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="p-4 space-y-3">
          <div>
            <input
              type="text"
              placeholder="Benutzername..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Passwort..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          {loginError && (
            <div className="text-red-500 text-sm">{loginError}</div>
          )}
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Chat beitreten
          </button>
        </form>
      ) : (
        <div className="flex flex-col h-96">
          <div className="p-2 bg-gray-700 text-white rounded-t-lg flex justify-between items-center">
            <span className="cursor-move flex-1">Chat Overlay</span>
            <button 
              onClick={handleLogout}
              className="text-sm bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`p-2 rounded ${
                  msg.user === 'System' 
                    ? 'bg-gray-700 text-center text-sm' 
                    : msg.user === username 
                      ? 'bg-blue-500 ml-auto' 
                      : 'bg-gray-600'
                } text-white max-w-[80%]`}
              >
                {msg.user !== 'System' && (
                  <div className="font-bold text-sm">{msg.user}</div>
                )}
                <div>{msg.text}</div>
                <div className="text-xs opacity-75">{msg.time}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-2 bg-gray-700 rounded-b-lg">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nachricht..."
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
