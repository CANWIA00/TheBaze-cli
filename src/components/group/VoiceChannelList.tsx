import { useState } from "react";
import Image from "next/image";
import React from 'react';
import VoiceChannelUsers from './VoiceChannelUsers'; // Import the new component

function VoiceChannelList() {
    const [isOpen, setIsOpen] = useState(false);
    const [isGeneralOpen, setIsGeneralOpen] = useState(false);  // New state for General channel

    const usersInGeneral = [
        { id: 1, name: "User 1", avatar: "/avatars/user1.png" },
        { id: 2, name: "User 2", avatar: "/avatars/user2.png" },
        { id: 3, name: "User 3", avatar: "/avatars/user3.png" },

    ];

    return (
        <li className="rounded-lg transition-all">
            <div className="hover:bg-[#2F2C54] hover:rounded flex items-center justify-between w-full p-2">
                <div className="flex items-center">
                    <button className={"flex items-center gap-2"} onClick={() => setIsOpen(!isOpen)}>
                        <Image
                            src="/icons/caret-down-filled.svg"
                            alt="Show Voice Channels"
                            width={16}
                            height={16}
                            className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        />
                        <h2 className="text-white">Voice Channels</h2>
                    </button>
                </div>

                <div>
                    <button>
                        <Image
                            src="/icons/plus.svg"
                            alt="Add Voice Channel"
                            width={16}
                            height={16}
                            className="group-hover:scale-110 transition-transform"
                        />
                    </button>
                </div>
            </div>

            {isOpen && (
                <ul className="pl-6 space-y-2">
                    <li className="text-gray-300 hover:text-white cursor-pointer px-2">
                        <div className="flex items-center gap-2 hover:bg-[#2F2C54] hover:rounded ">
                            <button onClick={() => setIsGeneralOpen(!isGeneralOpen)} className="flex items-center gap-2 cursor-pointer">
                                <Image
                                    src="/icons/volume.svg"
                                    alt="a123"
                                    width={16}
                                    height={16}
                                    className="group-hover:scale-110 transition-transform"
                                />
                                <p>General</p>
                            </button>

                            <Image
                                src="/icons/settings-filled.svg"
                                alt="a123"
                                width={16}
                                height={16}
                                className="group-hover:scale-110 transition-transform ml-auto"
                            />
                        </div>


                        {isGeneralOpen && <VoiceChannelUsers users={usersInGeneral} />}
                    </li>
                    <li className="text-gray-300 hover:text-white cursor-pointer px-2">
                        <div className="flex items-center gap-2 hover:bg-[#2F2C54] hover:rounded ">
                            <button  className="flex items-center gap-2 cursor-pointer">
                                <Image
                                    src="/icons/volume.svg"
                                    alt="Voice Channel"
                                    width={16}
                                    height={16}
                                    className="group-hover:scale-110 transition-transform"
                                />
                                <p>Game</p>
                            </button>

                            <Image
                                src="/icons/settings-filled.svg"
                                alt="a123"
                                width={16}
                                height={16}
                                className="group-hover:scale-110 transition-transform ml-auto"
                            />
                        </div>
                    </li>
                    <li className="text-gray-300 hover:text-white cursor-pointer px-2">
                        <div className="flex items-center gap-2 hover:bg-[#2F2C54] hover:rounded ">
                            <button  className="flex items-center gap-2 cursor-pointer">
                                <Image
                                    src="/icons/volume.svg"
                                    alt="a123"
                                    width={16}
                                    height={16}
                                    className="group-hover:scale-110 transition-transform"
                                />
                                <p>Study</p>
                            </button>

                            <Image
                                src="/icons/settings-filled.svg"
                                alt="a123"
                                width={16}
                                height={16}
                                className="group-hover:scale-110 transition-transform ml-auto"
                            />
                        </div>
                    </li>
                </ul>
            )}
        </li>
    );
}

export default VoiceChannelList;
