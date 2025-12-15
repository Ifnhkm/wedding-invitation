"use client";

import { useRef } from "react";

export default function YouTubeVideo() {
  const playerRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="bg-gradient-to-br from-[#976790]/20 to-[#7a5274]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#976790]/30 shadow-lg">
      <div className="space-y-2">
        <div className="text-center">
          <h3 className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider mb-1">
            Muzik Latar
          </h3>
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wide italic">
            Muzik akan dimainkan secara automatik
          </p>
        </div>
        
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-[#976790]/10">
          <iframe
            ref={playerRef}
            className="w-full h-full"
            src="https://www.youtube.com/embed/Qa4ugJ42CwE?autoplay=1&controls=1&modestbranding=1&rel=0"
            title="Wedding Background Music"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
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