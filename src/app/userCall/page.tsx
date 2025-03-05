"use client";

import React, { useState } from 'react';
import SideBarLayout from "../../components/SideBarLayout";
import Image from "next/image";
import Message from "@/components/group/Message";
import SendMessage from "@/components/group/SendMessage";


function Page() {
    const [activeComponent, setActiveComponent] = useState<'welcome' | 'createGroup' | 'inviteGroup'>('welcome');

    return (
        <div className="grid grid-cols-12 grid-rows-12 gap-0 bg-first h-screen">
            <div className="row-span-12 row-start-1 z-50">
                <SideBarLayout activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            </div>

            <div className="col-span-12 row-span-6 col-start-1 row-start-1 flex flex-col h-full bg-gray-900">
                <div className="grid grid-cols-12 grid-rows-12 gap-4 p-4 h-full">

                    {/* User Box */}
                    <div className="col-span-3 row-span-7 row-start-6 bg-gray-800 rounded-lg shadow-lg p-4">
                        User
                    </div>

                    {/* Friend Box */}
                    <div className="col-span-6 row-span-12 bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col">
                        <div className="flex-grow">
                            Friend
                        </div>

                        {/* Buttons at the Bottom */}
                        <div className="flex justify-center items-center space-x-4 px-2  mt-auto">
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
                    </div>
                    {/* TODO Section (Right of User & Friend Box) */}
                    <div className="col-span-1 col-start-11 row-span-12 h-full flex flex-col justify-end items-center ">
                        <div className="flex space-x-2">
                            <button className="hover:bg-second p-1 rounded-lg transition-all">
                                <Image
                                    src="/icons/resize.svg"
                                    alt="resize"
                                    width={22}
                                    height={22}
                                    priority={true}
                                    className="group-hover:scale-110 transition-transform"
                                />
                            </button>
                            <button className="hover:bg-second p-1 rounded-lg transition-all">
                                <Image
                                    src="/icons/full screen.svg"
                                    alt="full screen"
                                    width={22}
                                    height={22}
                                    priority={true}
                                    className="group-hover:scale-110 transition-transform"
                                />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
            <div className={"col-span-8 col-start-3 row-span-6 row-start-7 flex flex-col h-full "}>
                <div className="flex-1 p-4 grid gap-4 h-full overflow-y-auto">
                    <ul>
                        <li className="my-4">
                            <Message />
                        </li>
                        <li className="my-4">
                            <Message />
                            <ul>
                                <li>
                                    <Image
                                        src="/icons/arrow-forward.svg"
                                        alt="share"
                                        width={24}
                                        height={24}
                                        priority={true}
                                        className="group-hover:scale-110 transition-transform"
                                    />
                                </li>
                                <li className="ms-16 mt-2">
                                    <Message />
                                </li>
                            </ul>
                        </li>
                        <li className="my-4">
                            <Message />
                        </li>
                    </ul>
                </div>

                <div className="sticky py-4 bottom-0 bg-first z-20 shadow-md">
                    <SendMessage />
                </div>
            </div>
        </div>
    );
}

export default Page;
