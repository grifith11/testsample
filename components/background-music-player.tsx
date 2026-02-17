"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function BackgroundMusicPlayer() {
  const playerRef = useRef<any>(null);
  const hasUnmutedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    // Check if YouTube API is already loaded
    if ((window as any).YT && (window as any).YT.Player) {
      // API already loaded, create player directly
      initPlayer();
      return;
    }

    // Load YouTube IFrame API only if not already loaded
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    // Define YT.Player onReady callback
    (window as any).onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    return () => {
      // Cleanup
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.log("[v0] Player cleanup");
        }
      }
    };
  }, []);

  const initPlayer = () => {
    if (playerRef.current) return; // Already initialized
    
    const player = new (window as any).YT.Player("youtube-player", {
      height: "0",
      width: "0",
      videoId: "vGJTaP6anOU",
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
      playerVars: {
        autoplay: 1,
        mute: 1, // Muted autoplay is allowed by browsers; we unmute on first user interaction
        controls: 0,
        modestbranding: 1,
        rel: 0,
      },
    });
    playerRef.current = player;
  };

  const onPlayerReady = (event: any) => {
    setPlayerReady(true);
    event.target.playVideo(); // Autoplay works when muted (browser policy)
    setIsPlaying(true);
  };

  // Unmute on first user interaction (required by browser autoplay policy)
  useEffect(() => {
    if (!playerReady) return;

    const unmuteOnInteraction = () => {
      if (hasUnmutedRef.current) return;
      if (playerRef.current && typeof playerRef.current.unMute === "function") {
        try {
          playerRef.current.unMute();
          hasUnmutedRef.current = true;
        } catch (e) {
          console.log("[BackgroundMusic] Unmute failed:", e);
        }
      }
    };

    const events = ["click", "touchstart", "keydown", "scroll"] as const;
    const opts = { once: true, passive: true } as const;
    events.forEach((evt) => document.addEventListener(evt, unmuteOnInteraction, opts));

    return () => {
      events.forEach((evt) => document.removeEventListener(evt, unmuteOnInteraction));
    };
  }, [playerReady]);

  const onPlayerStateChange = (event: any) => {
    const YT = (window as any).YT;
    if (event.data === YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    } else if (event.data === YT.PlayerState.ENDED) {
      // Video ended, restart it
      event.target.playVideo();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (!playerReady || !playerRef.current) return;

    try {
      // Unmute on first interaction (browser autoplay policy)
      if (!hasUnmutedRef.current) {
        playerRef.current.unMute();
        hasUnmutedRef.current = true;
      }
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("[v0] Error toggling playback:", error);
    }
  };

  return (
    <>
      {/* Hidden YouTube player container */}
      <div id="youtube-player" style={{ display: "none" }} />

      {/* Fixed control button - minimalistic floating button */}
      <motion.button
        onClick={togglePlayPause}
        disabled={!playerReady}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={playerReady ? { scale: 1.1 } : {}}
        whileTap={playerReady ? { scale: 0.95 } : {}}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          {isPlaying ? (
            <Volume2 className="h-6 w-6 text-primary" />
          ) : (
            <VolumeX className="h-6 w-6 text-primary/50" />
          )}
        </motion.div>
      </motion.button>
    </>
  );
}
