// src/components/FloatingStars.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsBuilding, BsShieldFillCheck } from 'react-icons/bs';
import { FaHeart, FaUndoAlt, FaGlobeEurope, FaPuzzlePiece, FaHands, FaHeartbeat } from 'react-icons/fa';


// The component now accepts the 'theme' prop
const FloatingStars = ({ theme }) => {
    const [activeStarId, setActiveStarId] = useState(null);


    const starsData = [
        { id: 1, position: { top: '20%', left: '10%' }, icon: <FaUndoAlt className="text-bulu" />, message: "You're the UNO (1) I need ❤️" },
        {
            id: 2,
            position: { top: '25%', right: '8%' },
            icon: <BsBuilding className={theme === "day" ? "text-black" : "text-white"} />,
            message: "Every glance up to the 7th floor is worth a thousand dates."
        },
        { id: 3, position: { bottom: '15%', left: '15%' }, icon: <FaHeart className="text-amaranth-pink/80" />, message: "my one and only Kuchupuchu👨🏻‍❤️‍💋‍👩🏻" },
        { id: 4, position: { bottom: '22%', right: '35%' }, icon: <FaGlobeEurope className="text-blue-300/80" />, message: "To Germany, to the world, to our future together. 🐥" },
        { id: 5, position: { top: '15%', left: '45%' }, icon: <FaHeartbeat className="text-red-400/80" />, message: "I love you moreeee ❤️" },
        { id: 6, position: { top: '80%', right: '5%' }, icon: <BsShieldFillCheck className="text-green-300/80" />, message: "'Sayaa bhi tera na main du...' I'll always protect you🐧" },
        { id: 7, position: { top: '10%', right: '20%' }, icon: <FaPuzzlePiece className="text-sky-300/80" />, message: "You and I are perfect for each other. Never believe anything else." },
        { id: 8, position: { bottom: '10%', left: '45%' }, icon: <FaHands className="text-brown" />, message: "Keep us in your prayers🫂" },
    ];

    return (
        <>
            {/* Render the floating memory stars */}
            {starsData.map(star => (
                <motion.div
                    key={star.id}
                    className="absolute text-2xl cursor-pointer z-20"
                    style={star.position}
                    onClick={() => setActiveStarId(star.id)}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: star.id * 0.7 }}
                    whileHover={{ scale: 1.5, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {/* This span adds the shadow conditionally based on the theme */}
                    <span className={theme === 'day' ? '[text-shadow:0px_1px_2px_rgba(0,0,0,0.4)]' : ''}>
                        {star.icon}
                    </span>

                    <motion.div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-black/60 text-white text-xs rounded-md py-1 px-2 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        touch me
                    </motion.div>
                </motion.div>
            ))}

            {/* Pop-up message logic */}
            <AnimatePresence>
                {activeStarId !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        onClick={() => setActiveStarId(null)}
                    >
                        <motion.div
                            className="relative w-64 p-6 bg-midnight-blue/80 backdrop-blur-md rounded-lg border border-mauve/50 shadow-xl text-center"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                        >
                            <p className="font-body text-linen">
                                {starsData.find(s => s.id === activeStarId)?.message}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingStars;