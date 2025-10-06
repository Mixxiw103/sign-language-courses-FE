import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChatArea = ({ messages }) => {
  const [messageInput, setMessageInput] = useState('');

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <div className="w-3/4 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center mb-4">
        <img src="https://via.placeholder.com/40" alt="Florencio Dorrance" className="w-10 h-10 rounded-full mr-2" />
        <div>
          <p className="font-semibold">Florencio Dorrance</p>
          <p className="text-green-500 text-sm">Online</p>
        </div>
        <Link to="/video-call" className="ml-auto flex items-center bg-blue-500 text-white p-1.5 rounded-2xl hover:bg-blue-600">
          Video Call
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start ${msg.isUser ? 'justify-end' : ''}`}>
            {!msg.isUser && <img src="https://via.placeholder.com/40" alt="Florencio" className="w-8 h-8 rounded-full mr-2" />}
            <div className={`p-2 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
              <p>{msg.text}</p>
              <p className={`text-xs ${msg.isUser ? 'text-gray-200' : 'text-gray-400'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded-lg mr-2"
          value={messageInput}
          onChange={handleInputChange}
        />
        {messageInput.trim() ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
        ) : null}
      </div>
    </div>
  );
};

export default ChatArea;