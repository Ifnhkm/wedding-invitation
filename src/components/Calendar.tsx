"use client";

import { FaRegCalendar } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Dialog from "./Dialog";

export default function Calendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  
  useEffect(() => {
    // Set the event date to January 24, 2026
    const eventDate = new Date('2026-01-24');
    const today = new Date();
    const timeDiff = eventDate.getTime() - today.getTime();
    setDaysRemaining(Math.ceil(timeDiff / (1000 * 3600 * 24)));
  }, []);

  return (
    <>
      <div className="flex flex-col items-center group">
        <button
          onClick={() => setIsOpen(true)}
          className="
            w-12 h-12 
            bg-gradient-to-br from-[#976790] to-[#7a5274] 
            rounded-2xl 
            flex items-center justify-center 
            shadow-lg 
            transition-all 
            duration-300 
            ease-out
            group-hover:scale-110
            group-hover:-translate-y-2
            hover:shadow-xl
            hover:from-[#8a5e83]
            hover:to-[#6d4968]
            focus:outline-none
            focus:ring-2
            focus:ring-[#976790]/50
          "
        >
          <FaRegCalendar className="text-xl text-white" />
        </button>
        <span className="text-xs text-[#5d3e57] mt-2 font-medium">
          Kalender
        </span>
      </div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-center space-y-4">
          {/* Countdown - Faded Purple Theme */}
          <div className="bg-gradient-to-br from-[#976790]/20 to-[#976790]/30 rounded-xl p-4 text-[#976790] shadow-lg border border-[#976790]/20">
            <p className="text-xs opacity-80 mb-1">Menuju Majlis</p>
            <p className="text-2xl font-bold">{daysRemaining}</p>
            <p className="text-xs opacity-80 mt-1">Hari</p>
          </div>

          {/* Event Date - Faded Purple Theme */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#976790]">
              <div className="w-6 h-6 bg-[#976790]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#976790] text-xs">📅</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#976790] text-sm">24 Januari 2026</p>
                <p className="text-xs text-[#976790]/70">Sabtu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-[#976790]">
              <div className="w-6 h-6 bg-[#976790]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#976790] text-xs">⏰</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#976790] text-sm">11.30pg - 3.30ptg</p>
                <p className="text-xs text-[#976790]/70">Tempoh Majlis</p>
              </div>
            </div>
          </div>

          {/* Simple Calendar - Faded Purple Theme */}
          <div className="bg-[#976790]/10 rounded-lg p-3 border border-[#976790]/20">
            <p className="font-semibold text-[#976790] mb-2 text-center text-sm">Januari 2026</p>
            <div className="grid grid-cols-7 gap-0.5 text-xs">
              {['A', 'I', 'S', 'R', 'K', 'J', 'S'].map(day => (
                <div key={day} className="text-center p-1 font-semibold text-[#976790]/60 text-xs">{day}</div>
              ))}
              {Array.from({length: 4}, (_, i) => (
                <div key={`empty-${i}`} className="text-center p-1"></div>
              ))}
              {Array.from({length: 31}, (_, i) => (
                <div 
                  key={i} 
                  className={`text-center p-1 rounded transition-all text-xs ${
                    i + 1 === 24 
                      ? 'bg-[#976790] text-white font-bold shadow-sm' 
                      : 'text-[#976790] hover:bg-[#976790]/20'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}