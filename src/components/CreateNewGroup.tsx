import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

interface CreateNewGroupProps {
    toggleCreateNewGroup: () => void;
    toggleInviteToGroup: () => void;
}

const CreateNewGroup: React.FC<CreateNewGroupProps> = ({ toggleCreateNewGroup, toggleInviteToGroup }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <button className="absolute top-4 right-4" onClick={toggleCreateNewGroup}>
                <Image
                    src="/icons/x.svg"
                    alt="Close"
                    width={24}
                    height={24}
                    className="text-first transition-all duration-500 ease-in-out hover:scale-110"
                />
            </button>

            <div className="flex flex-col items-center border space-y-6 p-20">
                <h1 className="flex items-center text-center text-2xl font-bold">
                    Create New Group
                </h1>
                <Link href="">
                    <Image
                        src="/icons/uploadPhoto.svg"
                        alt="Upload"
                        width={100}
                        height={100}
                        className="text-first transition-all duration-500 ease-in-out hover:scale-110"
                    />
                </Link>

                <h3 className="font-bold">Upload a Profile Photo</h3>
                <p>You can change that photo whenever you want.</p>

                <input
                    className="bg-transparent py-1 px-6 border rounded-lg focus:ring-4 focus:ring-white focus:ring-opacity-50 mt-4"
                    style={{ marginTop: '50px' }}
                    placeholder="Group Name"
                />
                <p>Please give a name for your group.</p>

                <button onClick={toggleInviteToGroup} className="px-12 py-2 rounded-lg bg-second text-white hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-60 transition-all duration-300 flex flex-row items-center justify-center">
                    <p>Create</p>
                </button>
            </div>
        </motion.div>
    );
}

export default CreateNewGroup;
