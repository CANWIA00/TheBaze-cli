import React, { useEffect } from 'react';
import { useWebSocket } from './WebSocketContext';
import Link from 'next/link';
import Image from "next/image";

const NotificationComponent = () => {
    const { notifications, connectWebSocket } = useWebSocket();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            connectWebSocket(token);
        }
    }, [connectWebSocket]);

    return (
        <div className="w-72 bg-[#201E43] shadow-lg fixed top-0 right-16 h-screen border border-[#EEEEEE] p-4 animate-slideIn flex flex-col">
            <div className="flex items-center justify-center space-x-2 me-2">
                <Image
                    src="/icons/bell.svg"
                    alt="Bell"
                    width={24}
                    height={24}
                    className="group-hover:scale-110 transition-transform"
                />
                <h1 className="text-white text-xl font-bold">Notifications</h1>
            </div>

            <hr className="my-2 border-gray-300" />

            <ul className="space-y-4 flex-grow overflow-auto">
                {notifications.length > 0 ? (
                    notifications.map((notif, index) => (
                        <li key={index} className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all">
                            <div className="flex items-center text-center">
                                <Link href="#" className="flex items-center w-full">
                                    <div className="relative">
                                        <Image
                                            src="/icons/Ellipse 2.svg"
                                            alt="Profile"
                                            width={24}
                                            height={24}
                                            className="group-hover:scale-110 transition-transform me-2"
                                        />
                                    </div>
                                    <div className="mt-1 text-start">
                                        <span>{notif.title || 'New Notification'}</span>
                                        <p className="text-xs font-bold text-[#508C9B]">
                                            {notif.body || 'You have a new notification.'}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-400 text-center mt-10">No notifications</p>
                )}
            </ul>
        </div>
    );
};

export default NotificationComponent;
