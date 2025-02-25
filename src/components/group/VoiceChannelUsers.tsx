// VoiceChannelUsers.tsx
import React from 'react';
import Image from 'next/image';

interface User {
    id: number;
    name: string;
    avatar: string;
}

interface VoiceChannelUsersProps {
    users: User[];
}

const VoiceChannelUsers: React.FC<VoiceChannelUsersProps> = ({ users }) => {
    return (
        <ul className="space-y-2 pt-2 mb-5">
            <hr className=" border-gray-300" />
            {users.map((user) => (
                <li key={user.id} className="text-gray-300 hover:text-white hover:bg-[#2F2C54] hover:rounded  cursor-pointer flex items-center gap-2">
                    <Image
                        src="/icons/Ellipse 2.svg"
                        alt={user.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                    />
                    <span>{user.name}</span>
                    <div className="flex items-center gap-2 ml-auto">
                        <Image
                            src="/icons/microphone.svg"
                            alt={user.name}
                            width={16}
                            height={16}
                            className="rounded-full"
                        />
                        <Image
                            src="/icons/volume-2.svg"
                            alt={user.name}
                            width={16}
                            height={16}
                            className="rounded-full"
                        />
                    </div>

                </li>
            ))}
        </ul>
    );
};

export default VoiceChannelUsers;
