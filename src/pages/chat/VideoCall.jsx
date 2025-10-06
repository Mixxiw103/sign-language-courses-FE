import React, { useState, useEffect } from 'react';

const VideoCallPage = () => {
    const [score, setScore] = useState(null);

    return (
        <div className="flex h-screen bg-gray-50 p-6">
            {/* LEFT MAIN AREA */}
            <div className="w-3/4 pr-4 flex flex-col">
                {/* Header */}
                <div className="bg-teal-100 p-4 rounded-t-lg flex items-center justify-between">
                    <div>
                        <button className="text-teal-600 mr-2">&larr;</button>
                        <span className="font-semibold text-teal-800">
                            Video bài kiểm tra cuối khóa
                        </span>
                        <span className="text-gray-600 ml-2">5 bài, 30 phút</span>
                    </div>
                </div>

                {/* Main video */}
                <div className="bg-gray-200 p-4 flex-grow rounded-b-lg flex justify-center items-center">
                    <img
                        src="https://via.placeholder.com/400x300"
                        alt="Main Participant"
                        className="w-3/4 h-96 object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Control bar */}
                <div className="bg-blue-100 p-4 flex justify-center space-x-4 rounded-lg mt-4">
                    <button className="bg-red-500 text-white p-2 rounded-full">
                        📹
                    </button>
                    <button className="bg-green-500 text-white p-2 rounded-full">
                        🎙️
                    </button>
                    <button className="bg-pink-500 text-white p-2 rounded-full">
                        📞
                    </button>
                    <button className="bg-gray-500 text-white p-2 rounded-full">
                        💻
                    </button>
                    <button className="bg-gray-500 text-white p-2 rounded-full">
                        ⏪
                    </button>
                </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="w-1/4 flex flex-col space-y-4">
                {/* SCORE CARD */}
                <div className="bg-gray-100 p-4 rounded-lg shadow h-2/4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-800">Điểm của bạn</h2>
                        <span className="text-gray-600 text-sm">
                            Bài kiểm tra cuối khóa
                        </span>
                    </div>
                    <div className="flex items-center justify-center h-32">
                        <p className="text-4xl font-bold text-gray-800">
                            {score !== null ? `${score} điểm` : 'Đang làm bài'}
                        </p>
                    </div>
                </div>

                {/* PARTICIPANT SECTION */}
                <div className="bg-white p-4 rounded-lg shadow flex items-center h-2/4">
                    <img
                        src="https://via.placeholder.com/64"
                        alt="Participant 1"
                        className="w-16 h-16 rounded-full mr-3"
                    />
                    <div>
                        <p className="font-semibold text-gray-800">Participant 1</p>
                        <p className="text-gray-600 text-sm">Instructor</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCallPage;
