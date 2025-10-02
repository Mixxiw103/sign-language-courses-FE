import { useState } from "react";
import { IoIosMore } from "react-icons/io";

const users = [
  {
    id: 1,
    name: "Jane Cooper",
    message: "Yeah sure, tell me zafor",
    time: "just now",
    avatar: "https://i.pravatar.cc/40?img=1",
    active: true,
  },
  {
    id: 2,
    name: "Jenny Wilson",
    message: "Thank you so much, sir",
    time: "2 d",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Marvin McKinney",
    message: "You're Welcome",
    time: "1 m",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
];

const chatMessages = [
  {
    id: 1,
    from: "Jane",
    text: "Hello and thanks for signing up to the course. If you have any questions feel free to ask 🙂",
    me: false,
  },
  { id: 2, from: "Me", text: "Hello, Good Evening. I'm Zafor", me: true },
  {
    id: 3,
    from: "Me",
    text: "I only have a small doubt about your lecture. Can you give me some time?",
    me: true,
  },
  { id: 4, from: "Jane", text: "Yeah sure, tell me zafor", me: false },
];

export default function DashboardTeacherMessage() {
  const [selected, setSelected] = useState(users[0]);
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), from: "Me", text: input, me: true },
    ]);
    setInput("");
  };

  return (
    <div className="flex p-5 h-[700px] rounded-xl px-20">
      {/* Sidebar */}
      <div className="w-1/4 mr-4 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="font-semibold">Tin nhắn</h2>
          {/* <button className="rounded-md bg-indigo-500 px-3 py-1 text-sm text-white">+ Compose</button> */}
        </div>
        <div className="relative mx-3 mb-3 w-[90%]">
          <span className="absolute inset-y-0 left-2 flex items-center text-slate-400">
            {/* Icon search (SVG hoặc react-icon) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-md border border-slate-200 pl-8 pr-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="overflow-y-auto">
          {users.map((u) => (
            <div
              key={u.id}
              onClick={() => setSelected(u)}
              className={`flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-slate-100 ${
                selected.id === u.id ? "bg-orange-50" : ""
              }`}
            >
              <img src={u.avatar} alt="" className="h-9 w-9 rounded-full" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{u.name}</span>
                  <span className="text-xs text-slate-400">{u.time}</span>
                </div>
                <div className="text-sm text-slate-500 truncate">
                  {u.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
          <div className="flex items-center gap-3">
            <img
              src={selected.avatar}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div>
              <div className="font-semibold">{selected.name}</div>
              <div className="text-xs text-green-500">Active Now</div>
            </div>
          </div>
          <button className="text-xl text-slate-400 px-2 py-2 bg-slate-200">
            <IoIosMore />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.me ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 text-sm shadow ${
                  m.me
                    ? "bg-orange-500 text-white"
                    : "bg-orange-50 text-slate-700"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 border-t border-slate-200 bg-white p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message"
            className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
          <button
            onClick={handleSend}
            className="flex items-center gap-1 rounded-md bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
          >
            Send ➤
          </button>
        </div>
      </div>
    </div>
  );
}
