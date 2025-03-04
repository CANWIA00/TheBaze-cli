"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import SideBarLayout from "../../components/SideBarLayout";
import SendMessage from "@/components/group/SendMessage";
import Header from "@/components/user/Header";
import Message from "@/components/group/Message";


function Page() {
    const [activeComponent, setActiveComponent] = useState<'welcome' | 'createGroup' | 'inviteGroup'>('welcome');

    return (
        <div className={"grid grid-cols-12 grid-rows-12 gap-0 bg-first h-screen"}>
            <div className="row-span-12 col-start-12 row-start-1 z-50">
                <SideBarLayout activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-span-8 row-span-12 col-start-3   row-start-1 flex flex-col h-full">
                <div className="sticky top-0 bg-first z-20 ">
                    <Header />
                </div>
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