import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCall } from "../../call/CallContext";

const VideoCallPage = () => {
    const [isFlashing, setIsFlashing] = useState(false);

    const { roomId } = useParams();
    const {
        localVideoRef,
        remoteVideoRef,
        endCall,
        elapsedSeconds,
        status,
    } = useCall();
    const navigate = useNavigate();

    const handleRing = () => {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 1500);
    };

    const handleEnd = () => {
        endCall(roomId);
        navigate(-1); // quay lại màn trước
    };

    const formatTime = (sec) => {
        const s = sec || 0;
        const mm = String(Math.floor(s / 60)).padStart(2, "0");
        const ss = String(s % 60).padStart(2, "0");
        return `${mm}:${ss}`;
    };

    return (
        <div className="relative flex w-screen bg-gray-50 p-6 overflow-hidden">
            {/* Hiệu ứng flash trắng phủ toàn màn hình */}
            {isFlashing && (
                <div className="absolute inset-0 bg-white animate-flash pointer-events-none z-50" />
            )}

            {/* LEFT MAIN AREA */}
            <div className="w-3/4 pr-4 flex flex-col">
                {/* Header */}
                <div className="bg-teal-100 p-4 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button className="text-teal-600 mr-2" onClick={handleEnd}>
                            &larr;
                        </button>
                        <span className="font-semibold text-teal-800">VIDEO CALL</span>
                        <span className="text-gray-600 ml-2">
                            {status === "calling" && "Đang gọi..."}
                            {status === "ringing" && "Đang đổ chuông..."}
                            {status === "in-call" && `Thời gian: ${formatTime(elapsedSeconds)}`}
                        </span>
                    </div>
                </div>

                {/* Main video */}
                <div className="bg-gray-200 p-4 flex-grow rounded-b-lg flex justify-center items-center relative">
                    {/* Remote video (đối phương) */}
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-3/4 h-96 bg-black rounded-lg shadow-md object-cover"
                    />

                    {/* Local video (mình) - popup nhỏ ở góc */}
                    <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-40 h-28 bg-black rounded-lg shadow-md object-cover absolute bottom-4 right-4 border-2 border-white"
                    />
                </div>

                {/* Control bar */}
                <div className="bg-blue-100 p-4 flex justify-center space-x-4 rounded-lg mt-4">
                    <button
                        onClick={handleRing}
                        className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
                    >
                        CHUÔNG
                    </button>

                    <button
                        className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm"
                        onClick={handleEnd}
                    >
                        KẾT THÚC
                    </button>
                </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="w-1/4 flex flex-col space-y-4">
                {/* TIME CARD */}
                <div className="bg-gray-100 p-4 rounded-lg shadow h-2/4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-800">Thời gian đã gọi</h2>
                        <span className="text-gray-600 text-sm">VIDEO CALL</span>
                    </div>
                    <div className="flex items-center justify-center h-32">
                        <p className="text-4xl font-bold text-gray-800">
                            {formatTime(elapsedSeconds)}
                        </p>
                    </div>
                </div>

                {/* PARTICIPANT SECTION (demo) */}
                <div className="bg-white p-4 rounded-lg shadow flex items-center h-2/4">
                    <img
                        src="https://via.placeholder.com/64"
                        alt="Participant"
                        className="w-16 h-16 rounded-full mr-3"
                    />
                    <div>
                        <p className="font-semibold text-gray-800">Participant</p>
                        <p className="text-gray-600 text-sm">Instructor</p>
                    </div>
                </div>
            </div>

            {/* CSS animation cho flash */}
            <style>{`
        @keyframes flashEffect {
          0%, 100% { opacity: 0; }
          20%, 40%, 60%, 80% { opacity: 1; }
        }
        .animate-flash {
          animation: flashEffect 1.5s ease-in-out 1;
        }
      `}</style>
        </div>
    );
};

export default VideoCallPage;
