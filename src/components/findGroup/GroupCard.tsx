import React from "react";
import Image from "next/image";
import Link from "next/link";

const GroupCard: React.FC = () => {
    return (
        <div className="group w-58 h-40 [perspective:1000px]">
            <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Side */}
                <div
                    className="absolute w-full h-full  border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center [backface-visibility:hidden]"
                >
                    <Image
                        src="/icons/Ellipse 2.svg"
                        alt="Group Profile"
                        width={84}
                        height={84}
                        className="group-hover:scale-110 transition-transform mb-2"
                    />
                    <h1 className="text-xl font-bold text-text ">Group RocketScience</h1>

                </div>

                {/* Back Side */}
                <div
                    className="absolute w-full h-full bg-gray-800 text-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                >
                    <h1 className="text-lg font-bold">Group RocketScience</h1>
                    <p className="text-sm text-center mt-2">
                        A group dedicated to exploring and discussing advanced topics in Rocket Science.
                    </p>
                    <Link href="#">
                        <button className="px-6 py-2 border rounded-lg hover:bg-text hover:text-first focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-row items-center justify-center w-full mt-2">
                            <span>Join</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GroupCard;
