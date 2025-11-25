// call/CallContext.jsx
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { socket } from "@/utils/socket";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CallCtx = createContext(null);
export const useCall = () => useContext(CallCtx);

const RTC_CONFIG = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function CallProvider({ children }) {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const myId = user?.id ? String(user.id) : null;

    // Debug 
    console.log("[Call] CallProvider auth snapshot", { isAuthenticated, user });

    // State chính
    const [incoming, setIncoming] = useState(null);
    const [status, setStatus] = useState("idle");
    const [roomId, setRoomId] = useState(null);
    const [peerId, setPeerId] = useState(null);
    const [error, setError] = useState(null);

    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const timerRef = useRef(null);

    const pcRef = useRef(null);
    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(new MediaStream());
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    // ===== Kết nối socket khi user login =====
    useEffect(() => {
        if (!isAuthenticated || !myId) return;

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit("join", myId);
        socket.emit("presence:online", myId);
        console.log("[Call] socket ready for user", myId);

        return () => {
            socket.emit("presence:offline", myId);
        };
    }, [isAuthenticated, myId]);

    const ensureSocket = () => {
        if (!socket.connected) {
            socket.connect();
        }
    };

    const createPC = () => {
        const pc = new RTCPeerConnection(RTC_CONFIG);

        pc.onicecandidate = (e) => {
            if (e.candidate && roomId) {
                socket.emit("call:ice", { roomId, candidate: e.candidate });
            }
        };

        pc.ontrack = (e) => {
            e.streams[0]?.getTracks().forEach((t) =>
                remoteStreamRef.current.addTrack(t)
            );
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStreamRef.current;
            }
        };

        return pc;
    };

    const getVideoOnlyStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280, max: 1920 },
                height: { ideal: 720, max: 1080 },
                frameRate: { ideal: 30, max: 30 },
            },
            audio: false,
        });
        return stream;
    };

    const attachLocal = (stream) => {
        localStreamRef.current = stream;
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }
    };

    const addLocalTracks = (pc) => {
        localStreamRef.current
            ?.getTracks()
            .forEach((t) => pc.addTrack(t, localStreamRef.current));
    };

    const setMaxBitrate = async (pc) => {
        const sender = pc.getSenders().find((s) => s.track?.kind === "video");
        if (!sender) return;
        const params = sender.getParameters() || {};
        params.encodings = [{ maxBitrate: 1_800_000, maxFramerate: 30 }];
        await sender.setParameters(params);
    };

    // ===== Timer =====
    const startTimer = () => {
        if (timerRef.current) return;
        setElapsedSeconds(0);
        timerRef.current = setInterval(() => {
            setElapsedSeconds((prev) => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const cleanup = async () => {
        try {
            setStatus("idle");
            setRoomId(null);
            setPeerId(null);
            setIncoming(null);
            setError(null);
            stopTimer();
            setElapsedSeconds(0);

            pcRef.current?.getSenders()?.forEach((s) => s.track && s.track.stop());
            pcRef.current?.close();
            pcRef.current = null;

            localStreamRef.current?.getTracks()?.forEach((t) => t.stop());
            if (localVideoRef.current) localVideoRef.current.srcObject = null;
            localStreamRef.current = null;

            remoteStreamRef.current
                ?.getTracks()
                ?.forEach((t) => remoteStreamRef.current.removeTrack(t));
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
            remoteStreamRef.current = new MediaStream();
        } catch (e) {
            console.error("[Call] cleanup error:", e);
        }
    };

    // ===== Caller: startCall =====
    const startCall = async (toUserId) => {
        if (!isAuthenticated || !myId || !toUserId) {
            console.log("[Call] startCall blocked", { isAuthenticated, myId, toUserId });
            return;
        }
        try {
            ensureSocket();
            setError(null);
            setStatus("calling");

            const rid = `room_${myId}_${toUserId}_${Date.now()}`;
            setRoomId(rid);
            setPeerId(String(toUserId));

            const stream = await getVideoOnlyStream();
            attachLocal(stream);

            const pc = createPC();
            pcRef.current = pc;
            addLocalTracks(pc);
            await setMaxBitrate(pc);

            socket.emit("call:init", { roomId: rid, toUserId });

            const offer = await pc.createOffer({
                offerToReceiveAudio: false,
                offerToReceiveVideo: true,
            });
            await pc.setLocalDescription(offer);
            socket.emit("call:offer", { roomId: rid, sdp: offer });
        } catch (e) {
            console.error("[Call] startCall error:", e);
            alert("Không tìm thấy thiết bị, không thể gọi");
            setError("Không thể bắt đầu cuộc gọi");
            await cleanup();
        }
    };

    // ===== Callee: accept/decline =====
    const acceptCall = async (rid, fromUserId) => {
        try {
            ensureSocket();
            setError(null);
            setRoomId(rid);
            setPeerId(String(fromUserId));

            const stream = await getVideoOnlyStream();
            attachLocal(stream);

            const pc = createPC();
            pcRef.current = pc;
            addLocalTracks(pc);
            await setMaxBitrate(pc);

            socket.emit("call:accept", { roomId: rid });
            setIncoming(null);
        } catch (e) {
            console.error("[Call] accept error:", e);
            setError("Không thể nhận cuộc gọi");
            await cleanup();
        }
    };

    const declineCall = (rid) => {
        socket.emit("call:decline", { roomId: rid });
        setIncoming(null);
        setStatus("idle");
    };

    const endCall = () => {
        if (roomId) socket.emit("call:end", { roomId });
        setStatus("ending");
        stopTimer();
    };

    // ===== Socket listeners =====
    useEffect(() => {
        if (!isAuthenticated) return;

        const onIncoming = ({ roomId: rid, fromUserId }) => {
            console.log("[Call] incoming from", fromUserId, "room", rid);
            setIncoming({ roomId: rid, fromUserId });
            setStatus("ringing");
        };

        const onAccepted = ({ roomId: rid }) => {
            if (rid !== roomId) return;
            setStatus("in-call");
            startTimer();
            navigate(`/call/${rid}`);
        };

        const onOffer = async ({ roomId: rid, sdp }) => {
            if (!pcRef.current || rid !== roomId) return;
            await pcRef.current.setRemoteDescription(
                new RTCSessionDescription(sdp)
            );
            const answer = await pcRef.current.createAnswer({
                offerToReceiveVideo: true,
                offerToReceiveAudio: false,
            });
            await pcRef.current.setLocalDescription(answer);
            socket.emit("call:answer", { roomId: rid, sdp: answer });
        };

        const onAnswer = async ({ roomId: rid, sdp }) => {
            if (!pcRef.current || rid !== roomId) return;
            await pcRef.current.setRemoteDescription(
                new RTCSessionDescription(sdp)
            );
        };

        const onIce = async ({ roomId: rid, candidate }) => {
            if (!pcRef.current || rid !== roomId) return;
            try {
                await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
                console.warn("addIceCandidate failed", e);
            }
        };

        const onEnded = async ({ roomId: rid }) => {
            if (rid !== roomId) return;
            await cleanup();
        };

        const onMissed = async ({ roomId: rid }) => {
            if (rid === roomId) {
                await cleanup();
            }
        };

        const onBusy = ({ roomId: rid }) => {
            if (rid === roomId) {
                setError("Đối phương đang bận.");
                setStatus("idle");
                stopTimer();
                setElapsedSeconds(0);
            }
        };

        socket.on("call:incoming", onIncoming);
        socket.on("call:accepted", onAccepted);
        socket.on("call:offer", onOffer);
        socket.on("call:answer", onAnswer);
        socket.on("call:ice", onIce);
        socket.on("call:ended", onEnded);
        socket.on("call:missed", onMissed);
        socket.on("call:busy", onBusy);

        return () => {
            socket.off("call:incoming", onIncoming);
            socket.off("call:accepted", onAccepted);
            socket.off("call:offer", onOffer);
            socket.off("call:answer", onAnswer);
            socket.off("call:ice", onIce);
            socket.off("call:ended", onEnded);
            socket.off("call:missed", onMissed);
            socket.off("call:busy", onBusy);
        };
    }, [isAuthenticated, roomId, navigate]);

    const value = useMemo(
        () => ({
            status,
            incoming,
            roomId,
            peerId,
            error,
            elapsedSeconds,
            localVideoRef,
            remoteVideoRef,
            startCall,
            acceptCall,
            declineCall,
            endCall,
            isInCall: status === "in-call",
            isCalling: status === "calling",
            isRinging: status === "ringing",
        }),
        [status, incoming, roomId, peerId, error, elapsedSeconds]
    );

    return <CallCtx.Provider value={value}>{children}</CallCtx.Provider>;
}
