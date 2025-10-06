import React from 'react';
import MessageSidebar from '../../components/MessageSidebar';
import ChatArea from '../../components/ChatArea';

const MessagesPage = () => {
  const messagesSidebar = [
    { id: 1, name: 'Elmer Laverty', message: 'Haha oh man!', time: '12m', highlight: false },
    { id: 2, name: 'Florencio Dorrance', message: 'Question, help wanted', time: '24m', highlight: true },
    { id: 3, name: 'Lavern Laboy', message: 'Bug, Hacktoberfest 😊', time: '1h', highlight: false },
    { id: 4, name: 'Titus Kitamura', message: 'Question, some content', time: '5h', highlight: false },
    { id: 5, name: 'Geoffrey Mott', message: 'awww 😊', time: '2d', highlight: false },
    { id: 6, name: 'Alfonso Schussler', message: 'Follow up', time: '1m', highlight: false },
  ];

  const messagesChat = [
    { id: 1, sender: 'Florencio', text: 'omg, this is amazing', time: '12m', isUser: false },
    { id: 2, sender: 'User', text: 'perfect! ✅', time: '12m', isUser: true },
    { id: 3, sender: 'Florencio', text: 'Wow, this is really epic', time: '12m', isUser: false },
    { id: 4, sender: 'User', text: 'How are you?', time: '12m', isUser: true },
    { id: 5, sender: 'Florencio', text: 'just ideas for next time', time: '12m', isUser: false },
    { id: 6, sender: 'User', text: 'I’ll be there in 2 mins 😊', time: '12m', isUser: true },
    { id: 7, sender: 'Florencio', text: 'wooooooo', time: '12m', isUser: false },
    { id: 8, sender: 'User', text: 'Haha oh man', time: '12m', isUser: true },
    { id: 9, sender: 'Florencio', text: 'woohooo 😊', time: '12m', isUser: false },
    { id: 10, sender: 'User', text: 'Haha that’s terrifying 😂', time: '12m', isUser: true },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Messages */}
      <MessageSidebar messages={messagesSidebar} />

      {/* {Chat area} */}
      <ChatArea messages={messagesChat} />
    </div>
  );
};

export default MessagesPage;