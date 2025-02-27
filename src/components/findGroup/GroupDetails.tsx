import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function GroupDetails() {
    return (
        <div className="w-72 bg-[#201E43] shadow-lg h-screen border border-[#EEEEEE] p-4 flex flex-col">
            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-white text-xl font-bold my-2">Group Details</h1>
                <Image
                    src="/icons/Ellipse 2.svg"
                    alt="Group Pic"
                    width={144}
                    height={144}
                    className="group-hover:scale-110 transition-transform"
                />
                <h1 className="text-white text-xl font-bold">Group 1</h1>

                <p className="text-white text-sm font-thin my-2">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                </p>
            </div>
            <ul className="my-2 text-sm">
                <li>Created at: 02.12.2024</li>
                <li>Members: 12</li>
                <li>Admin: User2123</li>
            </ul>
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

        </div>
    );
}

export default GroupDetails;
