// chat.js
import * as React from 'react';
const { useState } = React;

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (inputText.trim() && username.trim()) {
      const newMessage = {
        text: inputText,
        user: username,
        time: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <div>
      {/* Chat-Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        Chat öffnen
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-md flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-white text-lg font-bold">Game Chat</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Username Input wenn noch nicht gesetzt */}
            {!username && (
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Dein Name..."
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-96">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`p-2 rounded ${
                    msg.user === username 
                      ? 'bg-blue-500 ml-auto' 
                      : 'bg-gray-600'
                  } text-white max-w-[80%]`}
                >
                  <div className="font-bold text-sm">{msg.user}</div>
                  <div>{msg.text}</div>
                  <div className="text-xs opacity-75">{msg.time}</div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            {username && (
              <form onSubmit={handleSend} className="p-4 border-t border-gray-700">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nachricht..."
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
