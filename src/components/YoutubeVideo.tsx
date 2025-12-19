"use client";

import { useRef, useEffect, useState } from "react";
import { useUserInteraction, setUserInteraction } from "@/app/page";

export default function YouTubeVideo() {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for mobile autoplay
  const [hasAttemptedUnmute, setHasAttemptedUnmute] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(false);
  const hasUserInteracted = useUserInteraction();

  // Track if this is the first interaction (door opening)
  useEffect(() => {
    if (hasUserInteracted && !isFirstInteraction) {
      setIsFirstInteraction(true);
      console.log("First user interaction detected (door opened)");
    }
  }, [hasUserInteracted, isFirstInteraction]);

  const initYouTubePlayer = () => {
    if (!playerRef.current) return;

    const videoId = "Qa4ugJ42CwE";
    
    // Always start with muted autoplay for browser compliance
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&modestbranding=1&rel=0&mute=1&autoplay=1&playsinline=1&loop=1&playlist=${videoId}`;

    playerRef.current.src = youtubeUrl;
  };

  // Enhanced unmute function that handles iOS/Android restrictions
  const unmuteVideo = () => {
    if (!playerRef.current || !isReady || hasAttemptedUnmute) return;

    console.log("Attempting to unmute video after door interaction...");
    
    // Create a user gesture simulation for iOS
    const unlockAudioContext = () => {
      try {
        // Create and play a silent audio buffer
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const audioContext = new AudioContext();
          const buffer = audioContext.createBuffer(1, 1, 22050);
          const source = audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.destination);
          source.start(0);
          
          // Resume audio context if suspended (required for iOS)
          if (audioContext.state === 'suspended') {
            audioContext.resume();
          }
        }
      } catch (e) {
        console.log("Audio context unlock failed:", e);
      }
    };

    // Execute unmute sequence
    try {
      // Step 1: Unlock audio context (especially for iOS)
      unlockAudioContext();

      // Step 2: Send YouTube API commands to unmute
      const unmuteSequence = [
        { func: 'unMute', args: [] },
        { func: 'setVolume', args: [100] },
        { func: 'playVideo', args: [] }
      ];

      unmuteSequence.forEach((command, index) => {
        setTimeout(() => {
          playerRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              event: 'command',
              func: command.func,
              args: command.args
            }),
            '*'
          );
        }, 300 * index);
      });

      // Mark as unmuted
      setIsMuted(false);
      setHasAttemptedUnmute(true);
      console.log("Unmute sequence initiated");

      // Fallback: Try direct volume setting after 2 seconds
      setTimeout(() => {
        if (isMuted) {
          console.log("Fallback unmute attempt");
          playerRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'setVolume',
              args: [100]
            }),
            '*'
          );
        }
      }, 2000);

    } catch (error) {
      console.log("Unmute error:", error);
    }
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    console.log("YouTube iframe loaded");
    setIsReady(true);
    
    // For iOS, create a silent audio element to prime the audio system
    const primeIOSAudio = () => {
      const audio = document.createElement('audio');
      audio.muted = true;
      audio.autoplay = true;
      audio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
      document.body.appendChild(audio);
      
      audio.play().then(() => {
        console.log("Silent audio played for iOS");
      }).catch(e => {
        console.log("Silent audio play prevented:", e);
      });
      
      setTimeout(() => {
        document.body.removeChild(audio);
      }, 1000);
    };

    // Prime audio on iOS devices
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      primeIOSAudio();
    }
  };

  // Initialize player on mount
  useEffect(() => {
    initYouTubePlayer();

    // Listen for YouTube player events
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.event) {
          case 'onReady':
            setIsReady(true);
            console.log("YouTube player ready - Muted autoplay starting");
            
            // Auto-play muted video immediately (browser compliant)
            setTimeout(() => {
              playerRef.current?.contentWindow?.postMessage(
                JSON.stringify({
                  event: 'command',
                  func: 'playVideo',
                  args: []
                }),
                '*'
              );
            }, 1000);
            break;
            
          case 'onStateChange':
            if (data.info === 1) { // Playing
              setIsPlaying(true);
              console.log("Video is playing (muted)");
              
              // When video starts playing and user has interacted (door opened), try to unmute
              if (hasUserInteracted && isMuted && !hasAttemptedUnmute) {
                console.log("Video playing, attempting unmute after user interaction");
                setTimeout(() => {
                  unmuteVideo();
                }, 500);
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
    };
  }, []);

  // Main effect: When door opens (user interacts), unmute the video
  useEffect(() => {
    if (hasUserInteracted && isReady && isMuted && !hasAttemptedUnmute) {
      console.log("Door opened - User interaction detected, unmuting video");
      
      // Wait a bit for the video to start playing
      const unmuteTimer = setTimeout(() => {
        unmuteVideo();
      }, 1000);
      
      return () => clearTimeout(unmuteTimer);
    }
  }, [hasUserInteracted, isReady, isMuted, hasAttemptedUnmute]);

  // Handle manual click on video area
  const handleVideoClick = () => {
    setUserInteraction(); // Mark interaction
    
    if (!isReady) return;
    
    if (!isPlaying) {
      // Start playing
      playerRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: []
        }),
        '*'
      );
    } else if (isMuted) {
      // Try to unmute
      unmuteVideo();
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-[#976790]/20 to-[#7a5274]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#976790]/30 shadow-lg"
      onClick={handleVideoClick}
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

        <div className="aspect-video w-full rounded-lg overflow-hidden bg-[#976790]/10 relative">
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
          
          {/* Status overlay */}
          {!hasUserInteracted && isReady && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
              <div className="text-center p-4">
                <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full bg-white/20">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
                <p className="text-sm font-['Cormorant_Garamond'] text-white">
                  Bunyi akan diaktifkan automatik
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center pt-2">
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790]/80 tracking-wide italic mb-2">
            {!hasUserInteracted && "Ketuk pintu untuk mulakan muzik"}
            {hasUserInteracted && !isPlaying && "Ketuk untuk mainkan muzik"}
            {isPlaying && isMuted && "Mengaktifkan bunyi..."}
            {isPlaying && !isMuted && "🎵 Muzik latar perkahwinan sedang dimainkan"}
          </p>

          {/* Loading/status indicator */}
          {isPlaying && isMuted && hasUserInteracted && (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#976790] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#976790] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#976790] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] ml-2">
                Mengaktifkan bunyi...
              </p>
            </div>
          )}
          
          {/* Success indicator */}
          {isPlaying && !isMuted && (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 mr-2 text-green-600 animate-pulse">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs font-['Cormorant_Garamond'] font-light text-green-600">
                Bunyi telah diaktifkan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}