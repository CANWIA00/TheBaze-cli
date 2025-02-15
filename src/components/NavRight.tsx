import React from 'react';
import Image from "next/image";
import Link from 'next/link';


interface NavRightProps {
    toggleNavGroup: () => void;
}

const NavRight: React.FC<NavRightProps> = ({ toggleNavGroup }) => {
    return (
        <nav className="fixed right-0 top-0 h-screen bg-[#201E43] text-white w-16 flex flex-col items-center py-4 border-2 border-[#EEEEEE] ">
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
                            />
                        </Link>
                    </li>
                </div>
                <div className="flex flex-col items-center space-y-6">
                    <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                        <Link href="">
                            <Image
                                src="/icons/bell-filled.svg"
                                alt="Notifications"
                                width={24}
                                height={24}
                                className="invert-[85%] group-hover:scale-110 transition-transform"
                            />
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
                            />
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                        <Link href="">
                            <Image
                                src="/icons/Ellipse 2.svg"
                                alt="Profile"
                                width={24}
                                height={24}
                                className="group-hover:scale-110 transition-transform"
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