"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email,
                password,
            });

            const token = response.data?.token;
            if (token) {
                localStorage.setItem('token', token);
                window.location.href = '/home';
            } else {
                setErrorMessage('Login failed. No token received.');
            }
        } catch (error: any) {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                'An unexpected error occurred.';
            setErrorMessage(msg);
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

                <div className="mt-8 w-full md:w-6/12 flex flex-col items-center space-y-4">
                    <form onSubmit={handleLogin} className="w-full">
                        <div className="w-full mb-4">
                            <input
                                type="email"
                                className="bg-transparent py-2 px-4 border rounded-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="w-full mb-4">
                            <input
                                type="password"
                                className="bg-transparent py-2 px-4 border rounded-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
                        )}
                        <div className="w-full mb-4">
                            <button
                                type="submit"
                                className="py-2 bg-text text-first rounded-lg hover:bg-second hover:text-text focus:outline-none focus:ring-2 focus:ring-second w-full text-center"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <h5 className="text-white text-sm text-center"> or</h5>
                    <Link href={""}>
                        <p className="text-white text-sm text-center">Login with Google</p>
                    </Link>
                    <Link href={""}>
                        <p className="text-white text-sm text-center">Forgot your password?</p>
                    </Link>
                    <hr className="my-2 border-gray-300 w-full" />
                    <Link href={"/register"}>
                        <p className="text-white text-sm text-center">Don't have an account?</p>
                        <span className="text-white text-lm flex justify-center">Sign up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page;
