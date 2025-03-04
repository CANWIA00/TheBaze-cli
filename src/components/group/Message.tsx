import React from 'react';
import Image from 'next/image';

function Message() {
    return (
        <div className="flex items-start rounded-lg space-x-3">
            {/* Profile Image */}
            <Image
                src="/icons/Ellipse 2.svg"
                alt="profile"
                width={40}
                height={40}
                priority={true}
                className="rounded-full"/>

            {/* Message Content */}
            <div className="flex-1">
                <h1 className="font-semibold">Canwia</h1>
                <h3 className="text-xs text-third">30.09.2025 15:44</h3>
                <p className="text-sm mt-1">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-2">
                    <button>
                        <Image
                            src="/icons/heart.svg"
                            alt="like"
                            width={16}
                            height={16}
                            priority={true}
                            className="group-hover:scale-110 transition-transform"/>
                    </button>
                    <button>
                        <Image
                            src="/icons/message-dots.svg"
                            alt="comment"
                            width={18}
                            height={18}
                            priority={true}
                            className="group-hover:scale-110 transition-transform"/>
                    </button>
                    <button>
                        <Image
                            src="/icons/arrow-forward.svg"
                            alt="share"
                            width={18}
                            height={18}
                            priority={true}
                            className="group-hover:scale-110 transition-transform"/>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Message;
