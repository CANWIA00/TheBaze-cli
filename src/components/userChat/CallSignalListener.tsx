'use client';

import React, { useEffect, useState,useRef } from 'react';
import { useRouter } from 'next/navigation';
import { subscribeToSignal, unsubscribeFromSignal } from '@/lib/socket';
import Modal from '../../components/Modal';
import { useProfile } from '../../components/context/ProfileProvider';

type SignalType = 'CALL' | 'OFFER' | 'ANSWER' | 'ICE';
interface SignalMessageRequest {
    from: string;
    to: string;
    type: SignalType;
    sdp?: string;
}

const CallSignalListener: React.FC = () => {
    console.log(" CallSignalListener component rendered");
    const [incomingCall, setIncomingCall] = useState<SignalMessageRequest | null>(null);
    const router = useRouter();
    const profile = useProfile();

    useEffect(() => {
        const token = localStorage.getItem("token");

        console.log(" CallSignalListener useEffect çalıştı. Token:", token, "Mail:", profile?.userMail);

        if (!token || !profile?.userMail) {
            console.log("🚫 Token veya profil mail yok. Bekleniyor...");
            return;
        }

        const handleSignal = async (signal: any) => {
            console.log("📶 Signal received globally:", signal);

            if (!signal?.type || !signal.to || !signal.from) {
                console.warn("❌ Invalid signal payload:", signal);
                return;
            }

            if (signal.type === "CALL" && signal.to === profile.userMail) {
                console.log("📞 Incoming call for me!");
                setIncomingCall(signal);
                return;
            }

            if (signal.type === "ICE") {
                console.log("🔁 ICE signal geldi ama burada işlenmiyor (userCall sayfasına bırakılıyor)");
                return;
            }

        };

        const setupSignalConnection = async () => {
            try {
                console.log("🔔 Starting signal subscription for:", profile.userMail);
                await subscribeToSignal(token, profile.userMail,handleSignal);
            } catch (err) {
                console.error("❌ Error while subscribing to signal:", err);
            }
        };

        setupSignalConnection();

        return () => {
            console.log(" Cleaning up signal subscription");
            unsubscribeFromSignal();
        };
    }, [profile?.userMail]);
    const handleAccept = () => {
        if (incomingCall) {
            console.log("✅ Call accepted, navigating to:", incomingCall.from);
            router.push(`/userCall/${encodeURIComponent(incomingCall.from)}`);
        }
    };

    const handleReject = () => {
        console.log("❌ Call rejected");
        setIncomingCall(null);
    };

    return (
        <>
            {incomingCall && (
                <Modal onClose={handleReject}>
                    <div className="text-center p-4">
                        <h2 className="text-xl font-semibold text-white">📞 Incoming Call</h2>
                        <p className="text-white mt-2">{incomingCall.from} is calling you</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button onClick={handleAccept} className="bg-green-600 px-4 py-2 rounded">
                                Accept
                            </button>
                            <button onClick={handleReject} className="bg-red-600 px-4 py-2 rounded">
                                Decline
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default CallSignalListener;
