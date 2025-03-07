import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Page() {
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
                />            </div>

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
                    <div className="w-full">
                        <input
                            type="email"
                            className="bg-transparent py-2 px-4 border rounded-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                            placeholder="Email"
                        />
                    </div>
                    <div className="w-full">
                        <input
                            type="password"
                            className="bg-transparent py-2 px-4 border rounded-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                            placeholder="Password"
                        />
                    </div>
                    <div className="w-full">
                        <Link href={""}>
                            <p className="py-2 bg-text text-first rounded-lg hover:bg-second hover:text-text focus:outline-none focus:ring-2 focus:ring-second w-full text-center">
                                Login
                            </p>
                        </Link>
                    </div>
                    <h5 className="text-white text-sm text-center"> or</h5>
                    <Link href={""}>
                        <p className="text-white text-sm text-center">Login with Google</p>
                    </Link>
                    <Link href={""}>
                        <p className="text-white text-sm text-center">Forgot your password?</p>
                    </Link>
                    <hr className="my-2 border-gray-300 w-full" />
                    <Link href={""}>
                        <p className="text-white text-sm text-center">Don't have an account?</p>
                        <span className="text-white text-lm flex justify-center">Sign up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page;
