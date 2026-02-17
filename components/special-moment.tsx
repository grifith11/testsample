"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Heart, X, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export function SpecialMoment() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [phase, setPhase] = useState(1);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noIndex, setNoIndex] = useState(0);
  const [yesPos, setYesPos] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const noTexts = ["No 😏", "Are you sure?", "Really?", "Think again 😅", "Stop 😭"];

  const fireConfetti = useCallback(() => {
    confetti({ spread: 360, particleCount: 150, scalar: 1.2 });
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
    setPhase(1);
  };

  useEffect(() => {
    if (!isRevealed) return;

    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 1500);
      return () => clearTimeout(t);
    }

    if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 1800);
      return () => clearTimeout(t);
    }
  }, [phase, isRevealed]);

  // floating hearts generator
  useEffect(() => {
    if (!accepted) return;
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, Math.random()]);
    }, 400);
    return () => clearInterval(interval);
  }, [accepted]);

  const moveNoButton = () => {
    const randomX = Math.random() * 140 - 70;
    const randomY = Math.random() * 80 - 40;
    setNoPos({ x: randomX, y: randomY });
    setNoIndex((prev) => (prev + 1) % noTexts.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    setYesPos({ x: x * 0.05, y: y * 0.05 });
  };

  const handleYes = () => {
    fireConfetti();
    setAccepted(true);
  };

  return (
    <section className="relative px-4 py-24 md:py-32" id="special" ref={sectionRef}>
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-pink-400" />
          <h2 className="font-serif text-3xl font-bold md:text-5xl">Something Special</h2>
          <p className="mt-4 text-muted-foreground">I have a little surprise waiting for you</p>
        </motion.div>

        {!isRevealed && (
          <motion.button
            onClick={handleReveal}
            className="mt-12 inline-flex items-center gap-3 rounded-full border px-8 py-4 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="h-6 w-6 text-pink-500" fill="#ec4899" />
            Open Your Surprise
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseMove={handleMouseMove}
          >
            <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            <motion.div
              ref={containerRef}
              className="relative z-10 w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-2xl overflow-hidden"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <button onClick={() => setIsRevealed(false)} className="absolute right-4 top-4">
                <X className="h-5 w-5" />
              </button>

              {phase === 1 && <p>For a moment… let’s pause the world.</p>}
              {phase === 2 && <p>Because some moments deserve forever.</p>}

              {phase === 3 && !accepted && (
                <div className="space-y-6">
                  <Heart className="mx-auto h-16 w-16 text-pink-500" fill="#ec4899" />

                  <h3 className="text-2xl font-serif font-bold">
                    Will you write the rest of our story with me?
                  </h3>

                  <div className="flex justify-center gap-4 pt-4">
                    <motion.button
                      animate={{ x: yesPos.x, y: yesPos.y }}
                      transition={{ type: "spring", stiffness: 200 }}
                      onClick={handleYes}
                      className="rounded-full bg-pink-500 px-6 py-2 text-white shadow-md"
                    >
                      Yes 💖
                    </motion.button>

                    <motion.button
                      onMouseEnter={moveNoButton}
                      animate={{ x: noPos.x, y: noPos.y }}
                      className="rounded-full border px-6 py-2"
                    >
                      {noTexts[noIndex]}
                    </motion.button>
                  </div>
                </div>
              )}

              {accepted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <Heart className="mx-auto h-16 w-16 text-pink-500" fill="#ec4899" />
                  <h3 className="text-2xl font-bold">
                    Too late… you can’t escape me in this lifetime 😌❤️✨
                  </h3>
                </motion.div>
              )}

              {/* Floating hearts */}
              {accepted &&
                hearts.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: -200, opacity: 1 }}
                    transition={{ duration: 3 }}
                    className="absolute left-1/2 text-pink-400"
                  >
                    ❤️
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
