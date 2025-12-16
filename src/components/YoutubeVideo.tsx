"use client";

import { useRef, useEffect, useState } from "react";
import { useUserInteraction, setUserInteraction } from "@/app/page";

export default function YouTubeVideo() {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const hasUserInteracted = useUserInteraction();
  const intervalRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const initYouTubePlayer = () => {
    if (!playerRef.current) return;

    const videoId = "Qa4ugJ42CwE";
    // CRITICAL: Load the iframe WITHOUT autoplay or mute parameters.
    // This allows the subsequent play() command to work with the user gesture.
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=1&modestbranding=1&rel=0`;

    playerRef.current.src = youtubeUrl;
  };

  // Attempt to play video using YouTube API
  const attemptPlay = () => {
    if (!playerRef.current || !isReady) return;

    try {
      // First try unmute and play
      playerRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'unMute',
          args: []
        }),
        '*'
      );

      // Then try to play
      setTimeout(() => {
        playerRef.current?.contentWindow?.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
          }),
          '*'
        );
        setIsPlaying(true);
      }, 100);
    } catch (error) {
      console.log("YouTube API play attempt failed:", error);
    }
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsReady(true);

    // Create a hidden button to trigger audio context on iOS
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const buffer = audioContext.createBuffer(1, 1, 22050);
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
      audioContext.resume();
    }
  };

  // Main effect to handle autoplay
  useEffect(() => {
    // Initialize the player
    initYouTubePlayer();

    // Set up message listener for YouTube events
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onReady') {
          setIsReady(true);
        } else if (data.event === 'onStateChange') {
          if (data.info === 1) {
            setIsPlaying(true);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }
        }
      } catch (error) {
        // Not a YouTube message
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Effect to handle playing when user interacts
  useEffect(() => {
    if (hasUserInteracted && isReady && !isPlaying) {
      // Mark the interaction
      setAttemptCount(prev => prev + 1);

      // Try to play immediately
      attemptPlay();

      // Set up interval to keep trying (in case iframe isn't ready yet)
      intervalRef.current = setInterval(() => {
        setAttemptCount(prev => {
          if (prev < 10) { // Max 10 attempts
            attemptPlay();
            return prev + 1;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return prev;
          }
        });
      }, 1000);
    }
  }, [hasUserInteracted, isReady, isPlaying]);

  // Additional fallback: if still not playing after 5 seconds of being ready, force interaction
  useEffect(() => {
    if (isReady && !isPlaying) {
      timeoutRef.current = setTimeout(() => {
        if (!isPlaying) {
          // Create a synthetic interaction
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          document.dispatchEvent(clickEvent);
        }
      }, 5000);
    }
  }, [isReady, isPlaying]);

  return (
    <div
      className="bg-gradient-to-br from-[#976790]/20 to-[#7a5274]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#976790]/30 shadow-lg"
      onClick={() => {
        setUserInteraction();
        if (!isPlaying && isReady) {
          attemptPlay();
        }
      }}
    >
      <div className="space-y-2">
        <div className="text-center">
          <h3 className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider mb-1">
            Muzik Latar
          </h3>
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wide italic">
            {isPlaying
              ? "Muzik sedang dimainkan"
              : hasUserInteracted
                ? "Sedang memuatkan muzik..."
                : "Klik mana-mana untuk mulakan muzik"}
          </p>
        </div>

        <div className="aspect-video w-full rounded-lg overflow-hidden bg-[#976790]/10">
          <iframe
            ref={playerRef}
            id="youtube-player"
            className="w-full h-full"
            title="Wedding Background Music"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={handleIframeLoad}
            loading="lazy"
          />
        </div>

        <div className="text-center pt-2">
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790]/80 tracking-wide italic">
            {!isPlaying && !hasUserInteracted && "Klik mana-mana untuk mulakan muzik"}
            {!isPlaying && hasUserInteracted && "Sedang cuba memainkan muzik..."}
            {isPlaying && "Gunakan kawalan YouTube untuk henti atau mainkan semula"}
          </p>

          {!isPlaying && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setUserInteraction();
                attemptPlay();
              }}
              className="mt-2 px-4 py-2 bg-[#976790] text-white text-sm rounded-lg hover:bg-[#7a5274] transition-colors"
            >
              Mainkan Muzik
            </button>
          )}
        </div>
      </div>
    </div>
  );
}