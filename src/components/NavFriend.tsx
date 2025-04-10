import React from 'react';
import Link from "next/link";
import Image from "next/image";

function NavFriend() {
    return (
        <div className="w-72 bg-[#201E43] shadow-lg fixed top-0 right-16 h-screen border border-[#EEEEEE] p-4 animate-slideIn flex flex-col">
            <div className={"flex item-center justify-center space-x-2 me-2"}>
                <Image
                    src="/icons/user.svg"
                    alt="Groups"
                    width={24}
                    height={24}
                    className="invert-[85%] group-hover:scale-110 transition-transform "
                />
                <h1 className="text-white text-xl font-bold">Friends</h1>
            </div>

            <hr className="my-2 border-gray-300" />

            <ul className="space-y-4 flex-grow">
                <li className="hover:bg-[#2F2C54] px-2 rounded-lg transition-all ">
                    <div className={"flex items-center text-center"}>
                        <Link href="#" className="flex items-center w-full">
                            <div className="relative ">
                                <Image
                                    src="/icons/Ellipse 2.svg"
                                    alt="Profile"
                                    width={24}
                                    height={24}
                                    className="group-hover:scale-110 transition-transform me-2"
                                />
                                <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 right-2"></div>
                            </div>
                            <div className={"mt-1 text-start"}>
                                <span>TSM kor</span>
                                <p className={"text-xs font-bold text-[#508C9B]"}>Active</p>
                            </div>
                        </Link>
                    </div>
                </li>
            </ul>

            <div className="absolute inset-0 flex flex-row items-center justify-center mb-auto opacity-20 -z-20">
                <Image
                    src="/icons/logo.svg"
                    alt="home"
                    width={44}
                    height={44}
                    priority={true}
                    className="group-hover:scale-110 transition-transform "
                />
                <h1 className="text-text text-3xl font-bold ps-3 -z-10">The Baze</h1>
            </div>


            <div className="mt-auto text-center">

                <Link href="/findUser">
                    <p className="px-6 py-2 border rounded-lg hover:bg-second hover:text-text focus:outline-none focus:ring-2 focus:ring-second flex flex-row items-center justify-center w-full">
                        <span className={"text-center"}>Find User</span>
                        <Image
                            src="/icons/search.svg"
                            alt="home"
                            width={20}
                            height={20}
                            priority={true}
                            className="group-hover:scale-110 transition-transform ml-auto"
                        />
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default NavFriend;