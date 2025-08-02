import React from 'react';
import Image from 'next/image';

interface ChatProfileDto {
    senderFullName: string,
    senderUserMail: string,
    senderPhotoUrl?: string,
    senderUserId: string,
    receiverFullName: string,
    receiverUserMail: string,
    receiverPhotoUrl?: string,
    receiverUserId: string,
}


interface MessageProps {
    message: {
        senderId: string;
        senderMail: string;
        receiverMail: string;
        content: string;
        timestamp: string;
        type?: string;
    };
    isOwnMessage: boolean;
    chatProfile: ChatProfileDto;
}

const Message: React.FC<MessageProps> = ({ message, isOwnMessage, chatProfile }) => {
    const { content, timestamp } = message;
    const displayName = isOwnMessage ? chatProfile.senderFullName : chatProfile.receiverFullName;

    return (
        <div className="flex items-start rounded-lg space-x-3">
            {!isOwnMessage && (
                <>
                    <Image
                        src={
                            !chatProfile?.receiverPhotoUrl || chatProfile.receiverPhotoUrl === "null"
                                ? "/icons/Ellipse 2.svg"
                                : chatProfile.receiverPhotoUrl
                        }
                        alt="profile"
                        width={40}
                        height={40}
                        priority={true}
                        className="rounded-full"
                    />

                    <div className="flex-1">
                        <h1 className="font-semibold text-third">{displayName}</h1>
                        {message.type === "FILE" ? (
                            <div className="text-sm break-words whitespace-pre-wrap">
                                {message.content.endsWith(".pdf") ? (
                                    <a
                                        href={message.content}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 underline hover:text-blue-300"
                                    >
                                        📄 See the PDF file
                                    </a>
                                ) : message.content.match(/\.(png|jpe?g|gif|webp)$/i) ? (
                                    <img
                                        src={message.content}
                                        alt="image"
                                        className="max-w-xs rounded-lg border border-gray-300 mt-2"
                                    />
                                ) : (
                                    <a
                                        href={message.content}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 underline hover:text-blue-300"
                                    >
                                        📎 Download the file
                                    </a>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm break-words whitespace-pre-wrap">
                                {content}
                            </p>
                        )}
                        <h3 className="text-xs text-third">{new Date(timestamp).toLocaleString()}</h3>
                        <div className="flex space-x-2 mt-2">
                            <button>
                                <Image src="/icons/heart.svg" alt="like" width={16} height={16} />
                            </button>
                            <button>
                                <Image src="/icons/message-dots.svg" alt="comment" width={18} height={18} />
                            </button>
                            <button>
                                <Image src="/icons/arrow-forward.svg" alt="share" width={18} height={18} />
                            </button>
                        </div>
                    </div>
                </>
            )}

            {isOwnMessage && (
                <div className="ml-auto flex items-start space-x-3 p-3 rounded-lg max-w-[75%] break-words">

                <Image
                    src={
                        !chatProfile?.senderPhotoUrl || chatProfile.senderPhotoUrl === "null"
                            ? "/icons/Ellipse 2.svg"
                            : chatProfile.senderPhotoUrl
                    }
                        alt="profile"
                        width={40}
                        height={40}
                        priority={true}
                        className="rounded-full"
                    />
                    <div>
                        <h1 className="font-semibold text-third">{displayName}:</h1>
                        {message.type === "FILE" ? (
                            <div className="text-sm break-words whitespace-pre-wrap">
                                {message.content.endsWith(".pdf") ? (
                                    <a
                                        href={message.content}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 underline hover:text-blue-300"
                                    >
                                        📄 See the PDF file
                                    </a>
                                ) : message.content.match(/\.(png|jpe?g|gif|webp)$/i) ? (
                                    <img
                                        src={message.content}
                                        alt="image"
                                        className="max-w-xs rounded-lg border border-gray-300 mt-2"
                                    />
                                ) : (
                                    <a
                                        href={message.content}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 underline hover:text-blue-300"
                                    >
                                        📎 See the PDF file
                                    </a>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm break-words whitespace-pre-wrap">
                                {content}
                            </p>
                        )}
                        <h3 className="text-xs text-right text-third mt-1">
                            {new Date(timestamp).toLocaleString()}
                        </h3>
                        <div className="flex space-x-2 mt-2">
                            <button>
                                <Image src="/icons/message-dots.svg" alt="comment" width={18} height={18} />
                            </button>
                            <button>
                                <Image src="/icons/arrow-forward.svg" alt="share" width={18} height={18} />
                            </button>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
};

export default Message;
