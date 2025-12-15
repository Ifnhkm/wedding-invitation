"use client";

import { FaPhone } from "react-icons/fa6";
import { useState } from "react";
import Dialog from "./Dialog";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);

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
          <FaPhone className="text-xl text-white" />
        </button>
        <span className="text-xs text-[#5d3e57] mt-2 font-medium">
          Hubungi
        </span>
      </div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-3">
          {/* Header - Faded Purple Theme */}
          <div className="bg-gradient-to-br from-[#976790]/20 to-[#976790]/30 rounded-xl p-3 text-[#976790] text-center shadow-lg border border-[#976790]/20">
            <p className="text-xs opacity-80 mb-1">Untuk sebarang pertanyaan</p>
            <p className="text-sm font-semibold">Hubungi Kami</p>
          </div>

          {/* Contacts - Single Column Layout */}
          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
            {/* Contact 1 */}
            <a
              href="https://wa.link/h9f25q"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2 bg-[#976790]/10 rounded-lg border border-[#976790]/20 hover:bg-[#976790]/20 transition-all duration-300 cursor-pointer hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#976790]/30"
            >
              <div className="w-8 h-8 rounded-full bg-[#976790]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[#976790] font-semibold text-xs">Z</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#976790] text-xs">Zabidah (Nor)</p>
                <p className="text-[#976790]/70 text-[10px]">Ibu Pengantin</p>
                <p className="text-[#976790] font-medium text-xs">
                  017-946 1445
                </p>
              </div>
            </a>

            {/* Contact 2 */}
            <a
              href="https://wa.link/edavmx"
              className="flex items-center space-x-3 p-2 bg-[#976790]/10 rounded-lg border border-[#976790]/20 hover:bg-[#976790]/20 transition-all duration-300 cursor-pointer hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#976790]/30"
            >
              <div className="w-8 h-8 rounded-full bg-[#976790]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[#976790] font-semibold text-xs">N</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#976790] text-xs">Nani</p>
                <p className="text-[#976790]/70 text-[10px]">Kakak Pengantin</p>
                <p className="text-[#976790] font-medium text-xs">
                  010-400 3551
                </p>
              </div>
            </a>

            {/* Contact 3 */} 
            <a
              href="https://wa.link/rdn6yy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2 bg-[#976790]/10 rounded-lg border border-[#976790]/20 hover:bg-[#976790]/20 transition-all duration-300 cursor-pointer hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#976790]/30"
            >
              <div className="w-8 h-8 rounded-full bg-[#976790]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[#976790] font-semibold text-xs">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#976790] text-xs">Azri</p>
                <p className="text-[#976790]/70 text-[10px]">Abang Pengantin</p>
                <p className="text-[#976790] font-medium text-xs">
                  012-850 8315
                </p>
              </div>
            </a>
          </div>

          {/* Note */}
          <div className="pt-1 border-t border-[#976790]/10">
            <p className="text-[10px] text-[#976790]/60 text-center">
              Klik pada nama untuk menghubungi
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
}