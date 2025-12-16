"use client";

import Image from "next/image";
import greet from "@/assets/bismillah.png";
import assalamualaikum from "@/assets/assalamualaikum.png";
import butterfly from "@/assets/butterfly.png";
import name from "@/assets/name.png";
import Calendar from "@/components/Calendar";
import Contact from "@/components/Contact";
import Form from "@/components/Form";
import Location from "@/components/Location";
import AnimatedBackground from "@/components/AnimatedBackground";
import InvitationCard from "@/components/InvitationCard";
import ScheduleCard from "@/components/ScheduleCard";
import YouTubeVideo from "@/components/YoutubeVideo";
import PrayerCard from "@/components/PrayerCard";
import DoorEntrance from "@/components/DoorEntrance";
import { useEffect, useState } from "react";

// Store the user interaction state globally
let userHasInteracted = false;
let interactionListeners: ((hasInteracted: boolean) => void)[] = [];

// Function to set user interaction
export const setUserInteraction = () => {
  userHasInteracted = true;
  interactionListeners.forEach(listener => listener(true));
};

// Hook to listen for user interaction
export const useUserInteraction = () => {
  const [hasInteracted, setHasInteracted] = useState(userHasInteracted);
  
  useEffect(() => {
    const listener = (value: boolean) => {
      setHasInteracted(value);
    };
    
    interactionListeners.push(listener);
    return () => {
      interactionListeners = interactionListeners.filter(l => l !== listener);
    };
  }, []);
  
  return hasInteracted;
};

export default function Home() {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [showDoor, setShowDoor] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (!showDoor) {
      const handleScroll = () => {
        const firstPage = document.getElementById('first-page');
        if (firstPage) {
          const firstPageBottom = firstPage.offsetHeight;
          const currentScroll = window.scrollY;
          if (currentScroll > firstPageBottom * 0.8) {
            setScrolledToBottom(true);
          } else {
            setScrolledToBottom(false);
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showDoor]);

  // Handle user interaction for autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteraction();
    };

    // Listen for various user interactions
    const events = [
      'click', 'touchstart', 'keydown', 'mousedown', 
      'scroll', 'wheel', 'pointerdown', 'pointerup'
    ];

    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  const openDoor = () => {
    setIsOpening(true);
    // Mark interaction when door opens
    setUserInteraction();
    setTimeout(() => {
      setShowDoor(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  // Show Door Entrance Component
  if (showDoor) {
    return <DoorEntrance onEnter={openDoor} isOpening={isOpening} />;
  }

  // Main Content (After door opens)
  return (
    <div 
      className="relative w-full max-w-md mx-auto min-h-screen bg-white overflow-y-auto scroll-smooth"
      onClick={setUserInteraction}
      onTouchStart={setUserInteraction}
    >
      <style jsx global>{`
        html, body {
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <AnimatedBackground />

      <div className="relative z-10">
        <div id="first-page" className="min-h-screen flex flex-col">
          <div className="flex-shrink-0 pt-10 px-6">
            <div className="w-full flex flex-col items-center space-y-2">
              <Image
                src={greet}
                alt="Bismillah"
                width={180}
                height={100}
                className="object-contain"
                priority
                onClick={setUserInteraction}
              />

              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-['Cormorant_Garamond'] font-normal text-[#7a5274] tracking-[0.15em] italic mb-6">
                  Walimatulurus
                </h2>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 pb-10 px-6">
            <div className="w-full max-w-sm mx-auto">
              {/* Top Divider */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#976790]/40 to-transparent"></div>
                <div className="mx-4">
                  <svg className="w-4 h-4 text-[#976790]/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,20,12,20z" />
                  </svg>
                </div>
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#976790]/40 to-transparent"></div>
              </div>

              {/* Name Image */}
              <div className="flex justify-center">
                <Image
                  src={name}
                  alt="Bride and Groom Names"
                  width={750}
                  height={450}
                  className="object-contain"
                  onClick={setUserInteraction}
                />
              </div>

              {/* Bottom Divider */}
              <div className="flex items-center justify-center mt-4 mb-8">
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#976790]/40 to-transparent"></div>
                <div className="mx-4">
                  <svg className="w-4 h-4 text-[#976790]/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,7c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S14.8,7,12,7z M12,16c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S14.2,16,12,16z" />
                  </svg>
                </div>
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#976790]/40 to-transparent"></div>
              </div>

              <div className="text-center space-y-1 mb-2">
                <p className="text-xs font-['Cormorant_Garamond'] font-normal text-[#7a5274] tracking-wide italic">
                  &quot;AND WE CREATED YOU IN PAIRS&quot;
                </p>
                <p className="text-[10px] font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wider">
                  QURAN (78 : 8)
                </p>
              </div>

              <div className="text-center mb-2">
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#976790]/70 tracking-wider italic">
                    #aMiracleforYaazid
                  </p>
                  <Image
                    src={butterfly}
                    alt="Butterfly"
                    width={40}
                    height={40}
                    className="object-contain"
                    onClick={setUserInteraction}
                  />
                </div>
              </div>

              {!scrolledToBottom && (
                <div 
                  className="animate-bounce flex flex-col items-center space-y-1 pt-4"
                  onClick={setUserInteraction}
                >
                  <p className="text-[12px] font-['Cormorant_Garamond'] font-semibold text-[#976790]/60">
                    Scroll untuk teruskan
                  </p>
                  <div className="w-5 h-8 border-2 border-[#976790]/40 rounded-full flex justify-center">
                    <div className="w-1 h-2 bg-[#976790]/60 rounded-full mt-1 animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECOND PAGE */}
        <div
          id="second-page"
          className="min-h-screen flex flex-col items-center justify-center px-6"
          style={{ paddingBottom: '120px' }}
        >
          <div className="max-w-sm w-full mx-auto">
            <Image
              src={assalamualaikum}
              alt="Assalamualaikum"
              width={300}
              height={100}
              className="w-full object-contain mx-auto"
              priority
              onClick={setUserInteraction}
            />

            <InvitationCard />

            <div className="mt-8" onClick={setUserInteraction}>
              <YouTubeVideo />
            </div>

            <div className="mt-8">
              <ScheduleCard />
            </div>

            <div className="mt-8">
              <PrayerCard />
            </div>

            <div className="h-20"></div>
          </div>
        </div>
      </div>

      {/* Fixed Navigation Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 pb-6 px-6 max-w-md mx-auto"
        onClick={setUserInteraction}
      >
        <div className="bg-[#976790]/20 backdrop-blur-sm rounded-2xl p-4 border border-[#976790]/30 shadow-lg">
          <div className="flex items-center justify-around w-full">
            <Contact />
            <Form />
            <Calendar />
            <Location />
          </div>
        </div>
      </div>
    </div>
  );
}