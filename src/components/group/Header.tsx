import React from 'react';
import Image from 'next/image';

function Header() {
    return (
        <div>
            <header className="relative fixed flex flex-row top-0 left-0 p-4">
                <h1 className="text-text text-2xl font-medium flex-grow"># General</h1>
                <div className="flex space-x-4 px-2">
                    <button>
                        <Image
                            src="/icons/user-plus.svg"
                            alt="settings"
                            width={24}
                            height={24}
                            priority={true}
                            className="group-hover:scale-110 transition-transform"
                        />
                    </button>
                    <button>
                        <Image
                            src="/icons/bell-filled.svg"
                            alt="settings"
                            width={24}
                            height={24}
                            priority={true}
                            className="invert-[85%] group-hover:scale-110 transition-transform"
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
