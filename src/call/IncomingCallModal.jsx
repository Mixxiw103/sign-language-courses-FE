import React from "react";
import { useCall } from "@/call/CallContext";

// tạm mock — bạn thay bằng selector từ store hoặc API thật
const getUserMeta = (userId) => {
    return {
        name: `Người dùng ${String(userId).slice(-4)}`,
        avatar: "https://i.pravatar.cc/150?u=" + userId,
    };
};

export default function IncomingCallModal() {
    const { incoming, acceptCall, declineCall } = useCall();

    if (!incoming) return null;

    const meta = getUserMeta(incoming.fromUserId);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl text-center">
                <img
                    src={meta.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full mx-auto mb-3 shadow-md object-cover"
                />
                <h3 className="text-xl font-semibold text-slate-800">
                    {meta.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1 mb-5">
                    đang gọi video cho bạn...
                </p>

                {/* Buttons */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => declineCall(incoming.roomId)}
                        className="px-4 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition"
                    >
                        Từ chối
                    </button>

                    <button
                        onClick={() =>
                            acceptCall(incoming.roomId, incoming.fromUserId)
                        }
                        className="px-4 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition"
                    >
                        Chấp nhận
                    </button>
                </div>
            </div>
        </div>
    );
}
