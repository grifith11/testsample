"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface StoryChapter {
  title: string;
  content: string;
  imagePlaceholder: string;
}

const storyChapters: StoryChapter[] = [
  {
    title: "Love at First Look",
    content: `I don't remember the exact moment my life changed…
but I remember the first time I saw you.

There was something different in that moment —
not dramatic, not loud… just calm.

Like my heart quietly whispered:
"This person is going to matter to you."

I didn't call it love then.
But maybe love doesn't arrive loudly.
Maybe sometimes it simply sits beside you… and stays.`,
    imagePlaceholder: "/images/story-1.png",
  },
  {
    title: "Our First Meeting — The Hotel",
    content: `We met at the hotel like two strangers pretending to be normal.

Small talks.
Awkward smiles.
Stealing glances when the other wasn't looking.

I don't remember every word we spoke…
but I remember the feeling —
I didn't want the meeting to end.

Something had already started.`,
    imagePlaceholder: "/images/story-2.png",
  },
  {
    title: "You Came to See Me at Home",
    content: `When you came to my house, it felt different.

Suddenly this was not just a meeting anymore.
You were entering my world… my space… my comfort.

And strangely — you already felt like part of it.`,
    imagePlaceholder: "/images/story-3.png",
  },
  {
    title: "Engagement Day — Rain & The Number",
    content: `That day was chaos.

You weren't feeling well.
Heavy rain everywhere.
So many people around.

And I didn't even give you a place to sit properly.

But in between all that mess —
you asked for my number.

Not romantic.
Not perfect.
But real.

And maybe that's why it mattered.`,
    imagePlaceholder: "/images/story-4.png",
  },
  {
    title: "The First \"Hi\"",
    content: `Every love story has a beginning.

Ours began with a simple message:

"Hi…"

From that small word…
came long conversations, late nights, laughter, teasing, and comfort.

That was the day strangers slowly started becoming something more.`,
    imagePlaceholder: "/images/story-5.png",
  },
  {
    title: "Our First Ride Together",
    content: `The first time we travelled together in a car
to meet your grandmother…

It wasn't just a ride.

It was the first time silence felt comfortable.
The first time sitting beside you felt natural.

No effort.
No pretending.

Just peace.`,
    imagePlaceholder: "/images/story-6.png",
  },
  {
    title: "Your House Warming",
    content: `Your home became a memory for me.

Not because of the walls…
but because I started imagining a future in them.

I didn't say it aloud —
but my heart had already begun to choose you.`,
    imagePlaceholder: "/images/story-7.png",
  },
  {
    title: "Our First Outing — The Beach",
    content: `Our first real day together.

Wind in our faces, sand under our feet,
and time moving too fast.

The sea kept coming and going…
but I just wanted the moment to stay.

That day I knew —
I wasn't just liking you anymore.

I was falling.`,
    imagePlaceholder: "/images/story-8.png",
  },
  {
    title: "The Distance & The Airport Proposal",
    content: `Then came distance.

Different cities.
Different routines.
Different time zones.

But somehow… same feelings.

And then — at the airport —
you proposed.

Among crowds, announcements, and departures,
you gave me the one thing that made every distance small.

A future.`,
    imagePlaceholder: "/images/story-9.png",
  },
  {
    title: "Our Everyday Love",
    content: `Our love is not only cute moments.

It is:

Late night calls
Random fights
Getting angry
Saying sorry
Waiting for replies
Falling asleep on call
Secret talks
Missing each other
Laughing again after arguments

Sometimes we irritate each other.
Sometimes we misunderstand.

But every day —
we still choose each other.

That's what makes it real.`,
    imagePlaceholder: "/images/story-10.png",
  },
  {
    title: "Now",
    content: `Now we wait again.

Counting days.
Imagining the next meeting.
Replaying memories.

Soon…
there will be no screen between us.

And when that day comes,
I won't say anything dramatic.

I'll just look at you —
like the first day —

and silently thank life
for making our paths cross.`,
    imagePlaceholder: "/images/story-11.png",
  },
  {
    title: "Forever",
    content: `No matter the distance
No matter the fights
No matter the time

You became my habit.
My comfort.
My person.

And I'm still choosing you.

Every day.
Again and again.`,
    imagePlaceholder: "/images/story-12.png",
  },
];

function StoryChapterCard({
  chapter,
  index,
}: {
  chapter: StoryChapter;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col gap-8 md:gap-12 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <motion.div
          className="relative h-80 overflow-hidden rounded-2xl shadow-xl md:h-96"
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src={chapter.imagePlaceholder || "/placeholder.svg"}
            alt={chapter.title}
            fill
            className="object-cover"
          />

          {/* Romantic soft overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex w-full flex-col justify-center md:w-1/2">
        <h3 className="mb-6 font-serif text-2xl font-bold md:text-3xl">
          {chapter.title}
        </h3>
        <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">
          {chapter.content}
        </p>
      </div>
    </motion.div>
  );
}

export function CompleteStory() {
  return (
    <section className="relative overflow-hidden px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="mb-2 text-lg text-accent">Our Journey</p>
          <h2 className="text-4xl font-bold md:text-5xl">❤️ Our Story</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Twelve chapters of a love that changed everything
          </p>
        </div>

        {/* Chapters */}
        <div className="flex flex-col gap-24 md:gap-32">
          {storyChapters.map((chapter, index) => (
            <StoryChapterCard
              key={index}
              chapter={chapter}
              index={index}
            />
          ))}
        </div>

        {/* Ending */}
        <div className="mt-24 text-center">
          <p className="text-2xl text-primary">And the story continues...</p>
        </div>
      </div>
    </section>
  );
}
