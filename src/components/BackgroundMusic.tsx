"use client";

import { useRef, useState, useEffect } from "react";
import { useUserInteraction, setUserInteraction } from "@/app/page";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileButton, setShowMobileButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [hasAudioUnlocked, setHasAudioUnlocked] = useState(false);
  const [userManuallyPaused, setUserManuallyPaused] = useState(false);
  
  const hasUserInteracted = useUserInteraction();

  // Music metadata
  const musicName = "Until I Found You - Stephen Sanchez";

  // Detect mobile device and initialize audio
  useEffect(() => {
    if (typeof window === 'undefined' || !audioRef.current) return;

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobileDevice = mobileRegex.test(userAgent);
    
    setIsMobile(isMobileDevice);
    
    // Configure audio element
    const audio = audioRef.current;
    audio.volume = volume;
    audio.muted = true; // Start muted for silent autoplay
    audio.preload = "auto";
    audio.loop = true;

    const handleCanPlay = () => {
      setIsLoading(false);
      console.log("Audio can play, attempting silent autoplay...");
      
      // Strategy 1: Attempt silent autoplay on all devices
      const attemptAutoplay = async () => {
        try {
          await audio.play();
          console.log("Silent autoplay succeeded on", isMobileDevice ? "mobile" : "desktop");
          setIsPlaying(true);
          setHasAudioUnlocked(true);
          
          // Try to unmute after successful autoplay
          setTimeout(() => {
            if (audio && !userManuallyPaused) {
              audio.muted = false;
              console.log("Audio unmuted");
            }
          }, 500);
          
        } catch (err) {
          console.log("Silent autoplay failed:", err);
          // Show play button for mobile if autoplay fails
          if (isMobileDevice) {
            setShowMobileButton(true);
          }
        }
      };
      
      attemptAutoplay();
    };

    const handleError = (e: Event) => {
      setIsLoading(false);
      console.error("Audio loading error:", e);
      setAudioError("Could not load audio file");
      setShowMobileButton(true);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);
    
    // Start loading audio
    audio.load();

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Strategy 2: Use door interaction to unlock audio
  useEffect(() => {
    if (!hasUserInteracted || !audioRef.current || hasAudioUnlocked) return;
    
    console.log("User interacted (door opened), unlocking audio...");
    const audio = audioRef.current;
    
    // Use the door interaction gesture to unlock audio
    const unlockWithGesture = async () => {
      try {
        // Play and immediately pause to unlock audio for future use
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false; // Unmute after unlocking
        setHasAudioUnlocked(true);
        console.log("Audio unlocked via user gesture");
        
        // If not on mobile and not manually paused, start playing
        if (!isMobile && !userManuallyPaused) {
          setTimeout(() => playAudio(), 300);
        }
      } catch (err) {
        console.log("Could not unlock audio with gesture:", err);
        if (isMobile) {
          setShowMobileButton(true);
        }
      }
    };
    
    unlockWithGesture();
  }, [hasUserInteracted, hasAudioUnlocked, isMobile, userManuallyPaused]);

  // Strategy 3: Auto-resume on desktop if not manually paused
  useEffect(() => {
    if (!hasAudioUnlocked || !audioRef.current || isMobile || userManuallyPaused) return;
    
    if (!isPlaying && hasUserInteracted) {
      const timer = setTimeout(() => {
        playAudio();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [hasAudioUnlocked, hasUserInteracted, isMobile, userManuallyPaused, isPlaying]);

  // Play audio function
  const playAudio = async () => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    setUserManuallyPaused(false);
    
    try {
      // Ensure audio is unmuted and volume is set
      audio.muted = false;
      audio.volume = volume;
      
      await audio.play();
      setIsPlaying(true);
      setShowMobileButton(false);
      setAudioError(null);
      console.log("Manual play succeeded");
      
    } catch (error: any) {
      console.error("Manual play failed:", error);
      setShowMobileButton(true);
      
      if (error.name === 'NotAllowedError') {
        setAudioError("Please tap the play button to start music.");
      } else {
        setAudioError("Could not play audio. Please try again.");
      }
    }
    
    setUserInteraction();
  };

  // Pause audio function
  const pauseAudio = () => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    setIsPlaying(false);
    setUserManuallyPaused(true);
    setUserInteraction();
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Handle audio end - loop it
  const handleAudioEnd = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => {
        console.log("Loop play failed:", e);
      });
    }
  };

  // Add audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleAudioEnd);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [isPlaying]);

  return (
    <div className="bg-gradient-to-br from-[#976790]/20 to-[#7a5274]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#976790]/30 shadow-lg">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider mb-1">
            Muzik Latar
          </h3>
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wide italic">
            {isLoading
              ? "Memuatkan muzik..."
              : audioError
                ? "Sila cuba lagi"
                : isMobile && showMobileButton
                  ? "Ketuk butang di bawah untuk mainkan muzik"
                  : isPlaying
                    ? "Muzik sedang dimainkan 🎵"
                    : "Ketuk untuk mainkan muzik"}
          </p>
        </div>

        {/* Audio Element with reliable source */}
        <audio
          ref={audioRef}
          className="hidden"
        >
          {/* Primary source - change this to your actual audio file */}
          <source src="/music/wedding-music.mp3" type="audio/mpeg" />
          {/* Fallback online source if local file doesn't work */}
          <source src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Music Player UI */}
        <div className="flex flex-col items-center">
          {/* Music visualization */}
          <div className="w-full h-20 flex items-center justify-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((height, index) => (
              <div
                key={index}
                className={`w-3 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? 'bg-gradient-to-t from-[#976790] to-[#7a5274]'
                    : 'bg-gradient-to-t from-[#976790]/30 to-[#7a5274]/30'
                }`}
                style={{
                  height: `${isPlaying ? height * 8 + 10 : 10}px`,
                  animation: isPlaying
                    ? `wave ${0.5 + index * 0.1}s ease-in-out infinite alternate`
                    : 'none',
                }}
              />
            ))}
          </div>

          {/* Error Message */}
          {audioError && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center font-['Cormorant_Garamond']">
                {audioError}
              </p>
              <button
                onClick={playAudio}
                className="mt-2 w-full py-2 bg-red-100 text-red-700 rounded-lg font-['Cormorant_Garamond'] text-sm font-semibold hover:bg-red-200 transition-colors"
              >
                Cuba Lagi
              </button>
            </div>
          )}

          {/* Mobile Play Button */}
          {isMobile && showMobileButton && !audioError && (
            <button
              onClick={playAudio}
              className="w-full py-4 bg-gradient-to-br from-[#976790] to-[#7a5274] text-white rounded-xl font-['Cormorant_Garamond'] text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              <span>Mainkan Muzik</span>
            </button>
          )}

          {/* Desktop/Mobile Controls */}
          {(!isMobile || (isMobile && !showMobileButton)) && !audioError && (
            <div className="w-full space-y-4">
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={togglePlayPause}
                  className="p-4 bg-gradient-to-br from-[#976790] to-[#7a5274] text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                
                {/* Volume control */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#976790]" fill="currentColor" viewBox="0 0 24 24">
                      {volume === 0 ? (
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                      ) : volume < 0.5 ? (
                        <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                      ) : (
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      )}
                    </svg>
                    <span className="text-xs font-['Cormorant_Garamond'] text-[#976790] min-w-[80px]">
                      {isPlaying ? "Sedang main" : "Dihentikan"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-32 accent-[#976790]"
                    aria-label="Volume control"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Messages */}
        <div className="text-center pt-2">
          {isLoading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#976790] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#976790] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#976790] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790]">
                Memuatkan muzik...
              </p>
            </div>
          )}

          {isPlaying && !audioError && (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 mr-2 text-green-600 animate-pulse">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-xs font-['Cormorant_Garamond'] font-light text-green-600">
                Muzik sedang dimainkan
              </p>
            </div>
          )}

          {isMobile && showMobileButton && !audioError && (
            <div className="mt-2">
              <p className="text-xs font-['Cormorant_Garamond'] text-[#976790] italic">
                Tekan butang &quot;Mainkan Muzik&quot; untuk memulakan muzik latar
              </p>
              <p className="text-[10px] font-['Cormorant_Garamond'] text-[#976790]/70 mt-1">
                (Disebabkan oleh sekatan pelayar, muzik perlu dimulakan secara manual)
              </p>
            </div>
          )}

          {!isMobile && hasUserInteracted && !isPlaying && !isLoading && !audioError && !userManuallyPaused && (
            <p className="text-xs font-['Cormorant_Garamond'] text-[#976790] italic">
              Muzik akan bermula sebentar lagi...
            </p>
          )}

          {/* Music name display */}
          <div className="mt-4 pt-4 border-t border-[#976790]/20">
            <p className="text-sm font-['Cormorant_Garamond'] font-semibold text-[#7a5274]">
              {musicName}
            </p>
            <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790]/80 mt-1">
              Wedding Background Music
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}