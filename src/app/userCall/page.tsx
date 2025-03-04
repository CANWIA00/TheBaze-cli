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
            <div className="row-span-12 col-start-12 row-start-1 z-50 ">
                <SideBarLayout activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-span-12 row-span-8 col-start-1 row-start-1 flex flex-col h-full bg-gray-900">
                {/*todo*/}

            </div>
        </div>
    );
}

export default Page;