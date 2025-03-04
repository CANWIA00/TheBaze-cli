"use client";

import React, { useState } from "react";
import SideBarLayout from "../../components/SideBarLayout";
import NavGroupLeft from "@/components/group/NavGroupLeft";
import GroupChannels from "@/components/group/GroupChannels";
import Camera from "@/components/groupCall/Camera";
import Header from "@/components/group/Header";
import Image from "next/image";

function Page() {
    const [activeComponent, setActiveComponent] = useState<'welcome' | 'createGroup' | 'inviteGroup'>('welcome');
    const [users, setUsers] = useState(Array(6).fill(null)); // Placeholder for user list

    const getGridLayout = (participantCount: number) => {
        if (participantCount === 1) return "grid-cols-1";
        if (participantCount === 2) return "grid-cols-2";
        if (participantCount === 3 || participantCount === 4) return "grid-cols-2";
        if (participantCount <= 6) return "grid-cols-3";
        if (participantCount <= 8) return "grid-cols-4";
        return "grid-cols-4"; // Default for larger numbers
    };

    const getItemSpan = (index: number, total: number) => {
        if (total === 1) return "col-span-1";
        if (total === 2) return "col-span-1";
        if (total === 3 && index === 0) return "col-span-2";
        return "col-span-1";
    };

    return (
        <div className="grid grid-cols-12 grid-rows-12 gap-0 bg-first h-screen">
            <div className="row-span-12 col-start-12 row-start-1 z-10">
                <SideBarLayout activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            </div>

            <div className="flex col-span-3 row-span-12 col-start-1 row-start-1">
                <NavGroupLeft />
                <GroupChannels />
            </div>

            <div className="col-span-8 row-span-12 col-start-4 row-start-1 flex flex-col h-full">
                <div className="sticky top-0 bg-first z-20 shadow-md">
                    <Header />
                </div>

                <div className={`flex-1 p-4 bg-gray-900 grid gap-4 h-full ${getGridLayout(users.length)}`}>
                    {users.map((_, index) => (
                        <div key={index} className={getItemSpan(index, users.length)}>
                            <Camera />
                        </div>
                    ))}
                </div>

                <div className="sticky bottom-0 bg-first z-20 shadow-md relative">
                    <div className="flex justify-center items-center space-x-4 px-2 py-3">
                        <button className="hover:bg-second p-2 rounded-lg transition-all">
                            <Image
                                src="/icons/video.svg"
                                alt="video"
                                width={30}
                                height={30}
                                priority={true}
                                className="group-hover:scale-110 transition-transform"
                            />
                        </button>
                        <button className="hover:bg-second p-2 rounded-lg transition-all">
                            <Image
                                src="/icons/screen-share.svg"
                                alt="screen share"
                                width={28}
                                height={28}
                                priority={true}
                                className="group-hover:scale-110 transition-transform"
                            />
                        </button>
                        <button className="hover:bg-second p-2 rounded-lg transition-all">
                            <Image
                                src="/icons/microphone-off.svg"
                                alt="microphone off"
                                width={26}
                                height={26}
                                priority={true}
                                className="group-hover:scale-110 transition-transform"
                            />
                        </button>
                        <button className="hover:bg-red-700 p-1 rounded-lg transition-all">
                            <Image
                                src="/icons/phone-filled.svg"
                                alt="end call"
                                width={38}
                                height={38}
                                priority={true}
                                className="group-hover:scale-110 transition-transform"
                            />
                        </button>
                    </div>

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                        <button className="hover:bg-second p-2 rounded-lg transition-all">
                            <Image
                                src="/icons/full screen.svg"
                                alt="fullscreen"
                                width={24}
                                height={24}
                                priority={true}
                                className="group-hover:scale-110 transition-transform"
                            />
                        </button>
                        <button className="hover:bg-second p-2 rounded-lg transition-all">
                            <Image
                                src="/icons/resize.svg"
                                alt="resize"
                                width={28}
                                height={28}
                                priority={true}
                                className="group-hover:scale-110 transition-transform"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
