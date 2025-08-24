// src/components/BirthdayPage.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

// Import all assets from the local './components' folder
import birthdaySong from './hbd.m4a';
import hbdGif1 from './hbdgif1.gif';
import hbdGif2 from './hbdgif2.gif';
import hbdGif3 from './hbdgif3.gif';
import hbdGif4 from './hbdgif4.gif';
import celebrationAnimation from './celebration.json';
import hatchAnimation from './hatch.json';
import happyBirdAnimation from './happy-bird.json';

const gifs = [hbdGif1, hbdGif2, hbdGif3, hbdGif4];

const BirthdayPage = () => {
    const [currentGifIndex, setCurrentGifIndex] = useState(0);
    const [celebrationStarted, setCelebrationStarted] = useState(false);
    // We have removed the useRef for the audio

    const handleStart = () => {
        // FIX: Create and play the audio directly with JavaScript
        const audio = new Audio(birthdaySong);
        audio.loop = true;
        audio.play().catch(error => console.error("Audio playback failed:", error));

        // Now, trigger the visual celebration
        setCelebrationStarted(true);
    };

    useEffect(() => {
        if (celebrationStarted) {
            const interval = setInterval(() => {
                setCurrentGifIndex(prevIndex => (prevIndex + 1) % gifs.length);
            }, 5000); // Change GIF every 5 seconds

            return () => clearInterval(interval);
        }
    }, [celebrationStarted]);

    // "Click to Start" screen
    if (!celebrationStarted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                {/* The <audio> tag is no longer needed here */}
                <motion.button
                    onClick={handleStart}
                    className="px-8 py-4 bg-white rounded-full font-heading text-3xl text-amaranth-pink shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    A Surprise for Nimi... Click Here!
                </motion.button>
            </div>
        );
    }

    // The main birthday celebration page
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center gap-8 p-4 overflow-hidden">
            {/* Layer 1: Happy bird background */}
            <div className="absolute bottom-[-10rem] right-[-50px] w-1/2 h-1/2 md:inset-0 md:w-full md:h-full z-0 opacity-30">
                <Lottie animationData={happyBirdAnimation} loop={true} />
            </div>

            {/* Layer 4: Celebration confetti overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
                <Lottie animationData={celebrationAnimation} loop={true} />
            </div>

            {/* Layer 3: Hatching bird at the top */}
            <div className="absolute top-5 md:top-10 w-32 h-32 z-20">
                <Lottie animationData={hatchAnimation} loop={true} />
            </div>

            {/* Layer 2: Main Content */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-heading text-black text-center drop-shadow-lg z-10"
            >
                Happy Birthday, My Kuchupuchu!
            </motion.h1>

            {/* The Automated Card Stack Container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center z-10">
                <AnimatePresence>
                    <motion.div
                        key={currentGifIndex}
                        className="absolute w-full h-full p-2 bg-white rounded-2xl shadow-2xl border-4 border-white"
                        initial={{ y: 50, scale: 0.8, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: -50, scale: 0.8, opacity: 0, transition: { duration: 0.4 } }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <img src={gifs[currentGifIndex]} className="w-full h-full object-cover rounded-lg" alt="Birthday GIF" />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BirthdayPage;