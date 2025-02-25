import { useState } from "react";
import Image from "next/image";

import React from 'react';

function TextChannelList() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="rounded-lg transition-all">
            <div className="hover:bg-[#2F2C54] hover:rounded flex items-center justify-between w-full p-2">

                <div className="flex items-center ">
                    <button className={"flex items-center gap-2"} onClick={() => setIsOpen(!isOpen)}>
                        <Image
                            src="/icons/caret-down-filled.svg"
                            alt="Show Text Channels"
                            width={16}
                            height={16}
                            className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        />
                    <h2 className="text-white">Text Channels</h2>
                    </button>
                </div>


                <div>
                    <button>
                        <Image
                            src="/icons/plus.svg"
                            alt="Add Text Channel"
                            width={16}
                            height={16}
                            className="group-hover:scale-110 transition-transform"
                        />
                    </button>
                </div>
            </div>



            {isOpen && (
                <ul className="pl-6 space-y-2 ">
                    <li className="hover:bg-[#2F2C54] hover:rounded text-gray-300 hover:text-white cursor-pointer px-2">

                        <div className="flex items-center gap-2">

                            <Image
                                src="/icons/hash.svg"
                                alt="Text Channel"
                                width={16}
                                height={16}
                                className="group-hover:scale-110 transition-transform"
                            />

                            <p>General</p>

                            <Image
                                src="/icons/settings-filled.svg"
                                alt="Text Channel Settings"
                                width={16}
                                height={16}
                                className="group-hover:scale-110 transition-transform ml-auto"
                            />
                        </div>
                    </li>
                    <li className="hover:bg-[#2F2C54] hover:rounded text-gray-300 hover:text-white cursor-pointer px-2">

                        <div className="flex items-center gap-2">

                            <Image
                                src="/icons/hash.svg"
                                alt="Text Channel"
                                width={16}
                                height={16}
                                className="group-hover:scale-110 transition-transform"
                            />

                            <p>Game</p>

                            <Image
                                src="/icons/settings-filled.svg"
                                alt="Text Channel Settings"
                                width={16}
                                height={16}
                                className="group-hover:scale-110 transition-transform ml-auto"
                            />
                        </div>
                    </li>
                    <li className="hover:bg-[#2F2C54] hover:rounded text-gray-300 hover:text-white cursor-pointer px-2">

                        <div className="flex items-center gap-2">

                            <Image
                                src="/icons/hash.svg"
                                alt="Text Channel"
                                width={16}
                                height={16}
                                className="group-hover:scale-110 transition-transform"
                            />

                            <p>Study</p>

                            <Image
                                src="/icons/settings-filled.svg"
                                alt="Text Channel Settings"
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

export default TextChannelList;