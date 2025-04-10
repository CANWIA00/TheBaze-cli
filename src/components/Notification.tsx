import React,{useState} from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


function Notification() {
    const [userName, setUserName] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");
    const socket =new SockJS('http://127.0.0.1:8080/ws');

    const stompClient = new Client({
        webSocketFactory: () => socket,
        onConnect: (socket) => {
            console.log("Connected to Websocket Client");

            stompClient.subscribe('user/e07ba3ad-2214-469d-a24c-f9b8be1ee5c2/notifications',(message) => {
                const notifications = message.body;
                console.log("Notification received: %s", notifications);
                setNotificationMessage(notifications);
            });
        },
        onStompError: (error) => {
            console.error("Broker reported error:", error.headers['message']);
            console.error("Additional details:", error.body);
        }

    });

    stompClient.activate();


    return (
        <div className="w-72 bg-[#201E43] shadow-lg fixed top-0 right-16 h-screen border border-[#EEEEEE] p-4 animate-slideIn flex flex-col">
            <div className={"flex item-center justify-center space-x-2 me-2"}>
                <Image
                    src="/icons/bell.svg"
                    alt="Bell"
                    width={24}
                    height={24}
                    className=" group-hover:scale-110 transition-transform "
                />
                <h1 className="text-white text-xl font-bold">Notifications</h1>
            </div>

            <hr className="my-2 border-gray-300" />

            <ul className="space-y-4 flex-grow">
                <li className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all ">
                    <div className={"flex items-center text-center"}>
                        <Link href="#" className="flex items-center w-full">
                            <div className="relative ">
                                <Image
                                    src="/icons/Ellipse 2.svg"
                                    alt="Profile"
                                    width={24}
                                    height={24}
                                    className="group-hover:scale-110 transition-transform me-2"
                                />
                            </div>
                            <div className={"mt-1 text-start"}>
                                <span>TSM kor</span>
                                <p className={"text-xs font-bold text-[#508C9B]"}> you have a new friend request.</p>
                            </div>
                        </Link>
                    </div>
                </li>
            </ul>

            <div className="absolute inset-0 flex flex-row items-center justify-center mb-auto opacity-20 -z-20">
                <Image
                    src="/icons/logo.svg"
                    alt="home"
                    width={44}
                    height={44}
                    priority={true}
                    className="group-hover:scale-110 transition-transform "
                />
                <h1 className="text-text text-3xl font-bold ps-3 -z-10">The Baze</h1>
            </div>
        </div>
    );
}

export default Notification;