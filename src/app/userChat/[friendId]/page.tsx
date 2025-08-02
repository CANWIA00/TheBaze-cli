"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import SideBarLayout from "../../../components/SideBarLayout";
import SendMessage from "../../../components/group/SendMessage";
import Header from "../../../components/user/Header";
import Message from "../../../components/group/Message";
import { connectWebSocket, sendChatMessage, disconnectWebSocket } from "../../../lib/socket";

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

function Page() {
    const [activeComponent, setActiveComponent] = useState<'welcome' | 'createGroup' | 'inviteGroup'>('welcome');
    const [chatProfile, setChatProfile] = useState<ChatProfileDto | null>(null);
    const params = useParams();
    const rawMail = params.friendId as string;
    const receiverMail = decodeURIComponent(rawMail);
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [currentUserName, setCurrentUserName] = useState<string | null>(null);
    const [isWebSocketReady, setIsWebSocketReady] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [roomId, setRoomId] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !receiverMail) return;

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
                await connectWebSocket(token, generatedRoomId, (message) => {
                    setMessages((prev) => [...prev, message]);
                });
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



    return (
        <div className={"grid grid-cols-12 grid-rows-12 gap-0 bg-first h-screen"}>
            <div className="row-span-12 col-start-12 row-start-1 z-50">
                <SideBarLayout activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-span-8 row-span-12 col-start-3 row-start-1 flex flex-col h-full">
                <div className="sticky top-0 bg-first z-20">
                    {chatProfile && <Header chatProfile={chatProfile} />}
                </div>
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
                        <div ref={messagesEndRef} />
                    </ul>
                </div>
                <div className="sticky py-4 bottom-0 bg-first z-20 shadow-md">
                    <SendMessage onSend={handleSend} />
                </div>
            </div>
        </div>
    );
}

export default Page;
