"use client";

import React, { useState, useEffect, useRef } from 'react';
import SideBarLayout from "../../../components/SideBarLayout";
import Image from "next/image";
import Message from "../../../components/group/Message";
import SendMessage from "../../../components/group/SendMessage";
import { useParams } from 'next/navigation';
import { connectWebSocket, sendChatMessage, disconnectWebSocket, sendCallSignal, subscribeToSignal  } from "../../../lib/socket";
import { useRouter } from 'next/navigation';


type SignalType = 'CALL' | 'OFFER' | 'ANSWER' | 'ICE';


interface MessageDto {
    senderId: string;
    senderMail: string;
    receiverMail: string;
    content: string;
    timestamp: string;
    type?: string;
}

interface ChatProfileDto {
    senderFullName: string,
    senderUserMail: string,
    senderPhotoUrl?: string,
    senderUserId: string,
    receiverFullName: string,
    receiverUserMail: string,
    receiverPhotoUrl?: string,
    receiverUserId: string,
}
interface SignalMessageRequest {
    from: string;
    to: string;
    type: SignalType;
    sdp?: string;
}

function Page() {
    const [activeComponent, setActiveComponent] = useState<'welcome' | 'createGroup' | 'inviteGroup'>('welcome');
    const [chatProfile, setChatProfile] = useState<ChatProfileDto | null>(null);
    const param = useParams();
    const rawMail = param.friendId as string;
    const receiverMail = decodeURIComponent(rawMail);
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [currentUserName, setCurrentUserName] = useState<string | null>(null);
    const [isWebSocketReady, setIsWebSocketReady] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const peerRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const remoteAudioCallerRef = useRef<HTMLAudioElement | null>(null);
    const remoteAudioCalleeRef = useRef<HTMLAudioElement | null>(null);
    const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
    const router = useRouter();


    const [roomId, setRoomId] = useState<string>("");

    useEffect(() => {
        const getMicAccess = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                localStreamRef.current = stream;
                console.log("🎙️ Mikrofon erişimi erken alındı");

            } catch (err) {
                console.error("🚫 Erken mikrofon erişimi alınamadı:", err);
            }
        };

        getMicAccess();
    }, []);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !receiverMail) return;

        const handleSignal = async (signal: SignalMessageRequest) => {
            console.log("📶 [userCall] Arama geldi:", signal);
            console.log("📥 OFFER handle ediliyor");

            if (!signal?.type || !signal.to || !signal.from) return;

            switch (signal.type) {
                case "OFFER":
                    console.log("🟢 OFFER geldi, handleOffer çağrılacak");
                    await handleOffer(signal);
                    break;
                case "ANSWER":
                    await handleAnswer(signal);
                    break;
                case "ICE":
                    try {
                        const candidate = JSON.parse(signal.sdp!);
                        if (peerRef.current?.remoteDescription) {
                            await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                            console.log("🌍 ICE eklendi");
                        } else {
                            console.warn("🧊 ICE buffer'a alındı");
                            pendingCandidates.current.push(candidate);
                        }
                    } catch (e) {
                        console.error("❌ ICE parse/add hatası:", e);
                    }
                    break;
                default:
                    console.warn("⚠️ Bilinmeyen signal türü:", signal.type);
            }
        };

        (async () => {
            const userMail = await fetchCurrentUserFullName();
            if (!userMail) {
                console.warn("❌ User mail can not be found");
                return;
            }

            setCurrentUserName(userMail);
            const generatedRoomId = [userMail, receiverMail].sort().join("_");
            setRoomId(generatedRoomId);
            await fetchChatHistory(generatedRoomId, token);

            try {
                await connectWebSocket(token, generatedRoomId, async (message) => {
                    if (message.type === 'OFFER') {
                        await handleOffer(message);
                    } else if (message.type === 'ANSWER') {
                        await handleAnswer(message);
                    } else if (message.type === 'ICE') {
                        const candidate = new RTCIceCandidate(JSON.parse(message.content));
                        await peerRef.current?.addIceCandidate(candidate);
                        console.log("🌍 ICE Candidate peer'a eklendi");
                    } else {
                        setMessages((prev) => [...prev, message]);
                    }
                });

                subscribeToSignal(token, userMail,handleSignal);
                setIsWebSocketReady(true);
            } catch (error) {
                console.error("❌ WebSocket connection error:", error);
                setIsWebSocketReady(false);
            }
        })();

        return () => {
            console.log("🧹 Cleaning up WebSocket");
            disconnectWebSocket();
        };
    }, [receiverMail]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    useEffect(() => {
        if (currentUserName && receiverMail && currentUserName < receiverMail) {
            initiateCall();
        }
    }, [currentUserName, receiverMail]);



    const fetchCurrentUserFullName = async (): Promise<string | null> => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const res = await fetch(`http://localhost:8080/api/v1/chat/info/${encodeURIComponent(receiverMail)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const profile: ChatProfileDto = await res.json();
            setChatProfile(profile);
            return profile.senderUserMail;
        } catch (err) {
            console.error('❌ Can not be found the user mail:', err);
            return null;
        }
    };

    const handleSend = (text: string, file?: File | null) => {
        const token = localStorage.getItem('token');
        if (!token || !currentUserName || !isWebSocketReady) {
            console.warn("⚠️ Token & websocket error! ");
            return;
        }
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("senderMail", currentUserName);
            formData.append("receiverMail", receiverMail);

            fetch("http://localhost:8080/api/v1/chat/upload", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            })
                .then(res => res.json())
                .then(response => {
                    const fileMessage: MessageDto = {
                        type: 'FILE',
                        senderId: '',
                        senderMail: currentUserName,
                        receiverMail: receiverMail,
                        content: response.fileUrl,
                        timestamp: new Date().toISOString(),
                    };
                    setMessages((prev) => [...prev, fileMessage]);
                })
                .catch(err => console.error("❌ File upload error", err));
        } else if (text.trim()) {
            const message: MessageDto = {
                type: 'CHAT',
                senderId: '',
                senderMail: currentUserName,
                receiverMail: receiverMail,
                content: text,
                timestamp: new Date().toISOString(),
            };

            sendChatMessage(message);
        }
    };


    const fetchChatHistory = async (roomId: string, token: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/chat/rooms/${roomId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const history: MessageDto[] = await response.json();
            history.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            setMessages(history);
        } catch (error) {
            console.error("❌ fetchChatHistory error:", error);
        }
    };

    const initiateCall = async () => {
        const token = localStorage.getItem('token');
        if (!token || !currentUserName || !receiverMail) return;

        sendCallSignal({
            from: currentUserName,
            to: receiverMail,
            type: 'CALL',
        });

        const peer = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        });

        peerRef.current = peer;

        // ICE candidate geldikçe sinyal gönder
        peer.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("📡 ICE Candidate (caller):", event.candidate);
                sendCallSignal({
                    from: currentUserName,
                    to: receiverMail,
                    type: 'ICE',
                    sdp: JSON.stringify(event.candidate),
                });

            }
        };

        // Karşıdan ses gelince oynat
        peer.ontrack = (event) => {
            const stream = event.streams[0];
            console.log("🔊 Gelen track:", stream);

            stream.getAudioTracks().forEach(track => {
                console.log("🎧 Gelen audio track:", track);
                console.log("🔴 Aktif mi:", track.enabled, "| Sessiz mi:", track.muted);
            });
            if (remoteAudioCallerRef.current && event.streams[0]) {
                remoteAudioCallerRef.current.srcObject = event.streams[0];
                console.log("📞 Caller tarafı: ses stream atandı!");
            }
        };

        // Mikrofon erişimi ve stream alma
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        localStreamRef.current = stream;

        // Peer connection'a mikrofon streamini ekle
        stream.getTracks().forEach(track => peer.addTrack(track, stream));

        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        console.log("📨 OFFER gönderiliyor:", offer);

        // OFFER WebSocket ile gönder
        sendCallSignal({
            from: currentUserName,
            to: receiverMail,
            type: 'OFFER',
            sdp: JSON.stringify(offer),
        });
    };

    const handleOffer = async (message: any) => {
        console.log("📨 handleOffer tetiklendi");
        

        const peer = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        peerRef.current = peer;


        // 🔁 ICE candidate gönder
        peer.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("📡 ICE Candidate (callee):", event.candidate);
                sendCallSignal({
                    from: message.to,
                    to: message.from,
                    type: 'ICE',
                    sdp: JSON.stringify(event.candidate),
                });
            }
        };

        // 🔊 Gelen sesi remote audio'ya bağla
        peer.ontrack = (event) => {
            const stream = event.streams[0];
            console.log("🔊 Gelen track:", stream);

            stream.getAudioTracks().forEach(track => {
                console.log("🎧 Gelen audio track:", track);
                console.log("🔴 Aktif mi:", track.enabled, "| Sessiz mi:", track.muted);
            });
            if (remoteAudioCalleeRef.current && event.streams[0]) {
                remoteAudioCalleeRef.current.srcObject = event.streams[0];
                console.log("📞 Callee tarafı: ses stream atandı!");
            }
        };

        try {
            // 🔐 Mikrofon erişimi al
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            localStreamRef.current = stream;

            stream.getTracks().forEach(track => {
                peer.addTrack(track, stream);
            });

            console.log("🎙️ Mikrofon erişimi alındı ve peer'a eklendi");

        } catch (err) {
            console.error("🚫 Mikrofon erişimi reddedildi veya başarısız:", err);
            return; // Devam etme, çünkü ses gönderilemez
        }

        // 📥 Gelen OFFER SDP'yi set et
        const offerDesc = new RTCSessionDescription(
            message.sdp ? JSON.parse(message.sdp) : JSON.parse(message.content)
        );
        await peer.setRemoteDescription(offerDesc);
        console.log("📥 Remote SDP set edildi");

        // 💾 ICE buffer varsa şimdi ekle
        if (pendingCandidates.current.length > 0) {
            for (const cand of pendingCandidates.current) {
                await peer.addIceCandidate(new RTCIceCandidate(cand));
            }
            console.log(`🧊 ${pendingCandidates.current.length} ICE candidate eklendi (buffer'dan)`);
            pendingCandidates.current = [];
        }

        // 📤 ANSWER oluştur ve gönder
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        console.log("📤 SDP Answer oluşturuldu ve set edildi");

        sendCallSignal({
            from: message.to,
            to: message.from,
            type: 'ANSWER',
            sdp: JSON.stringify(answer),
        });

        // 💾 ICE buffer varsa şimdi ekle
        if (pendingCandidates.current.length > 0) {
            for (const cand of pendingCandidates.current) {
                try {
                    await peer.addIceCandidate(new RTCIceCandidate(cand));
                    console.log("🧊 Buffered ICE candidate eklendi:", cand);
                } catch (err) {
                    console.error("❌ ICE eklenirken hata:", err);
                }
            }
            pendingCandidates.current = [];
        }
        peer.oniceconnectionstatechange = () => {
            console.log("🔁 ICE connection state:", peer.iceConnectionState);
        };
        console.log("📤 SDP Answer sinyali gönderildi");
    };

    const handleAnswer = async (message: any) => {
        const answerDesc = new RTCSessionDescription(
            message.sdp ? JSON.parse(message.sdp) : JSON.parse(message.content)
        );
        if (peerRef.current) {
            await peerRef.current.setRemoteDescription(answerDesc);
        } else {
            console.warn("❌ Peer connection not initialized before setting remote description");
        }

        console.log("✅ ANSWER set edildi.");

    // 💾 ICE buffer varsa şimdi ekle
        if (pendingCandidates.current.length > 0) {
            for (const cand of pendingCandidates.current) {
                try {
                    await peerRef.current?.addIceCandidate(new RTCIceCandidate(cand));
                    console.log("🧊 Buffered ICE candidate eklendi:", cand);
                } catch (err) {
                    console.error("❌ ICE eklenirken hata:", err);
                }
            }
            pendingCandidates.current = [];
        }
    };


    const toggleMute = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
        }
    };

    const endCall = () => {
        // 1. Peer bağlantısını kapat
        peerRef.current?.close();
        peerRef.current = null;


        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }


        if (remoteAudioCallerRef.current) {
            remoteAudioCallerRef.current.srcObject = null;
        }

        if (remoteAudioCalleeRef.current) {
            remoteAudioCalleeRef.current.srcObject = null;
        }


        console.log("🔚 Call sonlandırıldı ve kaynaklar temizlendi.");
        let otherMail: string | undefined;

        if (chatProfile) {
            if (currentUserName === chatProfile.senderUserMail) {
                otherMail = chatProfile.receiverUserMail;
            } else {
                otherMail = chatProfile.senderUserMail;
            }
        } else {
            // fallback: receiverMail kullan
            otherMail = receiverMail;
        }

        if (otherMail) {
            router.push(`/userChat/${encodeURIComponent(otherMail)}`);
        } else {
            console.warn("⚠️ Karşı tarafın mail adresi belirlenemedi, ana sayfaya yönlendiriliyor.");
            router.push('/userChat');
        }
    };


    return (
        <div className="grid grid-cols-12 grid-rows-12 gap-0 bg-first h-screen">
            <div className="row-span-12 row-start-1 z-50">
                <SideBarLayout activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            </div>

            <div className="col-span-12 row-span-6 col-start-1 row-start-1 flex flex-col h-full bg-gray-900">
                <div className="grid grid-cols-12 grid-rows-12 gap-4 p-4 h-full">
                    {/* User Box */}
                    <div className="col-span-3 row-span-7 row-start-6 bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center space-y-2">
                        <Image
                            src={
                                !chatProfile?.senderPhotoUrl || chatProfile.senderPhotoUrl === "null"
                                    ? "/icons/Ellipse 2.svg"
                                    : chatProfile.senderPhotoUrl
                            }
                            alt="sender"
                            width={84}
                            height={84}
                            priority={true}
                            className="rounded-full group-hover:scale-110 transition-transform"
                        />
                        <p className="text-white text-sm font-medium text-center font-semibold">
                            {chatProfile?.senderFullName || "Loading..."}
                        </p>
                    </div>
                    {/* Receiver Box */}
                    <div className="col-span-6 row-span-12 bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col">
                        <div className="flex-grow flex flex-col items-center justify-center space-y-2">
                            <Image
                                src={
                                    !chatProfile?.receiverPhotoUrl || chatProfile.receiverPhotoUrl === "null"
                                        ? "/icons/Ellipse 2.svg"
                                        : chatProfile.receiverPhotoUrl
                                }
                                alt="receiver"
                                width={84}
                                height={84}
                                priority={true}
                                className="rounded-full group-hover:scale-110 transition-transform"
                            />
                            <p className="text-white text-sm font-medium text-center font-semibold">
                                {chatProfile?.receiverFullName || "Loading..."}
                            </p>
                        </div>

                        <div className="flex justify-center items-center space-x-4 px-2 mt-auto">
                            <button className="hover:bg-second p-2 rounded-lg transition-all">
                                <Image
                                    src="/icons/video.svg"
                                    alt="video"
                                    width={30}
                                    height={30}
                                    priority={true}
                                    className="group-hover:scale-110 transition-transform"
                                />
                            </button>
                            {/*<button className="hover:bg-second p-2 rounded-lg transition-all">*/}
                            {/*    <Image*/}
                            {/*        src="/icons/screen-share.svg"*/}
                            {/*        alt="screen share"*/}
                            {/*        width={28}*/}
                            {/*        height={28}*/}
                            {/*        priority={true}*/}
                            {/*        className="group-hover:scale-110 transition-transform"*/}
                            {/*    />*/}
                            {/*</button>*/}
                            <button onClick={toggleMute} className="hover:bg-second p-2 rounded-lg transition-all">
                                <Image
                                    src="/icons/microphone-off.svg"
                                    alt="microphone off"
                                    width={26}
                                    height={26}
                                    priority={true}
                                    className="group-hover:scale-110 transition-transform"
                                />
                            </button>
                            <button onClick={endCall} className="hover:bg-red-700 p-1 rounded-lg transition-all">
                                <Image
                                    src="/icons/phone-filled.svg"
                                    alt="end call"
                                    width={38}
                                    height={38}
                                    priority={true}
                                    className="group-hover:scale-110 transition-transform"
                                />
                            </button>
                        </div>
                    </div>

                    {/* TODO Section (Right of User & Friend Box) */}
                    <div className="col-span-1 col-start-11 row-span-12 h-full flex flex-col justify-end items-center ">
                        <div className="flex space-x-2">
                            <button className="hover:bg-second p-1 rounded-lg transition-all">
                                <Image
                                    src="/icons/resize.svg"
                                    alt="resize"
                                    width={22}
                                    height={22}
                                    priority={true}
                                    className="group-hover:scale-110 transition-transform"
                                />
                            </button>
                            <button className="hover:bg-second p-1 rounded-lg transition-all">
                                <Image
                                    src="/icons/full screen.svg"
                                    alt="full screen"
                                    width={22}
                                    height={22}
                                    priority={true}
                                    className="group-hover:scale-110 transition-transform"
                                />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
            <div className={"col-span-8 col-start-3 row-span-6 row-start-7 flex flex-col h-full "}>
                <div className="flex-1 p-4 grid gap-4 h-full overflow-y-auto">
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index} className="my-4">
                                <Message
                                    chatProfile={chatProfile!}
                                    message={msg}
                                    isOwnMessage={msg.senderMail === currentUserName}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sticky py-4 bottom-0 bg-first z-20 shadow-md">
                    <SendMessage onSend={handleSend} />
                    <audio ref={remoteAudioCallerRef} autoPlay playsInline hidden />
                    <audio ref={remoteAudioCalleeRef} autoPlay playsInline hidden />

                </div>
            </div>
        </div>
    );
}

export default Page;
