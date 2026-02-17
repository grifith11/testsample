"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

export function FinalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative overflow-hidden px-4 py-24 md:py-32"
      id="forever"
      ref={ref}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/final.jpg"
          alt="A beautiful romantic moment"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Decorative accent line */}
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, hsl(350 65% 45% / 0.08), transparent 70%)"
      }} />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 1, type: "spring" }}
        >
          <Heart
            className="h-16 w-16 text-primary md:h-20 md:w-20"
            fill="hsl(350 65% 45%)"
            strokeWidth={0}
          />
        </motion.div>

        <motion.h2
          className="mt-8 font-serif text-4xl font-bold text-foreground md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-balance block">Forever</span>
          <span className="text-balance block text-primary">Yours</span>
        </motion.h2>

        <motion.p
          className="mt-6 max-w-md font-sans text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Replace with your own closing message */}
          In this life and every life after, I will find you, and I will choose
          you. Always.
        </motion.p>

        <motion.div
          className="mt-12 flex items-center gap-2 font-script text-xl text-primary"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span>Made with</span>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart
              className="inline h-5 w-5 text-primary"
              fill="hsl(350 65% 45%)"
              strokeWidth={0}
            />
          </motion.div>
          <span>for you</span>
        </motion.div>
      </div>
    </section>
  );
}
