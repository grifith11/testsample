"use client";

import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
      id="hero"
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(350 65% 45% / 0.12), transparent 70%), radial-gradient(ellipse at 80% 80%, hsl(38 70% 55% / 0.08), transparent 50%)",
        }}
      />

      {/* Hero image background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="Romantic scene"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Decorative sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-10 text-accent"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3,
            delay: i * 0.7,
            repeat: Infinity,
          }}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
          </svg>
        </motion.div>
      ))}

      <div className="relative z-20 flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Heart
            className="h-12 w-12 text-primary md:h-16 md:w-16"
            fill="hsl(350 65% 45%)"
            strokeWidth={0}
          />
        </motion.div>

        <motion.h1
          className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <span className="text-balance block">From the Moment</span>
          <span className="text-balance block text-primary">I Met You...</span>
        </motion.h1>

        <motion.p
          className="max-w-md font-sans text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Replace with your own romantic subtitle */}
          Every day with you feels like the most beautiful dream I never want to
          wake up from.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <a
            href="#our-story"
            className="group inline-flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <span className="font-sans text-sm uppercase tracking-widest">
              {/* Our Story */}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}


