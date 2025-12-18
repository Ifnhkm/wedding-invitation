"use client";

import { useRef, useEffect, useState } from "react";
import { useUserInteraction, setUserInteraction } from "@/app/page";

export default function YouTubeVideo() {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for mobile autoplay
  const [hasAttemptedUnmute, setHasAttemptedUnmute] = useState(false);
  const hasUserInteracted = useUserInteraction();
  const intervalRef = useRef<NodeJS.Timeout>();

  const initYouTubePlayer = () => {
    if (!playerRef.current) return;

    const videoId = "Qa4ugJ42CwE";
    // Start with muted autoplay for mobile compatibility
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=1&modestbranding=1&rel=0&mute=1&autoplay=1&playsinline=1&loop=1`;

    playerRef.current.src = youtubeUrl;
  };

  // Auto-unmute when user interacts
  const autoUnmute = () => {
    if (!playerRef.current || !isReady || hasAttemptedUnmute) return;

    try {
      console.log("Attempting to unmute video...");
      
      // First ensure video is playing
      playerRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: []
        }),
        '*'
      );
      
      // Then unmute after a short delay
      setTimeout(() => {
        playerRef.current?.contentWindow?.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'unMute',
            args: []
          }),
          '*'
        );
        
        // Also set volume to maximum
        playerRef.current?.contentWindow?.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'setVolume',
            args: [100]
          }),
          '*'
        );
        
        setIsMuted(false);
        setIsPlaying(true);
        setHasAttemptedUnmute(true);
        console.log("Video unmuted successfully");
      }, 300);
      
    } catch (error) {
      console.log("YouTube API unmute failed:", error);
    }
  };

  // Simple play function
  const playVideo = () => {
    if (!playerRef.current || !isReady) return;

    try {
      playerRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: []
        }),
        '*'
      );
      setIsPlaying(true);
    } catch (error) {
      console.log("YouTube play failed:", error);
    }
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    console.log("YouTube iframe loaded");
    setIsReady(true);
    
    // For iOS, we need to handle audio context
    const handleIOSAudio = () => {
      if (typeof window === 'undefined') return;
      
      // Create a dummy audio element to unlock audio on iOS
      const audio = new Audio();
      audio.autoplay = true;
      audio.muted = true;
      
      // Play the silent audio (required for iOS)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented, but that's okay
          console.log("Silent audio play prevented");
        });
      }
    };

    // Handle iOS specifically
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      handleIOSAudio();
    }
  };

  // Main effect to initialize player
  useEffect(() => {
    initYouTubePlayer();

    // Listen for YouTube player events
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.event) {
          case 'onReady':
            setIsReady(true);
            console.log("YouTube player ready");
            
            // Auto-play muted video on mobile immediately
            if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
              setTimeout(() => {
                playVideo();
              }, 500);
            }
            break;
            
          case 'onStateChange':
            console.log("YouTube state:", data.info);
            if (data.info === 1) { // Playing
              setIsPlaying(true);
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
            } else if (data.info === 2) { // Paused
              setIsPlaying(false);
            }
            break;
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
    };
  }, []);

  // Effect to auto-unmute when user interacts
  useEffect(() => {
    if (hasUserInteracted && isReady && isMuted && !hasAttemptedUnmute) {
      console.log("User interacted, attempting auto-unmute");
      
      // Try to unmute immediately
      autoUnmute();
      
      // Keep trying for a few seconds
      let attempts = 0;
      const maxAttempts = 3;
      
      intervalRef.current = setInterval(() => {
        if (!isMuted || attempts >= maxAttempts) {
          clearInterval(intervalRef.current);
          return;
        }
        
        attempts++;
        autoUnmute();
      }, 1000);
    }
  }, [hasUserInteracted, isReady, isMuted, hasAttemptedUnmute]);

  // Also try to unmute when video starts playing (as a backup)
  useEffect(() => {
    if (isPlaying && isMuted && hasUserInteracted && !hasAttemptedUnmute) {
      setTimeout(() => {
        autoUnmute();
      }, 1000);
    }
  }, [isPlaying, isMuted, hasUserInteracted, hasAttemptedUnmute]);

  return (
    <div
      className="bg-gradient-to-br from-[#976790]/20 to-[#7a5274]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#976790]/30 shadow-lg"
      onClick={() => {
        setUserInteraction();
        if (!isPlaying && isReady) {
          playVideo();
        } else if (isMuted && isPlaying) {
          autoUnmute();
        }
      }}
    >
      <div className="space-y-2">
        <div className="text-center">
          <h3 className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider mb-1">
            Muzik Latar
          </h3>
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wide italic">
            {!isReady
              ? "Memuatkan muzik..."
              : isPlaying
                ? isMuted
                  ? "Muzik dimainkan (akan aktifkan bunyi)"
                  : "Muzik sedang dimainkan 🎵"
                : "Ketuk untuk mainkan muzik"}
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
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790]/80 tracking-wide italic mb-2">
            {!isPlaying && !hasUserInteracted && "Ketuk mana-mana untuk mulakan muzik"}
            {isPlaying && isMuted && "Bunyi akan diaktifkan automatik..."}
            {isPlaying && !isMuted && "🎵 Muzik latar perkahwinan sedang dimainkan"}
          </p>

          {isPlaying && isMuted && (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-[#976790] rounded-full animate-pulse"></div>
              <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790]">
                Mengaktifkan bunyi...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}