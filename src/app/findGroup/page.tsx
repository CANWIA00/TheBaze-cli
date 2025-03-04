"use client";

import React, { useState } from 'react';
import SideBarLayout from '@/components/SideBarLayout';
import Image from 'next/image';
import GroupCard from '@/components/findGroup/GroupCard';

function Page() {
    const [activeComponent, setActiveComponent] = useState<'welcome' | 'createGroup' | 'inviteGroup'>('welcome');
    return (
        <div className="grid grid-cols-12 grid-rows-12 gap-0 bg-first">
            <div className="row-span-12 col-start-12 row-start-1 z-10">
                <SideBarLayout activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            </div>

            <div className="col-span-11 row-span-12 col-start-2 row-start-1 mt-5 px-4 py-5">
                <h1 className="text-4xl font-bold text-white">Find Group</h1>
                <div className="mt-5">
                    <h2 className="text-white text-lg">Search a Group</h2>
                    <div className="relative w-full mt-4">
                        <input
                            className="bg-transparent py-2 px-12 border rounded-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-5/12"
                            placeholder="Type in Group name or Id"
                        />
                        <Image
                            src="/icons/search.svg"
                            alt="Search"
                            width={24}
                            height={24}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-first transition-all duration-500 ease-in-out hover:scale-110"
                        />
                    </div>
                    <hr className="my-4 border-gray-300" />
                </div>
                <div className="mt-5 px-4">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl ">
                        <li className="flex justify-center">
                            <GroupCard />
                        </li>
                        <li className="flex justify-center">
                            <GroupCard />
                        </li>
                        <li className="flex justify-center">
                            <GroupCard />
                        </li>
                        <li className="flex justify-center">
                            <GroupCard />
                        </li>
                        <li className="flex justify-center">
                            <GroupCard />
                        </li>
                        <li className="flex justify-center">
                            <GroupCard />
                        </li>
                    </ul>
                </div>



            </div>
        </div>
    );
}

export default Page;
