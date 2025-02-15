"use client";

import Image from "next/image";
import NavRight from "@/components/NavRight";
import NavGroup from "@/components/NavGroup";
import React, { useState } from "react";

export default function Home() {
    const [isNavGroupVisible, setNavGroupVisible] = useState(false);


    const toggleNavGroup = () => {
        setNavGroupVisible((prev) => !prev);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="bg-[#201E43] flex justify-center items-center flex-grow">
                <h1 className="text-6xl pe-3">Welcome to</h1>
                <Image src="/icons/logo.svg" alt="TheBaze" width={66} height={66} />
                <h1 className="text-6xl ps-3 font-bold">The Baze</h1>
            </div>

            <div className="fixed right-0 top-0 h-screen flex items-center">
                <div className="p-4 bg-[#201E43] h-screen flex items-center">
                    {isNavGroupVisible && <NavGroup />}
                </div>
                <NavRight toggleNavGroup={toggleNavGroup} />
            </div>
        </div>
    );
}
