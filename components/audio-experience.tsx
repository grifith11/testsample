"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Pause, Play, Volume2 } from "lucide-react";

export function AudioExperience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const animationRef = useRef<number>(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Audio playback failed - user interaction required
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
      animationRef.current = requestAnimationFrame(updateProgress);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("ended", handleEnded);
    animationRef.current = requestAnimationFrame(updateProgress);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="relative px-4 py-24 md:py-32" id="music" ref={sectionRef}>
      <div className="mx-auto max-w-lg">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Volume2 className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl">
            Our Song
          </h2>
          <p className="mt-4 font-sans text-muted-foreground">
            Press play and let the music carry our memories
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Play/Pause button */}
          <motion.button
            type="button"
            onClick={togglePlay}
            className="group relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-card shadow-lg transition-all hover:border-primary/50 hover:shadow-xl md:h-28 md:w-28"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {/* Progress ring */}
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="hsl(350 65% 45% / 0.15)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="hsl(350 65% 45%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 46}`}
                strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}`}
                className="transition-all duration-200"
              />
            </svg>

            {/* Heart / Play-Pause icon */}
            <div className="relative z-10">
              {isPlaying ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <Pause className="h-8 w-8 text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart
                    className="h-8 w-8 text-primary"
                    fill="hsl(350 65% 45%)"
                    strokeWidth={0}
                  />
                </motion.div>
              )}
            </div>
          </motion.button>

          <p className="font-sans text-sm text-muted-foreground">
            {isPlaying ? "Now playing..." : "Tap to play our song"}
          </p>

          {/* Voice note section */}
          <div className="mt-8 w-full rounded-xl border border-border/50 bg-card/50 p-6 text-center">
            <p className="mb-2 font-script text-xl text-primary">
              A Message Just for You
            </p>
            <p className="font-sans text-sm text-muted-foreground">
              {/* Replace /audio/voice-note.mp3 with your recorded voice message */}
              Place your recorded voice note in /public/audio/voice-note.mp3
            </p>
          </div>
        </motion.div>
      </div>

      {/* 
        Replace /audio/romantic-song.mp3 with your own romantic song.
        Place the MP3 file in the /public/audio/ directory.
      */}
      <audio ref={audioRef} src="/" preload="none" />
    </section>
  );
}
