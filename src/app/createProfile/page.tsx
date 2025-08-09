'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

function Page() {
    const [fullName, setFullName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [bio, setBio] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fullName || !birthDate || !bio) {
            setErrorMessage('All fields are required.');
            setSuccessMessage('');
            return;
        }

        setErrorMessage('');
        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('You must be logged in to create a profile.');
            return;
        }

        try {
            const formData = new FormData();
            const profileCreateRequest = { fullName, bio, birthDate }; // "YYYY-MM-DD"

            // JSON part
            formData.append(
                'profileCreateRequest',
                new Blob([JSON.stringify(profileCreateRequest)], { type: 'application/json' })
            );

            // Dosya part (opsiyonel)
            if (file) {
                // basit bir kontrol (isteğe bağlı)
                if (!file.type.startsWith('image/')) {
                    setErrorMessage('Please select a valid image file.');
                    return;
                }
                formData.append('file', file, file.name);
            }

            const response = await axios.post(
                'http://localhost:8080/api/v1/profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // DİKKAT: Content-Type ekleme! Axios boundary’yi kendi ayarlıyor.
                    },
                }
            );

            setSuccessMessage('Profile created successfully!');
            setErrorMessage('');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        } catch (error: any) {
            const errorMsg =
                error?.response?.data?.message ||
                error?.message ||
                'An unexpected error occurred. Please try again.';
            setErrorMessage(errorMsg);
            setSuccessMessage('');
        }
    };



    return (
        <div className="grid grid-cols-12 grid-rows-12 gap-0 bg-first h-screen">
            {/* Left side background image */}
            <div className="col-span-7 row-span-12 col-start-1 row-start-1 flex flex-col h-full relative">
                <Image
                    src="/icons/image.jpg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </div>

            {/* Right side content */}
            <div className="col-span-5 row-span-12 col-start-8 row-start-1 flex flex-col justify-center items-center h-full">
                {/* Logo and Title */}
                <div className="flex items-center space-x-4">
                    <Image
                        src="/icons/logo.svg"
                        alt="Logo"
                        width={74}
                        height={74}
                        className="text-first transition-all duration-500 ease-in-out hover:scale-110"
                    />
                    <h2 className="text-white text-4xl font-bold mt-4">Create a Profile</h2>
                </div>

                {/* Form Section */}
                <div className="mt-8 w-full md:w-6/12 flex flex-col items-center space-y-4">
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="w-full mb-4">
                            <input
                                type="text"
                                className="bg-transparent py-2 px-4 border rounded-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        <div className="w-full mb-4">
                            <input
                                type="file"
                                accept="image/*"
                                className="bg-transparent py-2 px-4 border rounded-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                        </div>


                        <div className="w-full mb-4">
                            <input
                                type="date"
                                className="bg-transparent py-2 px-4 border rounded-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </div>

                        <div className="w-full mb-4">
                            <textarea
                                className="bg-transparent py-2 px-4 border rounded-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                                placeholder="Bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>

                        {errorMessage && (
                            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
                        )}

                        {successMessage && (
                            <div className="text-green-500 text-center mb-4">{successMessage}</div>
                        )}

                        <div className="w-full mb-4">
                            <button
                                type="submit"
                                className="py-2 bg-text text-first rounded-lg hover:bg-second hover:text-text focus:outline-none focus:ring-2 focus:ring-second w-full text-center"
                            >
                                Save and Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;
