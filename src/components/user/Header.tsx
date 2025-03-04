import React from 'react';
import Image from 'next/image';

function Header() {
    return (
        <div>
            <header className="relative fixed flex flex-row top-0 left-0 w-full pt-4 pb-4">
                <div className="flex items-center space-x-4 px-2">
                    <button>
                        <Image
                            src="/icons/Ellipse 2.svg"
                            alt="settings"
                            width={44}
                            height={44}
                            priority={true}
                            className="group-hover:scale-110 transition-transform"
                        />
                    </button>
                    <h1 className="text-text text-2xl font-medium flex-grow">User_123@1asds</h1>
                </div>

                <div className="flex space-x-4 px-2 ml-auto"> {/* ml-auto makes this align to the right */}
                    <button>
                        <Image
                            src="/icons/video.svg"
                            alt="settings"
                            width={24}
                            height={24}
                            priority={true}
                            className="group-hover:scale-110 transition-transform"
                        />
                    </button>
                    <button>
                        <Image
                            src="/icons/phone.svg"
                            alt="settings"
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
            </header>
        </div>
    );
}

export default Header;
