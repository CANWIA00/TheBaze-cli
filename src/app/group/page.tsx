"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import SideBarLayout from "../../components/SideBarLayout";
import NavGroupLeft from "@/components/group/NavGroupLeft";
import GroupChannels from "@/components/group/GroupChannels";
import SendMessage from "@/components/group/SendMessage";
import Header from "@/components/group/Header";

function Group() {
    const [activeComponent, setActiveComponent] = useState<'welcome' | 'createGroup' | 'inviteGroup'>('welcome');

    return (
        <div className={"grid grid-cols-12 grid-rows-12 gap-0 bg-first"}>
            <div className="row-span-12 col-start-12 row-start-1 z-10">
                <SideBarLayout activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            </div>

            <div className="flex col-span-3 row-span-12 col-start-1 row-start-1">
                <NavGroupLeft />
                <GroupChannels />
            </div>

            <div className="col-span-8 row-span-10 col-start-4 row-start-1 ">
                <Header />
            </div>

            <div className="col-span-8 col-start-4 row-start-12 ">
                <SendMessage />
            </div>
        </div>
    );
}

export default Group;
