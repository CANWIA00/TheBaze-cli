'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ProfileData {
    id: string;
    fullName: string;
    userId: string;
    profilePhoto?: string;
    bio?: string;
    birthDate: string;
    userStatus: string;
    lastSeen: string;
}

function Profile() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User not logged in');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/v1/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (err: any) {
                const msg =
                    err?.response?.data?.message ||
                    err?.message ||
                    'Failed to load profile.';
                setError(msg);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login'); // Or wherever your login page is
    };

    return (
        <div className="w-72 bg-[#201E43] shadow-lg fixed top-0 right-16 h-screen border border-[#EEEEEE] p-4 animate-slideIn flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-white text-xl font-bold">Profile</h1>
                <Link href="#" className="text-[#508C9B] text-sm hover:underline">Edit</Link>
            </div>

            {error ? (
                <p className="text-red-500 text-sm">{error}</p>
            ) : profile ? (
                <>
                    {/* Profile Picture and Info */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                            <Image
                                src={""}
                                alt="Profile Picture"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <h2 className="text-white text-lg font-bold">{profile.fullName}</h2>
                        <p className="text-xs text-[#508C9B]">{profile.userStatus}</p>
                    </div>

                    {/* Profile Details */}
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
                </>
            ) : (
                <p className="text-white text-sm">Loading profile...</p>
            )}

            {/* Buttons */}
            <div className="mt-auto space-y-4">
                <button className="w-full py-2 bg-third text-white rounded-lg font-bold transition hover:bg-[#2F2C54]">
                    Change Password
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-text text-first rounded-lg font-bold transition hover:bg-[#2F2C54]"
                >
                    Log Out
                </button>
            </div>

            {/* Background Logo */}
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
