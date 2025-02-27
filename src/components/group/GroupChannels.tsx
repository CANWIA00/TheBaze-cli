import React from 'react';
import Image from "next/image";
import TextChannelList from '@/components/group/TextChannelList';
import VoiceChannelList from '@/components/group/VoiceChannelList';

function GroupChannels() {
    return (
        <div>

            <div className=" w-72  bg-[#201E43] shadow-lg  h-screen border border-[#EEEEEE] p-4  flex flex-col">
                <div className={"flex item-center justify-center space-x-2 me-2"}>
                    <Image
                        src="/icons/Ellipse 2.svg"
                        alt="Group Pic"
                        width={24}
                        height={24}
                        className="group-hover:scale-110 transition-transform "
                    />
                    <h1 className="text-white text-xl font-bold">Group 1</h1>
                </div>

                <hr className="my-2 border-gray-300" />

                <ul className="space-y-2 flex-grow ">
                    <TextChannelList/>
                    <VoiceChannelList/>
                </ul>

                <div className="flex flex-row items-center w-full">

                    <div className="flex">
                        <Image
                            src="/icons/logo.svg"
                            alt="home"
                            width={64}
                            height={64}
                            priority={true}
                            className="group-hover:scale-110 transition-transform"
                        />
                    </div>

                    <div className="flex flex-col items-center ml-auto ">

                        <div className="flex flex-row space-x-2  ml-auto">
                            <button>
                                <Image
                                    src="/icons/headphones-filled.svg"
                                    alt="headphones"
                                    width={24}
                                    height={24}
                                    priority={true}
                                    className="group-hover:scale-110 transition-transform "
                                />
                            </button>
                            <button>
                                <Image
                                    src="/icons/microphone.svg"
                                    alt="microphone"
                                    width={24}
                                    height={24}
                                    priority={true}
                                    className="group-hover:scale-110 transition-transform"
                                />
                            </button>
                            <button>
                                <Image
                                    src="/icons/settings.svg"
                                    alt="settings"
                                    width={24}
                                    height={24}
                                    priority={true}
                                    className="invert-[85%] group-hover:scale-110 transition-transform"
                                />
                            </button>
                        </div>


                        <h1 className="text-text text-4xl font-bold pt-2">The Blaze</h1>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default GroupChannels;