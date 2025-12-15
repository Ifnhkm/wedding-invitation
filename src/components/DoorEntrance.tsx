"use client";

interface DoorEntranceProps {
  onEnter: () => void;
  isOpening: boolean;
}

export default function DoorEntrance({ onEnter, isOpening }: DoorEntranceProps) {
  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-[#f8f4f7] to-[#f0e8ef] z-50 overflow-hidden touch-manipulation"
      onClick={onEnter}
      onTouchStart={onEnter}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle overlapping circular patterns with purple shading */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64">
          {/* First overlapping circle */}
          <div className="absolute w-48 h-48 bg-gradient-to-br from-[#e8d0e2]/15 to-[#d4b5d0]/20 rounded-full blur-sm"></div>
          {/* Second overlapping circle */}
          <div className="absolute top-8 left-8 w-40 h-40 bg-gradient-to-tr from-[#976790]/10 to-[#7a5274]/15 rounded-full blur-sm"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48">
          {/* First overlapping circle */}
          <div className="absolute w-36 h-36 bg-gradient-to-bl from-[#e8d0e2]/15 to-[#d4b5d0]/20 rounded-full blur-sm"></div>
          {/* Second overlapping circle */}
          <div className="absolute top-6 right-6 w-28 h-28 bg-gradient-to-tl from-[#976790]/10 to-[#7a5274]/15 rounded-full blur-sm"></div>
        </div>
      </div>

      {/* Door Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Ornate Frame Around Door */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-96 h-112">
            {/* Frame corners */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#976790]/30"></div>
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#976790]/30"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#976790]/30"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#976790]/30"></div>
            
            {/* Frame text */}
            <div className="absolute -top-12 left-0 right-0 text-center">
              <p className="text-xl font-['Cormorant_Garamond'] text-[#976790]/60 italic font-semibold tracking-wider">
                Walimatulurus
              </p>
            </div>
          </div>
        </div>

        {/* Door */}
        <div className="relative w-80 h-96">
          {/* Door Left Panel */}
          <div 
            className={`absolute left-0 top-0 w-40 h-full bg-gradient-to-br from-[#f8f4f7] to-[#e8d8e4] border-2 border-[#976790]/20 shadow-lg transition-all duration-1000 ease-out ${isOpening ? '-translate-x-full -rotate-12' : ''}`}
            style={{ transformOrigin: 'left center' }}
          >
            {/* Ornate left panel design */}
            <div className="absolute inset-4 border border-[#976790]/10 rounded-lg"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#976790]/5 rounded-full"></div>
            
            {/* Door Handle Left */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <div className="relative">
                <div className="w-3 h-10 bg-gradient-to-b from-[#b87aae] to-[#976790] rounded-full shadow-md"></div>
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-[#976790] rounded-full"></div>
              </div>
            </div>
            
            {/* Left Side A with decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative text-center">
                {/* Decorative corner elements */}
                <div className="absolute -top-8 -left-8 w-6 h-6 border-t border-l border-[#976790]/20"></div>
                <div className="absolute -top-8 -right-8 w-6 h-6 border-t border-r border-[#976790]/20"></div>
                <div className="absolute -bottom-8 -left-8 w-6 h-6 border-b border-l border-[#976790]/20"></div>
                <div className="absolute -bottom-8 -right-8 w-6 h-6 border-b border-r border-[#976790]/20"></div>
                
                <div className="text-8xl font-['Cormorant_Garamond'] font-normal text-[#7a5274] italic tracking-wider drop-shadow-sm">
                  A
                </div>
              </div>
            </div>
          </div>

          {/* Door Right Panel */}
          <div 
            className={`absolute right-0 top-0 w-40 h-full bg-gradient-to-bl from-[#f8f4f7] to-[#e8d8e4] border-2 border-[#976790]/20 shadow-lg transition-all duration-1000 ease-out ${isOpening ? 'translate-x-full rotate-12' : ''}`}
            style={{ transformOrigin: 'right center' }}
          >
            {/* Ornate right panel design */}
            <div className="absolute inset-4 border border-[#976790]/10 rounded-lg"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#976790]/5 rounded-full"></div>
            
            {/* Door Handle Right */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
              <div className="relative">
                <div className="w-3 h-10 bg-gradient-to-b from-[#b87aae] to-[#976790] rounded-full shadow-md"></div>
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-[#976790] rounded-full"></div>
              </div>
            </div>
            
            {/* Right Side Y with decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative text-center">
                {/* Decorative corner elements */}
                <div className="absolute -top-8 -left-8 w-6 h-6 border-t border-l border-[#976790]/20"></div>
                <div className="absolute -top-8 -right-8 w-6 h-6 border-t border-r border-[#976790]/20"></div>
                <div className="absolute -bottom-8 -left-8 w-6 h-6 border-b border-l border-[#976790]/20"></div>
                <div className="absolute -bottom-8 -right-8 w-6 h-6 border-b border-r border-[#976790]/20"></div>
                
                <div className="text-8xl font-['Cormorant_Garamond'] font-normal text-[#7a5274] italic tracking-wider drop-shadow-sm">
                  Y
                </div>
              </div>
            </div>
          </div>

          {/* Door Divider Line (Center) */}
          {!isOpening && (
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#976790]/30 to-transparent"></div>
          )}

          {/* Heart/Love symbol in the middle */}
          {!isOpening && (
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <svg className="w-8 h-8 text-[#976790]/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          )}
        </div>

        {/* Tap Instruction */}
        <div className="absolute bottom-16 left-0 right-0 text-center px-4">
          <div className={`transition-all duration-500 ${isOpening ? 'opacity-0 translate-y-4' : 'opacity-100'}`}>
            <p className="text-base font-['Cormorant_Garamond'] text-[#7a5274] mb-4 italic">
              {isOpening ? 'Membuka...' : 'Ketuk Pintu untuk Masuk'}
            </p>
          </div>
        </div>
      </div>

      {/* Smooth Light Effect When Opening */}
      {isOpening && (
        <>
          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#f8f4f7]/0 via-[#f8f4f7]/40 to-[#f0e8ef]/0 transition-all duration-1000"
            style={{ animation: 'fadeInOut 2s ease-in-out forwards' }}
          />
          
          {/* Light rays effect */}
          <div 
            className="absolute inset-0 opacity-0"
            style={{ 
              animation: 'lightRays 2s ease-in-out forwards',
              background: 'radial-gradient(circle at center, rgba(248,244,247,0.8) 0%, rgba(248,244,247,0) 70%)'
            }}
          />
          
          {/* Glowing door opening effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-80 h-96 opacity-0"
              style={{
                animation: 'doorGlow 2s ease-in-out forwards',
                background: 'radial-gradient(ellipse at center, rgba(248,244,247,0.6) 0%, rgba(248,244,247,0) 60%)'
              }}
            />
          </div>
        </>
      )}

      {/* Keyframes for smooth animations */}
      <style jsx global>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes lightRays {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          30% {
            opacity: 0.4;
            transform: scale(1);
          }
          70% {
            opacity: 0.4;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }

        @keyframes doorGlow {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          30% {
            opacity: 0.5;
            transform: scale(1);
          }
          70% {
            opacity: 0.5;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}