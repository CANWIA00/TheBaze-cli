import React from 'react';
import Image from 'next/image';

function SendMessage() {
    return (
        <div className="relative w-full max-w-full">
            {/* Input field with icons inside */}
            <div className="relative w-2/3 mx-auto">
                {/* Left icon inside input */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Image
                        src="/icons/send.svg"
                        alt="send icon"
                        width={24}
                        height={24}
                        className="group-hover:scale-110 transition-transform hover:animate-bounce"
                    />
                </div>

                <input
                    className="bg-transparent py-2 pl-10 pr-32 border-2 border-second rounded-lg focus:ring-4 focus:ring-third focus:ring-opacity-50 w-full"
                    placeholder="Send Message"
                />

                {/* Right-side icons inside input */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    <button className="p-1 rounded">
                        <Image
                            src="/icons/folder-plus.svg"
                            alt="folder icon"
                            width={24}
                            height={24}
                            className="group-hover:scale-110 transition-transform duration-200 hover:scale-110 hover:shadow-lg"
                        />
                    </button>
                    <button className="p-1 rounded">
                        <Image
                            src="/icons/note.svg"
                            alt="note icon"
                            width={24}
                            height={24}
                            className="invert-[85%] group-hover:scale-110 transition-transform duration-200 hover:scale-110 hover:shadow-lg"
                        />
                    </button>
                    <button className="p-1 rounded">
                        <Image
                            src="/icons/gif.svg"
                            alt="gif icon"
                            width={24}
                            height={24}
                            className="group-hover:scale-110 transition-transform duration-200 hover:scale-110 hover:shadow-lg"
                        />
                    </button>
                    <button className="p-1 rounded">
                        <Image
                            src="/icons/mood-smile-beam.svg"
                            alt="mood icon"
                            width={24}
                            height={24}
                            className="group-hover:scale-110 transition-transform duration-200 hover:scale-110 hover:shadow-lg"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SendMessage;
