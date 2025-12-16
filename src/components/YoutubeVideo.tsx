"use client";

import { useRef, useEffect, useState } from "react";

export default function YouTubeVideo() {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Set hasInteracted to true immediately when component mounts (after door opens)
  useEffect(() => {
    // This will trigger autoplay when the component mounts
    setHasInteracted(true);
    
    // Set isReady after a short delay to ensure component is mounted
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Initialize YouTube player and attempt to play
  useEffect(() => {
    if (hasInteracted && isReady) {
      const attemptToPlay = () => {
        if (playerRef.current && playerRef.current.contentWindow) {
          try {
            playerRef.current.contentWindow.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'playVideo',
                args: []
              }),
              '*'
            );
            setIsPlaying(true);
            
            // If successful, clear the interval
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          } catch (error) {
            console.error("Failed to play via API:", error);
          }
        }
      };

      // Try immediately
      attemptToPlay();
      
      // Also try at intervals in case the iframe isn't ready yet
      intervalRef.current = setInterval(attemptToPlay, 1000);

      // Stop trying after 10 seconds
      setTimeout(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }, 10000);
    }
  }, [hasInteracted, isReady]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // The rest of the component remains the same
  return (
    <div className="bg-gradient-to-br from-[#976790]/20 to-[#7a5274]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#976790]/30 shadow-lg">
      <div className="space-y-2">
        <div className="text-center">
          <h3 className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider mb-1">
            Muzik Latar
          </h3>
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wide italic">
            {isPlaying ? "Muzik sedang dimainkan" : "Sedang memuatkan muzik..."}
          </p>
        </div>
        
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-[#976790]/10">
          <iframe
            ref={playerRef}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/Qa4ugJ42CwE?enablejsapi=1&autoplay=1&controls=1&modestbranding=1&rel=0&mute=0&playsinline=1`}
            title="Wedding Background Music"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        
        <div className="text-center pt-2">
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790]/80 tracking-wide italic">
            Gunakan kawalan YouTube untuk henti atau mainkan semula
          </p>
        </div>
      </div>
    </div>
  );
}