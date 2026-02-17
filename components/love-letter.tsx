// components/love-letter.tsx

"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Replace this with your own heartfelt love letter
const loveLetterLines = [
  "My dear future husband 💍,",
  "",
  "I love you more than anything in this world ❤️. I can’t imagine my life without you — you are my first and last love 💖. I promise to stand by you through every part of life 🤝, in difficult times 🌧️, in happiness 😊, in sickness 🤍, and in every moment in between ✨. I hope you will always stand by me too 💞.",
  "",
  "There may be times when I cry 😢, when I get angry 😠, when I feel sad 💔, or when I unintentionally hurt you, but no matter what, I will always choose you — only you 💘.",
  "",
  "I miss you so much 🥺, every moment, every minute ⏳. I dream of us being truly happy together 😍 and showing the world the love we share 🌍❤️. I look forward to building our family 👨‍👩‍👧‍👦 and chasing all the beautiful dreams that are yet to come 🌈✨.",
  "",
  "Forever yours 💌.",
];


export function LoveLetter() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      className="relative px-4 py-24 md:py-32"
      id="love-letter"
      ref={sectionRef}
      style={{ position: "relative" }}
    >
      {/* Subtle background decoration */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, hsl(350 65% 45% / 0.04), transparent 70%)",
        }}
      />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-2xl">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl">
            A Letter for You
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
        </motion.div>

        {/* Letter content */}
        <div className="rounded-2xl border border-border/50 bg-card/50 p-8 shadow-xl backdrop-blur-sm md:p-12">
          <div className="flex flex-col gap-1">
            {loveLetterLines.map((line, index) => (
              <motion.p
                key={index}
                className={`leading-relaxed ${
                  index === 0
                    ? "mb-4 font-script text-3xl text-primary md:text-4xl italic"
                    : index === loveLetterLines.length - 1
                      ? "mt-4 font-script text-2xl text-primary italic"
                      : line === ""
                        ? "h-4"
                        : "font-sans text-base italic text-muted-foreground md:text-lg"
                }`}                
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
              >
                {line || "\u00A0"}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
