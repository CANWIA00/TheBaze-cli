import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useProfile } from '../components/context/ProfileProvider';


interface NavRightProps {
    toggleNavGroup: () => void;
    toggleNavFriend: () => void;
    toggleWelcome: () => void;
    toggleProfile: () => void;
    toggleNotification: () => void;
    toggleMessage: () => void;
}

const NavRight: React.FC<NavRightProps> = ({
                                               toggleNavGroup,
                                               toggleNavFriend,
                                               toggleWelcome,
                                               toggleProfile,
                                               toggleNotification,
                                               toggleMessage,
                                           }) => {
    const [notifications, setNotifications] = useState<number>(0);
    const profile = useProfile();


    useEffect(() => {

        const interval = setInterval(() => {
            setNotifications((prev) => prev + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="fixed right-0 top-0 h-screen bg-[#201E43] text-white w-16 flex flex-col items-center py-4 border-2 border-[#EEEEEE]">
            <ul className="flex flex-col items-center justify-between h-full">
                <div className="flex flex-col items-center space-y-6">
                    <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                        <Link href="">
                            <Image
                                src="/icons/menu-2.svg"
                                alt="home"
                                width={24}
                                height={24}
                                priority={true}
                                className="invert-[85%] group-hover:scale-110 transition-transform"
                                onClick={toggleWelcome}
                            />
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                        <Link href="">
                            <Image
                                src="/icons/users-group.svg"
                                alt="Groups"
                                width={24}
                                height={24}
                                className="invert-[85%] group-hover:scale-110 transition-transform"
                                onClick={() => toggleNavGroup()}
                            />
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                        <Link href="">
                            <Image
                                src="/icons/user.svg"
                                alt="Friends"
                                width={24}
                                height={24}
                                className="invert-[85%] group-hover:scale-110 transition-transform"
                                onClick={() => toggleNavFriend()}
                            />
                        </Link>
                    </li>
                </div>
                <div className="flex flex-col items-center space-y-6">
                    <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group relative">
                        <Link href="">
                            <Image
                                src="/icons/bell-filled.svg"
                                alt="Notifications"
                                width={24}
                                height={24}
                                className="invert-[85%] group-hover:scale-110 transition-transform"
                                onClick={() => toggleNotification()}
                            />
                            {notifications > 0 && (
                                <span className="absolute top-0 right-0 block w-3 h-3 rounded-full bg-third"></span>
                            )}
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                        <Link href="">
                            <Image
                                src="/icons/message.svg"
                                alt="Messages"
                                width={24}
                                height={24}
                                className="invert-[85%] group-hover:scale-110 transition-transform"
                                onClick={() => toggleMessage()}
                            />
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] p-2 rounded-full transition-all group">
                        <Link href="">
                            <Image
                                src={ profile?.profilePhoto || "/icons/Ellipse 2.svg"}
                                alt="Profile"
                                width={34}
                                height={34}
                                className="rounded-full group-hover:scale-110 transition-transform"
                                onClick={() => toggleProfile()}
                            />
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                        <Link href="">
                            <Image
                                src="/icons/settings.svg"
                                alt="Settings"
                                width={24}
                                height={24}
                                className="invert-[85%] group-hover:scale-110 transition-transform"
                            />
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default NavRight;
