'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { sendCallSignal } from "@/lib/socket";


interface ChatProfileDto {
    senderFullName: string;
    senderUserMail: string;
    senderPhotoUrl?: string;
    senderUserId: string;
    receiverFullName: string;
    receiverUserMail: string;
    receiverPhotoUrl?: string;
    receiverUserId: string;
}
interface HeaderProps {
    chatProfile: ChatProfileDto;
}
const Header: React.FC<HeaderProps> = ({ chatProfile  }) => {
    const router = useRouter();

    const handleCallClick = () => {
        const receiverMail = chatProfile.receiverUserMail;
        const senderMail = chatProfile.senderUserMail;
        sendCallSignal({
            from: senderMail,
            to: receiverMail,
            type: 'CALL',
        });

        router.push(`/userCall/${encodeURIComponent(receiverMail)}`);
    };



    return (
        <div>
            <header className="relative fixed flex flex-row top-0 left-0 w-full pt-4 pb-4">
                <div className="flex items-center space-x-4 px-2">
                    <button>
                        <Image
                            src={
                                !chatProfile?.receiverPhotoUrl || chatProfile.receiverPhotoUrl === "null"
                                    ? "/icons/Ellipse 2.svg"
                                    : chatProfile.receiverPhotoUrl
                            }
                            alt="settings"
                            width={44}
                            height={44}
                            priority={true}
                            className="rounded-full group-hover:scale-110 transition-transform"
                        />
                    </button>
                    <h1 className="text-text text-2xl font-medium flex-grow">{chatProfile?.receiverFullName}</h1>
                </div>
                <div className="flex space-x-4 px-2 ml-auto">
                    <button>
                        <Image
                            src="/icons/video.svg"
                            alt="settings"
                            width={24}
                            height={24}
                            priority={true}
                            className="group-hover:scale-110 transition-transform"
                        />
                    </button>
                    <button onClick={handleCallClick}>
                        <Image
                            src="/icons/phone.svg"
                            alt="phone"
                            width={24}
                            height={24}
                            priority={true}
                            className="group-hover:scale-110 transition-transform"
                        />
                    </button>
                    <button>
                        <Image
                            src="/icons/settings.svg"
                            alt="settings"
                            width={24}
                            height={24}
                            priority={true}
                            className="invert-[85%] group-hover:scale-110 transition-transform"
                        />
                    </button>
                </div>
            </header>
        </div>
    );
}

export default Header;
