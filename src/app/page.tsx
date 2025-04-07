"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";


export default function Home() {

    const router = useRouter();

    const isLoggedIn = (): boolean => {
        // Example check: check for a valid session cookie or token
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        return !!token; // returns true if token exists, false otherwise
    };

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push('/login'); // Redirect to the login page if not logged in
        }
    }, [router]);



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center h-screen"
        >
            <div className="text-center space-y-6">
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="flex justify-center items-center space-x-4"
                >
                    <h1 className="text-6xl pe-3">Welcome to</h1>
                    <Image src="/icons/logo.svg" alt="The Baze" width={66} height={66} />
                    <h1 className="text-6xl ps-3 font-bold">The Baze</h1>
                </motion.div>

                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-3" />
                    <p className="text-gray-600 text-lg">Checking login status...</p>
                </div>
            </div>
        </motion.div>
    );
}
