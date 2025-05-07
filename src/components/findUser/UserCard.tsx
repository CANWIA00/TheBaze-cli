import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

type UserCardProps = {
    user: {
        id: string;
        fullName: string;
        profilePhoto?: string;
        bio?: string;
    };
};

function UserCard({ user }: UserCardProps) {
    const [isSending, setIsSending] = useState(false);
    const [friendAdded, setFriendAdded] = useState(false);

    const sendFriendRequest = async () => {
        try {
            setIsSending(true);
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No authentication token found.");
            }

            const response = await fetch(`http://localhost:8080/api/v1/friend/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to send friend request");
            }

            setFriendAdded(true);
        } catch (error) {
            console.error("Error sending friend request:", error);
            alert("Something went wrong while sending the request.");
        } finally {
            setIsSending(false);
        }
    };


    return (
        <div className="group w-full h-40 [perspective:1000px] focus-within:[perspective:1000px]">
            <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] focus-within:[transform:rotateY(180deg)]">
                {/* Front Side */}
                <div className="absolute w-full h-full border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center [backface-visibility:hidden]">
                    <Image
                        src={
                            user.profilePhoto && (user.profilePhoto.startsWith('http') || user.profilePhoto.startsWith('/'))
                                ? user.profilePhoto
                                : '/icons/Ellipse 2.svg'
                        }
                        alt={user.fullName}
                        width={84}
                        height={84}
                        className="rounded-full group-hover:scale-110 transition-transform mb-2 object-cover"
                    />
                    <h1 className="text-xl font-bold text-text">{user.fullName}</h1>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-first border border-gray-300 text-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h1 className="text-lg font-bold">{user.fullName}</h1>
                    <p className="text-sm text-center mt-2">
                        {user.bio || "No bio available."}
                    </p>
                    <div className="mt-3 bottom-4 flex space-x-4">
                        <Link href={`/messages/${user.id}`}>
                            <button>
                                <Image
                                    src="/icons/message.svg"
                                    alt="Message"
                                    width={24}
                                    height={24}
                                    className="invert-[85%] transition-all duration-500 ease-in-out hover:scale-110"
                                />
                            </button>
                        </Link>
                        <button onClick={sendFriendRequest} disabled={isSending || friendAdded}>
                            <Image
                                src="/icons/user-plus.svg"
                                alt="Add Friend"
                                width={24}
                                height={24}
                                className={`transition-all duration-500 ease-in-out hover:scale-110 ${
                                    friendAdded ? "opacity-50" : ""
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
