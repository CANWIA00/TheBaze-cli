'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json(); // parse JSON
                const token = data.token; // or whatever your backend sends
                localStorage.setItem('token', token);
                setSuccessMessage('Registration successful! Redirecting to login...');
                setErrorMessage('');
                setTimeout(() => {
                    window.location.href = '/createProfile';
                }, 1500);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Registration failed');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('Something went wrong. Try again.');
        }
    };

    return (
        <div className="grid grid-cols-12 grid-rows-12 gap-0 bg-first h-screen">
            <div className="col-span-7 row-span-12 col-start-1 row-start-1 flex flex-col h-full relative">
                <Image
                    src="/icons/image.jpg"
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </div>

            <div className="col-span-5 row-span-12 col-start-8 row-start-1 flex flex-col justify-center items-center h-full">
                <div className="flex items-center space-x-4">
                    <Image
                        src="/icons/logo.svg"
                        alt="Logo"
                        width={74}
                        height={74}
                        className="text-first transition-all duration-500 ease-in-out hover:scale-110"
                    />
                    <h2 className="text-white text-4xl font-bold mt-4">The Baze</h2>
                </div>

                <form
                    onSubmit={handleRegister}
                    className="mt-8 w-full md:w-6/12 flex flex-col items-center space-y-4"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent py-2 px-4 border rounded-lg focus:ring-4 focus:ring-blue-500 w-full"
                        placeholder="Email"
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent py-2 px-4 border rounded-lg focus:ring-4 focus:ring-blue-500 w-full"
                        placeholder="Password"
                        required
                    />

                    {errorMessage && (
                        <div className="text-red-500 text-sm text-center">{errorMessage}</div>
                    )}
                    {successMessage && (
                        <div className="text-green-400 text-sm text-center">{successMessage}</div>
                    )}

                    <button
                        type="submit"
                        className="py-2 bg-text text-first rounded-lg hover:bg-second hover:text-text focus:outline-none focus:ring-2 focus:ring-second w-full text-center"
                    >
                        Sign Up
                    </button>

                    <h5 className="text-white text-sm text-center">or</h5>
                    <Link href={''}>
                        <p className="text-white text-sm text-center">Sign up with Google</p>
                    </Link>
                    <hr className="my-2 border-gray-300 w-full" />
                    <Link href="/auth/login">
                        <p className="text-white text-sm text-center">Already have an account?</p>
                        <span className="text-white text-lm flex justify-center">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Page;
