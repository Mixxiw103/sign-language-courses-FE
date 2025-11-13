import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { IoIosMore } from "react-icons/io";
import { IoNotificationsOffOutline } from "react-icons/io5";
import { useAuth } from "../../auth/AuthContext";
import { api } from "../../utils/api";
import { Link } from "react-router-dom";
import { socket } from "../../utils/socket";
import { useCall } from "../../call/CallContext";

export default function DashboardMessage() {
  const { user, isAuthenticated } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [meNotifications, setMeNotifications] = useState(true);

  const dropdownRef = useRef(null);
  const listEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const messageIndexRef = useRef(new Map());

  // trạng thái realtime
  const [partnerTyping, setPartnerTyping] = useState(false);
  const [onlineMap, setOnlineMap] = useState({});

  // Video call
  const { startCall } = useCall();

  // tiện ích: normalize ObjectId hoặc string
  const toId = (v) => (v == null ? "" : String(v));
  const eqId = (a, b) => toId(a) === toId(b);

  // cuộn cuối khi có tin mới
  const scrollToBottom = useCallback(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  useEffect(() => {
    // chỉ scroll khi dữ liệu messages vừa load xong lần đầu
    if (!loadingMessages && messages.length > 0) {
      scrollToBottom();
    }
  }, [loadingMessages, messages.length, scrollToBottom]);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Kết nối socket + presence
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    socket.connect();
    socket.emit("join", user.id);
    socket.emit("presence:online", user.id);

    const onConnect = () => console.log("Socket connected:", socket.id);
    const onDisconnect = () => {
      console.log("Socket disconnected");
      socket.emit("presence:offline", user.id);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.emit("presence:offline", user.id);
      socket.disconnect();
    };
  }, [isAuthenticated, user?.id]);

  // realtime message / typing / presence
  useEffect(() => {
    const addOrReplace = (payload) => {
      const serverId = toId(payload._id);
      const clientId = toId(payload.clientMsgId);

      setMessages((prev) => {
        const list = [...prev];
        // Replace theo id
        const idx = list.findIndex(
          (m) => eqId(m._id, serverId) || eqId(m.clientMsgId, clientId)
        );
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...payload, optimistic: false };
          messageIndexRef.current.set(serverId || clientId, true);
          return list;
        }
        // nếu chưa có → thêm
        const key = serverId || clientId;
        if (key && !messageIndexRef.current.has(key)) {
          messageIndexRef.current.set(key, true);
          return [...list, payload];
        }
        return list;
      });
    };

    const onSent = (payload) => {
      addOrReplace(payload);
      setConversations((prev) =>
        prev.map((c) =>
          eqId(c._id, payload.conversation_id)
            ? { ...c, last_msg: payload }
            : c
        )
      );
    };

    const onReceive = (payload) => {
      if (eqId(payload.sender_id, user.id)) return; // tránh duplicate

      if (
        selectedConversation &&
        (eqId(payload.conversation_id, selectedConversation._id) ||
          eqId(payload.sender_id, selectedConversation.partner_id))
      ) {
        addOrReplace(payload);
      }

      // cập nhật list hội thoại
      setConversations((prev) =>
        prev.map((c) => {
          if (eqId(c._id, payload.conversation_id)) {
            const isActive =
              selectedConversation && eqId(selectedConversation._id, c._id);
            return {
              ...c,
              last_msg: payload,
              unread_count: isActive ? 0 : (c.unread_count || 0) + 1,
            };
          }
          return c;
        })
      );
    };

    const onTyping = ({ fromUserId, toUserId }) => {
      if (
        selectedConversation &&
        eqId(fromUserId, selectedConversation.partner_id) &&
        eqId(toUserId, user.id)
      ) {
        setPartnerTyping(true);
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(
          () => setPartnerTyping(false),
          2000
        );
      }
    };

    const onStopTyping = ({ fromUserId, toUserId }) => {
      if (
        selectedConversation &&
        eqId(fromUserId, selectedConversation.partner_id) &&
        eqId(toUserId, user.id)
      ) {
        setPartnerTyping(false);
      }
    };

    socket.on("receiveMessage", onReceive);
    socket.on("messageSent", onSent);
    socket.on("typing", onTyping);
    socket.on("stopTyping", onStopTyping);
    socket.on("userOnline", (uid) =>
      setOnlineMap((m) => ({ ...m, [toId(uid)]: true }))
    );
    socket.on("userOffline", (uid) =>
      setOnlineMap((m) => ({ ...m, [toId(uid)]: false }))
    );

    socket.on('presence:list', (uids) => setOnlineMap(() => Object.fromEntries(uids.map(id => [String(id), true]))));

    return () => {
      socket.off("receiveMessage", onReceive);
      socket.off("messageSent", onSent);
      socket.off("typing", onTyping);
      socket.off("stopTyping", onStopTyping);
      socket.off("userOnline");
      socket.off("userOffline");
    };
  }, [selectedConversation?._id, selectedConversation?.partner_id, user?.id]);

  // tải danh sách hội thoại
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    const controller = new AbortController();

    const fetchChatList = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/message/user/${toId(user.id)}`, {
          signal: controller.signal,
        });
        setConversations(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setError("Lỗi khi tải danh sách trò chuyện");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchChatList();

    return () => controller.abort();
  }, [isAuthenticated, user?.id]);

  // chọn hội thoại
  const handleSelectConversation = useCallback(
    async (convo) => {
      setSelectedConversation(convo);
      if (!convo) return;
      setLoadingMessages(true);

      try {
        const res = await api.get(
          `/api/message/${toId(user.id)}/${toId(convo.partner_id)}`
        );
        const { messages, conversation_id } = res.data || {};
        const list = Array.isArray(messages) ? messages : [];
        setMessages(list);
        messageIndexRef.current = new Map();
        list.forEach((m) => {
          const k = toId(m._id) || toId(m.clientMsgId);
          if (k) messageIndexRef.current.set(k, true);
        });

        if (conversation_id) {
          await api.patch(`/api/message/${conversation_id}/read`, {
            user_id: toId(user.id),
          });
          setConversations((prev) =>
            prev.map((c) =>
              eqId(c._id, convo._id) ? { ...c, unread_count: 0 } : c
            )
          );
        }
      } catch (err) {
        console.error("Error loading messages:", err);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    },
    [user?.id]
  );

  // gửi tin nhắn
  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || !selectedConversation) return;

    const clientMsgId = `c_${Date.now()}_${Math.random()}`;
    const optimistic = {
      clientMsgId,
      sender_id: toId(user.id),
      receiver_id: toId(selectedConversation.partner_id),
      content: trimmed,
      type: "text",
      sent_at: new Date().toISOString(),
      optimistic: true,
    };

    messageIndexRef.current.set(clientMsgId, true);
    setMessages((prev) => [...prev, optimistic]);
    setInput("");

    socket.emit("sendMessage", {
      clientMsgId,
      senderId: toId(user.id),
      receiverId: toId(selectedConversation.partner_id),
      content: trimmed,
      type: "text",
    });
  }, [input, selectedConversation, user?.id]);

  // enter để gửi
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const partnerDisplay = useMemo(
    () => ({
      name: selectedConversation?.partner?.full_name || "(Chưa chọn)",
      avatar:
        selectedConversation?.partner?.avatar_url || "https://i.pravatar.cc/40",
    }),
    [selectedConversation]
  );

  // UI
  if (!isAuthenticated)
    return (
      <div>
        Vui lòng{" "}
        <Link to="/auth" className="text-orange-600 underline">
          đăng nhập
        </Link>{" "}
        để xem tin nhắn.
      </div>
    );

  if (loading && conversations.length === 0) return <div>Đang tải...</div>;

  const convoKey = (c) => c._id || toId(c.partner_id);

  return (
    <div className="flex p-5 h-[700px] rounded-xl px-15">
      {/* Sidebar */}
      <div className="w-1/4 mr-4 bg-white overflow-x-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="font-semibold">Tin nhắn</h2>
        </div>

        {error && (
          <div className="mx-3 mb-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {conversations.map((convo) => (
            <div
              key={convoKey(convo)}
              onClick={() => handleSelectConversation(convo)}
              className={`flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-slate-100 ${eqId(selectedConversation?._id, convo._id) ? "bg-orange-50" : ""
                }`}
            >
              <img
                src={convo.partner?.avatar_url || "https://i.pravatar.cc/40"}
                alt=""
                className="h-9 w-9 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <span className="font-medium truncate">
                    {convo.partner?.full_name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {convo.last_msg?.sent_at
                      ? new Date(convo.last_msg.sent_at).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )
                      : ""}
                  </span>
                </div>
                <div className="text-sm text-slate-500 truncate">
                  {convo.last_msg?.content || "Chưa có tin nhắn"}
                </div>
              </div>
              {convo.unread_count > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {convo.unread_count}
                </span>
              )}
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
              src={partnerDisplay.avatar}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div>
              <div className="font-semibold flex items-center gap-2">
                <span>{partnerDisplay.name}</span>
                {!meNotifications && (
                  <IoNotificationsOffOutline className="text-slate-400" />
                )}
              </div>
              <div className="text-xs">
                {selectedConversation ? (
                  onlineMap[toId(selectedConversation.partner_id)] ? (
                    <span className="text-green-500">Online</span>
                  ) : (
                    <span className="text-slate-400">Offline</span>
                  )
                ) : (
                  <span className="text-slate-400">Chưa chọn cuộc trò chuyện</span>
                )}
                {partnerTyping && (
                  <span className="ml-2 text-orange-500">đang nhập…</span>
                )}
              </div>
            </div>
          </div>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="text-xl text-slate-600 hover:text-slate-800 px-2 py-2 bg-slate-200 rounded-md"
              disabled={!selectedConversation}
              title={!selectedConversation ? "Chọn cuộc trò chuyện trước" : undefined}
            >
              <IoIosMore />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                <ul className="py-1 text-sm text-gray-700">
                  {/* 1) Video call */}
                  <li>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        if (selectedConversation?.partner_id) {
                          startCall(selectedConversation.partner_id);
                        } else {
                          alert("Hãy chọn người để gọi");
                        }
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      disabled={!selectedConversation}
                    >
                      Video call
                    </button>
                  </li>

                  {/* 2) Tắt/Bật thông báo (đã call API) */}
                  <li>
                    <button
                      onClick={async () => {
                        setDropdownOpen(false);
                        try {
                          const convoId = selectedConversation?._id;
                          if (!convoId) return;
                          const next = !meNotifications;
                          const res = await api.patch(`/api/message/${convoId}/notifications`, {
                            user_id: toId(user.id),
                            enable: next,
                          });
                          setMeNotifications(res?.data?.enable ?? next);
                        } catch (e) {
                          console.error("Toggle notifications error:", e);
                        }
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      disabled={!selectedConversation}
                    >
                      {meNotifications ? "Tắt thông báo" : "Bật thông báo"}
                    </button>
                  </li>

                  {/* 3) Chặn */}
                  <li>
                    <button
                      onClick={async () => {
                        setDropdownOpen(false);
                        if (!selectedConversation) return;
                        try {
                          const convoId = selectedConversation._id;
                          const partnerId = selectedConversation.partner_id;
                          // Tuỳ backend của bạn: 1 trong 2 cách
                          // A) chặn theo conversation:
                          // await api.patch(`/api/message/${convoId}/block`, { user_id: toId(user.id), block: true });
                          // B) chặn theo user:
                          // await api.post(`/api/users/${partnerId}/block`, { by: toId(user.id) });

                          alert("Đã chặn người dùng (demo) — map endpoint BE thật của bạn nhé.");
                        } catch (e) {
                          console.error("Block user error:", e);
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      disabled={!selectedConversation}
                    >
                      Chặn
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6">
          {loadingMessages && (
            <div className="text-center text-sm text-slate-500">
              Đang tải tin nhắn...
            </div>
          )}
          {!loadingMessages &&
            messages.map((m) => (
              <div
                key={m._id || m.clientMsgId}
                className={`flex ${eqId(m.sender_id, user.id) ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 text-sm shadow ${eqId(m.sender_id, user.id)
                    ? "bg-orange-500 text-white"
                    : "bg-orange-50 text-slate-700"
                    }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          <div ref={listEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 border-t border-slate-200 bg-white p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (!selectedConversation) return;
              socket.emit("typing", {
                fromUserId: toId(user.id),
                toUserId: toId(selectedConversation.partner_id),
              });
              clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = setTimeout(() => {
                socket.emit("stopTyping", {
                  fromUserId: toId(user.id),
                  toUserId: toId(selectedConversation.partner_id),
                });
              }, 1500);
            }}
            onKeyDown={onKeyDown}
            placeholder={
              selectedConversation ? "Nhập tin nhắn" : "Chọn cuộc trò chuyện để nhắn"
            }
            className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
            disabled={!selectedConversation}
          />
          <button
            onClick={handleSend}
            disabled={!selectedConversation || !input.trim()}
            className={`rounded-md px-4 py-2 text-sm text-white ${!selectedConversation || !input.trim()
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
              }`}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
