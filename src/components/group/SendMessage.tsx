"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

type Props = {
    onSend: (text: string, file?: File | null) => void;
};

function SendMessage({ onSend }: Props) {
    const [text, setText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [gifSearchTerm, setGifSearchTerm] = useState("funny");
    const [gifResults, setGifResults] = useState<string[]>([]);

    const TENOR_API_KEY = "AIzaSyBEITG8TYQSsp-h6bx9zyPYR3KuU3DMfzo";

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText("");
            setShowEmojiPicker(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const handleEmojiSelect = (emoji: any) => {
        setText((prev) => prev + emoji.native);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            onSend("", selected);
        }
    };

    const fetchTenorGifs = async (query: string) => {
        try {
            const res = await fetch(`https://tenor.googleapis.com/v2/search?q=${query}&key=${TENOR_API_KEY}&limit=10`);
            const data = await res.json();
            const gifs = data.results.map((gif: any) => gif.media_formats.gif.url);
            setGifResults(gifs);
        } catch (err) {
            console.error("Tenor GIF fetch error:", err);
        }
    };

    useEffect(() => {
        if (showGifPicker) {
            fetchTenorGifs(gifSearchTerm);
        }
    }, [showGifPicker]);

    return (
        <div className="relative w-full max-w-full">
            <div className="relative w-2/3 mx-auto">
                {showEmojiPicker && (
                    <div className="absolute bottom-14 right-2 z-50">
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                    </div>
                )}

                {showGifPicker && (
                    <div className="absolute bottom-14 right-2 z-50 bg-white p-3 rounded shadow-md w-80">
                        <input
                            type="text"
                            placeholder="Search GIFs"
                            className="w-full mb-2 px-2 py-1 border rounded text-black"
                            value={gifSearchTerm}
                            onChange={(e) => setGifSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") fetchTenorGifs(gifSearchTerm);
                            }}
                        />
                        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                            {gifResults.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt="GIF"
                                    className="w-full h-auto rounded cursor-pointer hover:scale-105 transition"
                                    onClick={() => {
                                        onSend(url);
                                        setShowGifPicker(false);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleSend}
                >
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
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    <label className="p-1 rounded cursor-pointer">
                        <Image src="/icons/folder-plus.svg" alt="folder icon" width={24} height={24} />
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                    <button className="p-1 rounded">
                        <Image src="/icons/note.svg" alt="note icon" width={24} height={24} className="invert-[85%]" />
                    </button>
                    <button
                        className="p-1 rounded"
                        onClick={() => {
                            setShowGifPicker(!showGifPicker);
                            setShowEmojiPicker(false);
                        }}
                    >
                        <Image src="/icons/gif.svg" alt="gif icon" width={24} height={24} />
                    </button>
                    <button
                        className="p-1 rounded"
                        onClick={() => {
                            setShowEmojiPicker((prev) => !prev);
                            setShowGifPicker(false);
                        }}
                    >
                        <Image src="/icons/mood-smile-beam.svg" alt="emoji icon" width={24} height={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SendMessage;
