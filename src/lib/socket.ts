import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

/**
 * WebSocket bağlantısı kurar ve belirtilen oda (roomId)'ya abone olur.
 * @param token JWT token'ı
 * @param roomId Ortak oda ID'si (örn: omer@gmail.com_ali@gmail.com)
 * @param onMessage Mesaj geldiğinde çalışacak callback
 */
let stompClient: CompatClient | null = null;
let currentSubscription: any = null;

export const connectWebSocket = (
    token: string,
    roomId: string,
    onMessage: (msg: any) => void
): Promise<CompatClient> => {
    return new Promise((resolve, reject) => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect(
            {
                Authorization: `Bearer ${token}`,
            },
            () => {
                console.log('✅ WebSocket connected');

                const topic = `/topic/chat/${roomId}`;
                console.log(`📡 Subscribing to room: ${topic}`);

                // ❗ Önceki varsa iptal et
                if (currentSubscription) {
                    currentSubscription.unsubscribe();
                    console.log("🔁 Previous subscription unsubscribed");
                }

                // Yeni subscription
                currentSubscription = client.subscribe(topic, (messageOutput) => {
                    try {
                        const message = JSON.parse(messageOutput.body);
                        console.log("📩 Received message:", message);
                        onMessage(message);
                    } catch (e) {
                        console.warn("⚠️ Mesaj parse edilemedi:", e);
                    }
                });

                stompClient = client;
                resolve(client);
            },
            (error) => {
                console.error('❌ WebSocket connection error:', error);
                reject(error);
            }
        );
    });
};

/**
 * WebSocket üzerinden mesaj gönderir.
 * @param chatMessageDto Gönderilecek mesaj DTO'su
 */
export const sendChatMessage = (chatMessageDto: any) => {
    if (stompClient && stompClient.connected) {
        stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessageDto));
        console.log("📤 Sent message:", chatMessageDto);
    } else {
        console.warn('⚠️ WebSocket not connected');
    }
};

/**
 * Bağlantıyı manuel kapatmak istersen:
 */
export const disconnectWebSocket = () => {
    if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
            console.log("🔌 WebSocket disconnected");
        });
        stompClient = null;
    }
};
