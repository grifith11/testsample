"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";
import { FullStoryModal } from "./full-story-modal";

interface StoryMoment {
  image: string;
  caption: string;
  date: string;
}

// Add your story moments one by one
const storyMoments: StoryMoment[] = [
  {
    image: "/images/story-1.jpg",
    caption:
      "I don't remember the exact moment my life changed… but I remember the first time I saw you. There was something different in that moment — not dramatic, not loud… just calm. Like my heart quietly whispered: 'This person is going to matter to you.'",
    date: "Love at First Look",
  },
  // Add more stories here one by one
];

function StoryCard({
  moment,
  index,
}: {
  moment: StoryMoment;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col items-center gap-6 md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <motion.div
          className="overflow-hidden rounded-2xl shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={moment.image || "/placeholder.svg"}
            alt={moment.caption}
            className="aspect-[4/3] w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Caption */}
      <div className={`w-full md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"}`}>
        <span className="mb-2 inline-block font-script text-2xl text-accent">
          {moment.date}
        </span>
        <p className="font-sans text-lg leading-relaxed text-muted-foreground">
          {moment.caption}
        </p>
      </div>
    </motion.div>
  );
}

export function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative px-4 py-24 md:py-32" id="our-story">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Heart
            className="mx-auto mb-4 h-8 w-8 text-primary"
            fill="hsl(350 65% 45%)"
            strokeWidth={0}
          />
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl">
            ❤️ Our Story
          </h2>
          <p className="mt-4 font-sans text-muted-foreground">
            The beautiful moments that led us here
          </p>
          <div className="mt-8">
            <FullStoryModal />
          </div>
        </motion.div>

        {/* Timeline line (desktop only) */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />

          {/* Story moments */}
          <div className="flex flex-col gap-16 md:gap-24">
            {storyMoments.map((moment, index) => (
              <div key={index} className="relative">
                {/* Timeline dot (desktop only) */}
                <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                  <div className="h-3 w-3 rounded-full bg-primary shadow-lg shadow-primary/30" />
                </div>
                <StoryCard moment={moment} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
