import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

type User = {
    email: string;
}

type Profile = {
    fullName?: string;
    profilePhoto?: string;
    user?:User;
};

type FriendRequest = {
    id: string;
    sender: Profile;
    receiver: Profile;
    status: string;
    createdAt: string;
};

function NavFriend() {
    const [showRequests, setShowRequests] = useState(false);
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

    const fetchFriendRequests = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8080/api/v1/friend/pending", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch friend requests");

            const data = await response.json();
            setFriendRequests(data);  // Assuming the response is an array of FriendDto objects
            setShowRequests(true);
        } catch (err) {
            console.error(err);
            alert("Error loading friend requests");
        }
    };

    const handleFriendRequestClick = () => {
        if (!showRequests) {
            fetchFriendRequests();
        } else {
            setShowRequests(false);
        }
    };

    return (
        <div className="w-72 bg-[#201E43] shadow-lg fixed top-0 right-16 h-screen border border-[#EEEEEE] p-4 animate-slideIn flex flex-col">
            {/* Header */}
            <div className="flex item-center justify-center space-x-2 me-2">
                <Image src="/icons/user.svg" alt="Groups" width={24} height={24} className="invert-[85%]" />
                <h1 className="text-white text-xl font-bold">Friends</h1>
            </div>

            <hr className="my-2 border-gray-300" />

            {/* Online Friends (example) */}
            <ul className="space-y-4 flex-grow">
                <li className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all">
                    <div className="flex items-center text-center">
                        <Link href="#" className="flex items-center w-full">
                            <div className="relative">
                                <Image src="/icons/Ellipse 2.svg" alt="Profile" width={24} height={24} className="me-2" />
                                <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 right-2"></div>
                            </div>
                            <div className="mt-1 text-start">
                                <span>TSM kor</span>
                                <p className="text-xs font-bold text-[#508C9B]">Active</p>
                            </div>
                        </Link>
                    </div>
                </li>
            </ul>

            {/* Background Logo */}
            <div className="absolute inset-0 flex flex-row items-center justify-center mb-auto opacity-20 -z-20">
                <Image src="/icons/logo.svg" alt="home" width={44} height={44} priority />
                <h1 className="text-text text-3xl font-bold ps-3 -z-10">The Baze</h1>
            </div>

            {/* Friend Requests Toggle */}
            <div onClick={handleFriendRequestClick} className="cursor-pointer flex items-center w-full">
                <p className="text-white text-start text-sm font-semibold">Friend Requests</p>
                <Image src="/icons/chevron-up.svg" alt="friend requests" width={24} height={24} priority />
            </div>
            <hr className="my-2 border-gray-300" />

            {/* Friend Request List */}
            {showRequests && (
                <>
                    {friendRequests.length > 0 ? (
                        <ul className="space-y-2 overflow-y-auto max-h-40">
                            {friendRequests.map((request) => (
                                <li key={request.id} className="bg-[#2F2C54] p-2 rounded text-white text-sm flex items-center">
                                    {/* Profile image and name from the sender */}
                                    <Image
                                        src={request.sender.profilePhoto ? `http://localhost:8080/${request.sender.profilePhoto}` : "/icons/Ellipse 2.svg"}
                                        alt={request.sender.fullName ?? "Anonymous User"}
                                        width={24}
                                        height={24}
                                        className="rounded-full me-2"
                                    />
                                    <p>{request.sender.fullName ?? "Anonymous User"}</p>
                                    <p>{request.sender.user?.email ?? "No email"}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-white text-sm italic text-center my-4">There are no friend requests</p>
                    )}
                </>
            )}

            {/* Find User Button */}
            <div className="mt-auto text-center space-y-2">
                <Link href="/findUser">
                    <p className="px-6 py-2 border rounded-lg hover:bg-second hover:text-text flex items-center justify-center w-full">
                        <span>Find User</span>
                        <Image src="/icons/search.svg" alt="home" width={20} height={20} priority className="ml-auto" />
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default NavFriend;
