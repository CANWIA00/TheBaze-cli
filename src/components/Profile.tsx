'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProfile } from '../components/context/ProfileProvider';

function Profile() {
    const profile = useProfile();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const router = useRouter();

    if (!profile) {
        return <div className="text-white p-4">Loading profile...</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className="w-72 bg-[#201E43] shadow-lg fixed top-0 right-16 h-screen border border-[#EEEEEE] p-4 animate-slideIn flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-white text-xl font-bold">Profile</h1>
                <Link
                    href="#"
                    className="text-[#508C9B] text-sm hover:underline"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </Link>
            </div>

            <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                    <Image
                        src={ profile.profilePhoto || "/icons/Ellipse 2.svg" }
                        alt="Profile Picture"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full opacity-80"
                    />
                    {isEditing && (
                        <button
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow hover:scale-110 transition bg-white"
                        >
                            <Image
                                src="/icons/upload (1).svg"
                                alt="upload"
                                width={24}
                                height={24}
                            />
                        </button>
                    )}
                </div>
                <h2 className="text-white text-lg font-bold">{profile.fullName}</h2>
                <p className="text-xs text-[#508C9B]">{profile.userStatus}</p>
            </div>

            <div className="mb-6 text-white">
                <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold">Bio:</span>
                    <span className="text-xs">{profile.bio || 'N/A'}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold">Birth Date:</span>
                    <span className="text-xs">{profile.birthDate}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold">Last Seen:</span>
                    <span className="text-xs">{new Date(profile.lastSeen).toLocaleString()}</span>
                </div>
            </div>

            <div className="mt-auto space-y-4">
                <button className="w-full py-2 bg-third text-white rounded-lg font-bold transition hover:bg-[#2F2C54]">
                    Edit Profile
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-text text-first rounded-lg font-bold transition hover:bg-[#2F2C54]"
                >
                    Log Out
                </button>
            </div>

            <div className="absolute inset-0 flex flex-row items-center justify-center mb-auto opacity-20 -z-20">
                <Image
                    src="/icons/logo.svg"
                    alt="home"
                    width={44}
                    height={44}
                    priority
                    className="group-hover:scale-110 transition-transform"
                />
                <h1 className="text-text text-3xl font-bold ps-3 -z-10">The Baze</h1>
            </div>
        </div>
    );
}

export default Profile;
