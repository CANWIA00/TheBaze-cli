import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

// 🔵 Chat client (mesajlar için)
let chatStompClient: CompatClient | null = null;
let chatSubscription: any = null;

// 🟢 Signal client (CALL, OFFER, ANSWER, ICE için)
let signalStompClient: CompatClient | null = null;
let signalSubscription: any = null;

export interface SignalMessageRequest {
    from: string;
    to: string;
    type: 'CALL' | 'OFFER' | 'ANSWER' | 'ICE';
    sdp?: string;
}

/**
 * Mesajlaşma WebSocket bağlantısı kurar ve oda'ya abone olur.
 */
export const connectWebSocket = (
    token: string,
    roomId: string,
    onMessage: (msg: any) => void
): Promise<CompatClient> => {
    return new Promise((resolve, reject) => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(() => socket);

        client.connect(
            {
                Authorization: `Bearer ${token}`,
            },
            () => {
                console.log('✅ Chat WebSocket connected');

                const topic = `/topic/chat/${roomId}`;
                console.log(`📡 Subscribing to room: ${topic}`);

                if (chatSubscription) {
                    chatSubscription.unsubscribe();
                    console.log("🔁 Previous chat subscription unsubscribed");
                }

                chatSubscription = client.subscribe(topic, (messageOutput) => {
                    try {
                        const message = JSON.parse(messageOutput.body);
                        console.log("📩 Received chat message:", message);
                        onMessage(message);
                    } catch (e) {
                        console.warn("⚠️ Chat mesaj parse edilemedi:", e);
                    }
                });

                chatStompClient = client;
                resolve(client);
            },
            (error: any) => {
                console.error('❌ Chat WebSocket connection error:', error);
                reject(error);
            }
        );
    });
};

/**
 * Mesaj gönderir (CHAT/FILE için)
 */
export const sendChatMessage = (chatMessageDto: any) => {
    if (chatStompClient && chatStompClient.connected) {
        chatStompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessageDto));
        console.log("📤 Sent chat message:", chatMessageDto);
    } else {
        console.warn('⚠️ Chat WebSocket not connected');
    }
};

/**
 * Chat WebSocket bağlantısını kapatır.
 */
export const disconnectWebSocket = () => {
    if (chatStompClient && chatStompClient.connected) {
        chatStompClient.disconnect(() => {
            console.log("🔌 Chat WebSocket disconnected");
        });
        chatStompClient = null;
        chatSubscription = null;
    }
};

/**
 * Sinyal WebSocket bağlantısı kurar ve kullanıcıya özel /user/queue/signal kanalına abone olur.
 */
export const subscribeToSignal = (
    token: string,
    onSignal: (signal: any) => void
): Promise<CompatClient> => {
    console.log("🔔 subscribeToSignal called with token:", token ? "present" : "missing");
    console.log("🛠 Subscribing to: /user/queue/signal");

    return new Promise((resolve, reject) => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(() => socket); // auto-reconnect için factory function
        client.debug = (str) => {
            console.log("📡 STOMP DEBUG:", str);
        };

        client.connect(
            { Authorization: `Bearer ${token}` },
            () => {
                console.log("✅ Signal WebSocket connected");
                console.log(`toke: ${token}`)


                client.subscribe("/topic/signalTest", (message) => {
                    console.log("✅ Topic message received:", message.body);
                });

                signalSubscription = client.subscribe(`/user/queue/signal`, (message) => {
                    console.log(" Raw signal message received:", message.body);
                    try {
                        const signal = JSON.parse(message.body);
                        console.log("📶 Parsed signal:", signal);
                        onSignal(signal);
                    } catch (e) {
                        console.warn("⚠️ Signal parse error:", e);
                    }
                });

                signalStompClient = client;
                resolve(client);
            },
            (err: any) => {
                console.error("❌ Signal connect error:", err);
                reject(err);
            }
        );
    });
};

/**
 * Sinyal aboneliğini ve bağlantıyı kapatır.
 */
export const unsubscribeFromSignal = () => {
    if (signalSubscription) {
        signalSubscription.unsubscribe();
        signalSubscription = null;
    }
    if (signalStompClient && signalStompClient.connected) {
        signalStompClient.disconnect(() => {
            console.log("🔌 Signal WebSocket disconnected");
        });
        signalStompClient = null;
    }
};

/**
 * Sadece CALL sinyali gönderir (çağrı başlatmak için)
 */
export const sendCallSignal = (signal: SignalMessageRequest) => {
    if (!signalStompClient || !signalStompClient.connected) {
        console.warn("⚠️ sendCallSignal skipped: signalStompClient not ready.");
        return;
    }

    if (!signalStompClient.connected) {
        console.warn("⚠️ signalStompClient not connected yet. Retrying in 500ms...");
        setTimeout(() => sendCallSignal(signal), 500);
        return;
    }
    console.log("🧪 Trying to send signal:", signal);
    try {
        signalStompClient.send(
            "/app/call",
            {},
            JSON.stringify(signal)
        );
        console.log("📤 Sent signal:", signal);
    } catch (err) {
        console.error("❌ Error sending signal:", err);
    }
};



/**
 * OFFER, ANSWER, ICE gibi sinyalleri gönderir.
 */
export const sendSignal = (signal: any, token: string) => {
    if (signalStompClient && signalStompClient.connected) {
        signalStompClient.send('/app/call', { Authorization: `Bearer ${token}` }, JSON.stringify(signal));
        console.log('📤 Sent signal:', signal);
    } else {
        console.warn('⚠️ Signal WebSocket not connected. Cannot send signal.');
    }
};
