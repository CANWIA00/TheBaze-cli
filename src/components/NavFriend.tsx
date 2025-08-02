import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";

type User = {
    email: string;
};

type Profile = {
    fullName?: string;
    profilePhoto?: string;
    user?: User;
};

type FriendRequest = {
    id: string;
    sender: Profile;
    receiver: Profile;
    status: string;
    createdAt: string;
};

type FriendProfile = {
    id: string;
    userMail: string;
    fullName: string;
    profilePhoto?: string;
    bio?: string;
    birthDate?: string;
    userStatus?: string;
    lastSeen?: string;
};

function NavFriend() {
    const [friends, setFriends] = useState<FriendProfile[]>([]);
    const [showRequests, setShowRequests] = useState(false);
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

    useEffect(() => {
        const fetchFriends = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:8080/api/v1/friend/all", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch friends");

                const data = await response.json();
                setFriends(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFriends();
    }, []);

    const fetchFriendRequests = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:8080/api/v1/friend/request", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch friend requests");

            const data = await response.json();
            setFriendRequests(data);
            setShowRequests(true);
        } catch (err) {
            console.error(err);
            alert("Error loading friend requests");
        }
    };

    const handleAccept = async (requestId: string) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/api/v1/friend/accept/${requestId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to accept request");

            setFriendRequests(prev => prev.filter(req => req.id !== requestId));
        } catch (error) {
            console.error(error);
            alert("Failed to accept friend request");
        }
    };

    const handleReject = async (requestId: string) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/api/v1/friend/reject/${requestId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to reject request");

            setFriendRequests(prev => prev.filter(req => req.id !== requestId));
        } catch (error) {
            console.error(error);
            alert("Failed to reject friend request");
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

            {/* Online Friends (dynamic) */}
            <ul className="space-y-4 flex-grow">
                {friends.length === 0 ? (
                    <li className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all text-white text-center">
                        No friends found.
                    </li>
                ) : (
                    friends.map(friend => (
                        <li key={friend.id} className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all">
                            <div className="flex items-center text-center">
                                <Link href={`/userChat/${friend.userMail}`} className="flex items-center w-full">
                                    <div className="relative">
                                        <Image
                                            src={
                                                !friend?.profilePhoto || friend?.profilePhoto === "null"
                                                    ? "/icons/Ellipse 2.svg"
                                                    : friend?.profilePhoto
                                            }
                                            alt="Profile"
                                            width={24}
                                            height={24}
                                            className="rounded-full me-2"
                                        />
                                        {friend.userStatus === "AVAILABLE" && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 right-2"></div>
                                        )}
                                    </div>
                                    <div className="mt-1 text-start">
                                        <span>{friend.fullName}</span>
                                        <p className="text-xs font-bold text-[#508C9B]">
                                            {friend.userStatus === "AVAILABLE" ? "Active" : "Offline"}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    ))
                )}
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
                                <li
                                    key={request.id}
                                    className="bg-[#2F2C54] p-2 rounded text-white text-sm flex items-center"
                                >
                                    {/* Avatar */}
                                    <Image
                                        src={"/icons/Ellipse 2.svg"}
                                        alt={request.sender.fullName ?? "Anonymous User"}
                                        width={24}
                                        height={24}
                                        className="rounded-full me-2"
                                    />

                                    {/* Name and Email */}
                                    <div className="flex flex-col">
                                        <p>{request.sender.fullName ?? "Anonymous User"}</p>
                                        <p className="text-xs text-gray-300">
                                            {request.sender.user?.email ?? "No email"}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 ml-auto">
                                        <button onClick={() => handleReject(request.id)}>
                                            <Image
                                                src={"/icons/user-x.svg"}
                                                alt="Reject friend request"
                                                width={24}
                                                height={24}
                                                className="transition-all duration-300 hover:scale-110"
                                            />
                                        </button>

                                        <button onClick={() => handleAccept(request.id)}>
                                            <Image
                                                src={"/icons/user-plus1.svg"}
                                                alt="Accept friend request"
                                                width={24}
                                                height={24}
                                                className="transition-all duration-300 hover:scale-110"
                                            />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-white text-sm italic text-center my-4">
                            There are no friend requests
                        </p>
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
