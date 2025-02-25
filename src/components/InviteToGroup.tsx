import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

interface InviteToGroupProps {
    closeInviteGroup: () => void;
}


function InviteToGroup({ closeInviteGroup }: InviteToGroupProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <button onClick={closeInviteGroup} className="absolute top-4 right-4">
                <Image
                    src="/icons/x.svg"
                    alt="Close"
                    width={24}
                    height={24}
                    className="text-first transition-all duration-500 ease-in-out hover:scale-110"
                />
            </button>


            <div className="flex flex-col  border space-y-6 p-20">
                <h1 className="flex items-center text-center text-2xl font-bold">
                    Invite your friends to *Example
                </h1>
                <hr className="my-2 border-gray-300" />
                <ul className="flex flex-col w-full max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
                    <li className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all w-full">
                        <Link href="#" className="flex items-center w-full p-2">
                            <div className="relative ">
                                <Image
                                    src="/icons/Ellipse 2.svg"
                                    alt="Profile"
                                    width={24}
                                    height={24}
                                    className="group-hover:scale-110 transition-transform me-2"
                                />
                                <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 right-2"></div>
                            </div>
                            <div className="flex-grow text-start">
                                <span>Group 1</span>
                                <p className="text-xs font-bold text-[#508C9B]">Active</p>
                            </div>
                            <Image
                                src="/icons/users-plus.svg"
                                alt="home"
                                width={24}
                                height={24}
                                priority={true}
                                className="invert group-hover:scale-110 transition-transform"
                            />
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all w-full">
                        <Link href="#" className="flex items-center w-full p-2">
                            <div className="relative ">
                                <Image
                                    src="/icons/Ellipse 2.svg"
                                    alt="Profile"
                                    width={24}
                                    height={24}
                                    className="group-hover:scale-110 transition-transform me-2"
                                />
                                <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 right-2"></div>
                            </div>
                            <div className="flex-grow text-start">
                                <span>Group 1</span>
                                <p className="text-xs font-bold text-[#508C9B]">Active</p>
                            </div>
                            <Image
                                src="/icons/users-plus.svg"
                                alt="home"
                                width={24}
                                height={24}
                                priority={true}
                                className="invert group-hover:scale-110 transition-transform"
                            />
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all w-full">
                        <Link href="#" className="flex items-center w-full p-2">
                            <div className="relative ">
                                <Image
                                    src="/icons/Ellipse 2.svg"
                                    alt="Profile"
                                    width={24}
                                    height={24}
                                    className="group-hover:scale-110 transition-transform me-2"
                                />
                                <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 right-2"></div>
                            </div>
                            <div className="flex-grow text-start">
                                <span>Group 1</span>
                                <p className="text-xs font-bold text-[#508C9B]">Active</p>
                            </div>
                            <Image
                                src="/icons/users-plus.svg"
                                alt="home"
                                width={24}
                                height={24}
                                priority={true}
                                className="invert group-hover:scale-110 transition-transform"
                            />
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all w-full">
                        <Link href="#" className="flex items-center w-full p-2">
                            <div className="relative ">
                                <Image
                                    src="/icons/Ellipse 2.svg"
                                    alt="Profile"
                                    width={24}
                                    height={24}
                                    className="group-hover:scale-110 transition-transform me-2"
                                />
                                <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 right-2"></div>
                            </div>
                            <div className="flex-grow text-start">
                                <span>Group 1</span>
                                <p className="text-xs font-bold text-[#508C9B]">Active</p>
                            </div>
                            <Image
                                src="/icons/users-plus.svg"
                                alt="home"
                                width={24}
                                height={24}
                                priority={true}
                                className="invert group-hover:scale-110 transition-transform"
                            />
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all w-full">
                        <Link href="#" className="flex items-center w-full p-2">
                            <div className="relative ">
                                <Image
                                    src="/icons/Ellipse 2.svg"
                                    alt="Profile"
                                    width={24}
                                    height={24}
                                    className="group-hover:scale-110 transition-transform me-2"
                                />
                                <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 right-2"></div>
                            </div>
                            <div className="flex-grow text-start">
                                <span>Group 1</span>
                                <p className="text-xs font-bold text-[#508C9B]">Active</p>
                            </div>
                            <Image
                                src="/icons/users-plus.svg"
                                alt="home"
                                width={24}
                                height={24}
                                priority={true}
                                className="invert group-hover:scale-110 transition-transform"
                            />
                        </Link>
                    </li>
                    <li className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all w-full">
                        <Link href="#" className="flex items-center w-full p-2">
                            <div className="relative ">
                                <Image
                                    src="/icons/Ellipse 2.svg"
                                    alt="Profile"
                                    width={24}
                                    height={24}
                                    className="group-hover:scale-110 transition-transform me-2"
                                />
                                <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 right-2"></div>
                            </div>
                            <div className="flex-grow text-start">
                                <span>Group 1</span>
                                <p className="text-xs font-bold text-[#508C9B]">Active</p>
                            </div>
                            <Image
                                src="/icons/users-plus.svg"
                                alt="home"
                                width={24}
                                height={24}
                                priority={true}
                                className="invert group-hover:scale-110 transition-transform"
                            />
                        </Link>
                    </li>
                </ul>


                <div className="flex flex-col justify-center items-center space-y-4 ">
                    <p>Or send server invite link to your friends</p>
                    <input
                        className="bg-transparent py-1 px-6 border rounded-lg focus:ring-4 focus:ring-white focus:ring-opacity-50 w-full overflow-x-auto whitespace-nowrap text-center"
                        value="www.testlink1.com/search?=123asdxs12"
                        readOnly
                    />
                </div>

                <button className=" px-12 py-2 rounded-lg bg-second text-white hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-60 transition-all duration-300 flex flex-row items-center justify-center">
                    <p>Copy</p>
                </button>
            </div>
        </motion.div>
    );
}

export default InviteToGroup;