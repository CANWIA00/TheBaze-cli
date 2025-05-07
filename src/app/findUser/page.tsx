"use client";

import React, { useState } from 'react';
import SideBarLayout from '@/components/SideBarLayout';
import Image from 'next/image';
import UserCard from '@/components/findUser/UserCard';

function Page() {
    const [activeComponent, setActiveComponent] = useState<'welcome' | 'createGroup' | 'inviteGroup'>('welcome');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token'); // Adjust if using sessionStorage or cookies
            const res = await fetch(`http://localhost:8080/api/v1/profile/search/${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    return (
        <div className="grid grid-cols-12 grid-rows-12 gap-0 bg-first">
            <div className="row-span-12 col-start-12 row-start-1 z-10">
                <SideBarLayout activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-span-11 row-span-12 col-start-2 row-start-1 mt-5 px-4 py-5">
                <h1 className="text-4xl font-bold text-white">Find User</h1>
                <div className="mt-5">
                    <h2 className="text-white text-lg">Search a User</h2>
                    <div className="relative w-full mt-4">
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="bg-transparent py-2 px-12 border rounded-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-5/12"
                            placeholder="Type in Username or Id"
                        />
                        <Image
                            src="/icons/search.svg"
                            alt="Search"
                            width={24}
                            height={24}
                            onClick={handleSearch}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-first transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer"
                        />
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <div className="mt-5 px-4 pe-4">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                            {searchResults.length > 0 ? (
                                searchResults.map((user, idx) => (
                                    <li key={idx} className="flex justify-center">
                                        <UserCard user={user} />
                                    </li>
                                ))
                            ) : (
                                <li className="text-white">No users found</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
