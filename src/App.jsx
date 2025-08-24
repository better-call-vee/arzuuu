// src/App.jsx

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CountdownPage from './components/CountdownPage';
import BirthdayPage from './components/BirthdayPage';
import FloatingStars from './components/FloatingStars';

function App() {
  const [isBirthday, setIsBirthday] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    const today = new Date();
    setIsBirthday(true);

    if (today.getMonth() === 7 && today.getDate() === 29) {
      setIsBirthday(true);
    }
  }, []);

  useEffect(() => {
    if (isBirthday) {
      const timer = setTimeout(() => {
        setShowTransition(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isBirthday]);

  const theme = isBirthday && showTransition ? 'day' : 'night';

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-[2000ms] ease-in-out ${theme === 'day' ? 'bg-sunny' : 'bg-midnight-blue'
        }`}
    >
      {/* Pass the current theme as a prop to FloatingStars */}
      <FloatingStars theme={theme} />

      <AnimatePresence mode='wait'>
        {theme === 'day' ? (
          <motion.div
            key="birthday"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <BirthdayPage />
          </motion.div>
        ) : (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <CountdownPage />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;