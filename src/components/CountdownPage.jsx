// src/components/CountdownPage.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import nightSkyAnimation from './night-animation.json';

const CountdownPage = () => {
    // --- The countdown logic remains the same ---
    const calculateTimeLeft = () => {
        const year = new Date().getFullYear();
        let birthday = new Date(year, 7, 29);
        if (new Date() > birthday) {
            birthday = new Date(year + 1, 7, 29);
        }
        const difference = birthday - new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    // --- End of the countdown logic ---

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 gap-y-8 md:gap-y-12">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-heading text-[var(--color-linen)] text-center z-10"
            >
                Counting the moments until I celebrate you...
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-lg aspect-[1080/365] rounded-2xl border border-[var(--color-mauve)]/20 shadow-[0_0_25px_rgba(228,193,249,0.3)] flex items-center justify-center overflow-hidden z-10"
            >
                <Lottie
                    animationData={nightSkyAnimation}
                    loop={false}
                    className="absolute top-0 left-0 w-full h-full object-fill z-0"
                />
                <div className="relative z-10 flex space-x-4 md:space-x-8">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-body text-linen">
                                {String(value).padStart(2, '0')}
                            </span>
                            <span className="text-[var(--color-mauve)] font-body text-sm capitalize">{unit}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl font-body text-[var(--color-desert-sand)] text-center z-10"
            >
                ...the day the universe gave me you, <span className="text-[var(--color-mauve)] font-bold text-4xl">Nimi</span> ❤️
            </motion.p>
        </div>
    );
};

export default CountdownPage;