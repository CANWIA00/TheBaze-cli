import React from 'react';
import Image from "next/image";
import Link from "next/link";

function UserCard() {
    return (
        <div className="group w-full h-40 [perspective:1000px] focus-within:[perspective:1000px]">
            <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] focus-within:[transform:rotateY(180deg)]">
                <div
                    className="absolute w-full h-full border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center [backface-visibility:hidden]"
                >
                    <Image
                        src="/icons/Ellipse 2.svg"
                        alt="Group Profile"
                        width={84}
                        height={84}
                        className="group-hover:scale-110 transition-transform mb-2"
                    />
                    <h1 className="text-xl font-bold text-text ">User_@123123</h1>
                </div>

                <div
                    className="absolute w-full h-full bg-first border border-gray-300  text-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                >
                    <h1 className="text-lg font-bold">User_@123123</h1>
                    <p className="text-sm text-center mt-2">
                        A group dedicated to exploring and discussing advanced topics in Rocket Science.
                    </p>
                    <div className="mt-3 bottom-4 flex space-x-4">
                        <Link href="#">
                            <button className="">
                                <Image
                                    src="/icons/message.svg"
                                    alt="Search"
                                    width={24}
                                    height={24}
                                    className="invert-[85%] text-first transition-all duration-500 ease-in-out hover:scale-110"
                                />
                            </button>
                        </Link>
                        <Link href="#">
                            <button className="">
                                <Image
                                    src="/icons/user-plus.svg"
                                    alt="Search"
                                    width={24}
                                    height={24}
                                    className="text-first transition-all duration-500 ease-in-out hover:scale-110"
                                />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
