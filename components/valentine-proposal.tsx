"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";

export function ValentineProposal() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);
    setYesButtonScale((prev) => prev + 0.5);
  };

  const handleYesClick = () => {
    setAnswered(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.5 },
      });
    }, 300);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-secondary via-background to-primary/5 flex flex-col items-center justify-center px-4 py-20">

      {/* Floating hearts */}
      <motion.div
        className="absolute top-10 left-10 text-6xl opacity-40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ❤️
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-5xl opacity-30"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        💕
      </motion.div>

      {/* Main content */}
      <motion.div
        className="max-w-2xl w-full text-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >

        {/* Name */}
        <p className="font-script text-2xl md:text-3xl text-primary mb-8">
          Dear Anush,
        </p>

        {/* Question */}
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-12">
          Will You Be My Valentine?
        </h1>

        {/* Buttons */}
        <AnimatePresence>
          {!answered ? (
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <motion.button
                onClick={handleYesClick}
                className="px-8 py-4 bg-primary text-primary-foreground font-serif font-bold text-lg md:text-xl rounded-full shadow-lg"
                animate={{ scale: yesButtonScale }}
                transition={{ type: "spring", stiffness: 200 }}
                whileHover={{ scale: yesButtonScale * 1.05 }}
              >
                Yes! 💕
              </motion.button>

              {noClickCount < 5 && (
                <motion.button
                  ref={noButtonRef}
                  onClick={handleNoClick}
                  className="px-8 py-4 bg-muted text-muted-foreground font-serif font-bold text-lg md:text-xl rounded-full shadow-lg"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  No
                </motion.button>
              )}
            </motion.div>
          ) : (

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 mt-8"
            >

              <div className="text-6xl">❤️</div>

              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
                You Said Yes!
              </h2>

              <p className="font-script text-2xl md:text-3xl text-foreground">
                I knew you would, Anush 💕
              </p>

              {/* Signature */}
              <div className="pt-4">
                <p className="font-script text-xl text-primary opacity-80">
                  From your wife
                </p>
                <p className="font-script text-2xl md:text-3xl text-primary font-bold">
                  Jannu💕
                </p>
              </div>

            </motion.div>

          )}
        </AnimatePresence>

        {noClickCount >= 5 && !answered && (
          <p className="mt-8 font-script text-lg text-primary">
            Only one option left... 😉
          </p>
        )}

      </motion.div>
    </section>
  );
}
