"use client";

import { useRef, useEffect, useState } from "react";

export default function YouTubeVideo() {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Listen for user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [hasInteracted]);

  // Initialize YouTube player after interaction
  useEffect(() => {
    if (hasInteracted && playerRef.current) {
      // Create a new iframe with autoplay
      const iframe = playerRef.current;
      
      // Method 1: Try to play via YouTube API
      const playVideo = () => {
        if (iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'playVideo',
                args: []
              }),
              '*'
            );
            setIsPlaying(true);
          } catch (error) {
            console.error("Failed to play via API:", error);
          }
        }
      };

      // Try after a delay
      setTimeout(playVideo, 1000);

      // Listen for YouTube player ready
      const handleMessage = (event: MessageEvent) => {
        if (event.data === 'YTPlayerReady') {
          playVideo();
        }
      };
      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [hasInteracted]);

  if (!hasInteracted) {
    return (
      <div className="bg-gradient-to-br from-[#976790]/20 to-[#7a5274]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#976790]/30 shadow-lg">
        <div className="space-y-2">
          <div className="text-center">
            <h3 className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider mb-1">
              Muzik Latar
            </h3>
            <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wide italic">
              Klik butang di bawah untuk mulakan muzik
            </p>
          </div>
          
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-[#976790]/10 flex items-center justify-center">
            <button
              onClick={() => setHasInteracted(true)}
              className="bg-[#7a5274] hover:bg-[#976790] text-white rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          
          <div className="text-center pt-2">
            <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790]/80 tracking-wide italic">
              Muzik akan dimainkan secara automatik selepas ini
            </p>
          </div>
        </div>
      </div>
    );
  }

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