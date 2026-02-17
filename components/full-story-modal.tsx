"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

const storyChapters = [
  {
    title: "Love at First Look",
    content:
      "I don't remember the exact moment my life changed… but I remember the first time I saw you. There was something different in that moment — not dramatic, not loud… just calm. Like my heart quietly whispered: 'This person is going to matter to you.'",
  },
  // Add more chapters here one by one
];

export function FullStoryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Read Our Full Story
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-background shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 z-10 rounded-full p-2 hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="overflow-y-auto max-h-[90vh] p-8">
                <div className="mb-8 text-center">
                  <h2 className="font-serif text-4xl font-bold text-foreground mb-2">
                    ❤️ Our Story
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedIndex + 1} of {storyChapters.length}
                  </p>
                </div>

                {/* Story chapter */}
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                    {storyChapters[selectedIndex].title}
                  </h3>
                  <p className="font-sans text-lg leading-relaxed text-foreground whitespace-pre-line">
                    {storyChapters[selectedIndex].content}
                  </p>
                </motion.div>

                {/* Navigation buttons */}
                <div className="flex gap-4 justify-between items-center pt-6 border-t border-border">
                  <button
                    onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                    disabled={selectedIndex === 0}
                    className="px-4 py-2 rounded-lg bg-muted text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/80 transition-colors"
                  >
                    ← Previous
                  </button>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {storyChapters.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === selectedIndex ? "bg-primary" : "bg-border"
                        }`}
                        aria-label={`Go to chapter ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setSelectedIndex(
                        Math.min(storyChapters.length - 1, selectedIndex + 1)
                      )
                    }
                    disabled={selectedIndex === storyChapters.length - 1}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
