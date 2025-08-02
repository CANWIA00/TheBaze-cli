"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface ProfileData {
    id: string;
    fullName: string;
    userMail: string;
    userId: string;
    profilePhoto?: string;
    bio?: string;
    birthDate: string;
    userStatus: string;
    lastSeen: string;
}

const ProfileContext = createContext<ProfileData | null>(null);

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<ProfileData | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await axios.get("http://localhost:8080/api/v1/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("👤 Fetched Profile:", res.data);
                setProfile(res.data);
            } catch (err) {
                console.error("❌ Failed to fetch profile", err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    );
};
