"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SectionDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex items-center justify-center py-8">
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={
          isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
        }
        transition={{ duration: 0.8 }}
      >
        <div className="h-px w-16 bg-border md:w-24" />
        <svg
          className="h-4 w-4 text-primary"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
        </svg>
        <div className="h-px w-16 bg-border md:w-24" />
      </motion.div>
    </div>
  );
}
