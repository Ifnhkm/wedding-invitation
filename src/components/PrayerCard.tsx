export default function PrayerCard() {
  return (
    <div className="bg-gradient-to-br from-[#976790]/20 to-[#7a5274]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#976790]/30 shadow-lg">
      <div className="space-y-6 text-center">
        <div className="text-center">
          <h3 className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider mb-4">
            DOA & UCAPAN
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#7a5274] tracking-wide leading-relaxed">
              <span className="font-semibold">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
              <br />
              Dengan nama Allah yang Maha Pemurah lagi Maha Penyayang
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#7a5274] tracking-wide leading-relaxed">
              Ya Allah, kurniakanlah keberkatan kepada pengantin kami Yaazid dan Amirah dalam menjalani kehidupan berumahtangga.
            </p>
            
            <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#7a5274] tracking-wide leading-relaxed">
              Jadikanlah rumah tangga mereka sebagai tempat ketenangan, kasih sayang, dan rahmat-Mu.
            </p>
            
            <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#7a5274] tracking-wide leading-relaxed">
              Lindungilah mereka dari segala ujian dan cabaran, serta kurniakan zuriat yang soleh dan solehah.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wide italic">
              رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
            </p>
            <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wide">
              &quot;Wahai Tuhan kami, kurniakanlah kepada kami pasangan kami dan zuriat kami sebagai penyejuk mata, dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.&quot; 
              <br />
              (Surah Al-Furqan, 25:74)
            </p>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="pt-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#976790]/40 to-transparent"></div>
        </div>

        {/* Closing Prayer */}
        <div className="space-y-2">
          <p className="text-sm font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wide">
            آمِيْن يَا رَبَّ العَالَمِيْن
          </p>
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wide italic">
            Kabulkanlah doa kami wahai Tuhan semesta alam
          </p>
        </div>
      </div>
    </div>
  );
}