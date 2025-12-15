"use client";

import { FaRegEnvelope } from "react-icons/fa6";

export default function Form() {
  return (
    <div className="flex flex-col items-center group">
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScgP-ftPCHOlpvzTpJmO9yXg3jK94vhHz79s5sCNg7jVxo4Yg/viewform?usp=dialog"
        target="_blank"
        rel="noopener noreferrer"
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
        <FaRegEnvelope className="text-xl text-white" />
      </a>
      <span className="text-xs text-[#5d3e57] mt-2 font-medium">RSVP</span>
    </div>
  );
}