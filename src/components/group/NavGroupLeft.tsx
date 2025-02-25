import React from 'react';
import Image from "next/image";
import Link from 'next/link';
function NavGroupLeft() {
    return (
        <div>

            <nav className="  h-screen bg-[#201E43] text-white w-16 flex flex-col items-center py-4">
                <ul className="flex flex-col items-center justify-between h-full">
                    <div className="flex flex-col items-center space-y-1">
                        <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                            <Link href="">
                                <Image
                                    src="/icons/users.svg"
                                    alt="home"
                                    width={24}
                                    height={24}
                                    priority={true}
                                    className="group-hover:scale-110 transition-transform"

                                />
                            </Link>
                        </li>
                        <ul className="flex flex-col items-center">
                            <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                                <Link href="">
                                    <div className="relative ">
                                        <Image
                                            src="/icons/Ellipse 2.svg"
                                            alt="Profile"
                                            width={24}
                                            height={24}
                                            className="group-hover:scale-110 transition-transform "
                                        />
                                        <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 left-4"></div>
                                    </div>
                                </Link>
                            </li>
                            <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                                <Link href="">
                                    <div className="relative ">
                                        <Image
                                            src="/icons/Ellipse 2.svg"
                                            alt="Profile"
                                            width={24}
                                            height={24}
                                            className="group-hover:scale-110 transition-transform "
                                        />
                                        <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 left-4"></div>
                                    </div>
                                </Link>
                            </li>
                            <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                                <Link href="">
                                    <div className="relative ">
                                        <Image
                                            src="/icons/Ellipse 2.svg"
                                            alt="Profile"
                                            width={24}
                                            height={24}
                                            className="group-hover:scale-110 transition-transform "
                                        />
                                        <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 left-4"></div>
                                    </div>
                                </Link>
                            </li>
                            <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                                <Link href="">
                                    <div className="relative ">
                                        <Image
                                            src="/icons/Ellipse 2.svg"
                                            alt="Profile"
                                            width={24}
                                            height={24}
                                            className="group-hover:scale-110 transition-transform "
                                        />
                                        <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 left-4"></div>
                                    </div>
                                </Link>
                            </li>
                        </ul>

                        <li className="hover:bg-[#2F2C54] p-2 rounded-lg transition-all group">
                            <Link href="">
                                <Image
                                    src="/icons/users-plus.svg"
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
        </div>
    );
}

export default NavGroupLeft;