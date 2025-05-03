// Add this at the top of the file to mark it as a client component
"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// Define the structure of your notifications
interface Notification {
    title: string;
    body: string;
}

let stompClient: Client | undefined;

// Define the context and its types
interface WebSocketContextType {
    notifications: Notification[];
    connectWebSocket: (token: string) => void;
    disconnectWebSocket: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// Correctly typing `children` in the WebSocketProvider component
interface WebSocketProviderProps {
    children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            connectWebSocket(token);
        }

        return () => {
            disconnectWebSocket();
        };
    }, []);

    const connectWebSocket = (token: string) => {
        stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: (str) => {
                console.log('STOMP: ', str);
            },
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket!!');

                stompClient?.subscribe('/user/topic/notifications', (message) => {
                    console.log('Received Notification:', message.body);

                    try {
                        let notification: Notification;
                        if (isJsonString(message.body)) {
                            notification = JSON.parse(message.body);
                        } else {
                            notification = { title: 'Friend Request', body: message.body };
                        }

                        setNotifications((prev) => [...prev, notification]);
                    } catch (error) {
                        console.error('Error parsing notification:', error);
                    }
                });
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket.');
            },
        });

        stompClient.activate();
    };

    const disconnectWebSocket = () => {
        if (stompClient) {
            stompClient.deactivate();
        }
    };

    const isJsonString = (str: string) => {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    return (
        <WebSocketContext.Provider value={{ notifications, connectWebSocket, disconnectWebSocket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
