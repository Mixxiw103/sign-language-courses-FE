import React, { useState } from "react";
import { Link } from "react-router-dom";

const MessageSidebar = ({ messages }) => {
  const [selectedMessageId, setSelectedMessageId] = useState(1);

  return (
    <div className="w-1/4 bg-white border-r border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          Messages <span className="text-gray-500">~ 12</span>
        </h2>
        <Link to="/" className="text-blue-500 text-2xl">
          🏠
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search messages..."
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <div className="space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-center p-2 ${
              selectedMessageId === msg.id
                ? "bg-blue-100"
                : msg.highlight
                ? ""
                : ""
            } hover:bg-gray-200 rounded-lg cursor-pointer`}
            onClick={() => setSelectedMessageId(msg.id)}
          >
            <img
              src="https://via.placeholder.com/40"
              alt={msg.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <p className="font-semibold">{msg.name}</p>
              <p className="text-gray-500 text-sm">{msg.message}</p>
            </div>
            <span className="ml-auto text-xs text-gray-400">{msg.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;
