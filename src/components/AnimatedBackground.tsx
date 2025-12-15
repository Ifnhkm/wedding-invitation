import Image from "next/image";
import background from "@/assets/background.jpg";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 w-full max-w-md mx-auto">
      <div className="relative w-full h-full">
        <Image
          src={background}
          alt="Floral background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-white/30" />

        {/* Glittering Animation Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Star sparkles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div className="text-white opacity-80 drop-shadow-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          ))}

          {/* Small flower sparkles */}
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={`flower-${i}`}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className="text-white opacity-70 drop-shadow-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
            </div>
          ))}

          {/* Heart sparkles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${2.5 + Math.random() * 1.5}s`
              }}
            >
              <div className="text-pink-200 opacity-80 drop-shadow-lg">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          ))}

          {/* Diamond sparkles */}
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={`diamond-${i}`}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2.2}s`,
                animationDuration: `${2.8 + Math.random() * 1.5}s`
              }}
            >
              <div className="text-cyan-200 opacity-75 drop-shadow-lg">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 2.5L19.5 7 12 9.5 4.5 7 12 4.5z" />
                </svg>
              </div>
            </div>
          ))}

          {/* Golden stars */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`gold-star-${i}`}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div className="text-yellow-300 opacity-90 drop-shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}