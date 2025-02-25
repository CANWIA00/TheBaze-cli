import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';


function Welcome() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex"
        >
            <h1 className="text-6xl pe-3">Welcome to</h1>
            <Image src="/icons/logo.svg" alt="TheBaze" width={66} height={66} />
            <h1 className="text-6xl ps-3 font-bold">The Baze</h1>
        </motion.div>
    );
}

export default Welcome;