export default function InvitationCard() {
  return (
    <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 border border-[#976790]/30 shadow-lg">
      <div className="space-y-6 text-center">
        {/* Opening Text */}
        <div className="space-y-1">
          <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#7a5274] tracking-wide leading-relaxed">
            Dengan izin dan limpah kurniaNya, kami
          </p>
        </div>

        {/* Parents Names */}
        <div className="space-y-2">
          <p className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider">
            MOHD BASHARUDDIN BIN SAID
          </p>
          <p className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider">
            ZABIDAH BINTI MAT YUNUS
          </p>
        </div>

        {/* Invitation Text */}
        <div className="space-y-1">
          <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#7a5274] tracking-wide leading-relaxed">
            Dengan penuh kesyukuran ke hadrat Ilahi, ingin mengundang
          </p>
        </div>

        {/* Titles */}
        <div className="space-y-1">
          <p className="text-sm font-['Cormorant_Garamond'] font-semibold text-[#976790] tracking-wide italic">
            Dato / Datin / Tuan / Puan / Encik / Cik sekeluarga
          </p>
        </div>

        {/* Purpose */}
        <div className="space-y-1">
          <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#7a5274] tracking-wide leading-relaxed">
            ke Majlis Perkahwinan puteri kami yang dikasihi
          </p>
        </div>

        {/* Bride & Groom Names */}
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider">
              Nur Amirah binti Mohd Basharuddin
            </p>
            <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wide">
              Puteri kami
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-3">
            <div className="h-px w-12 bg-[#976790]/30"></div>
            <span className="text-sm font-['Cormorant_Garamond'] font-light text-[#976790]">
              dengan
            </span>
            <div className="h-px w-12 bg-[#976790]/30"></div>
          </div>
          
          <div className="space-y-1">
            <p className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider">
              Mohamad Yaazidraj bin Mohamad Naraj
            </p>
            <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#976790] tracking-wide">
              Pilhan hatinya
            </p>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="pt-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#976790]/40 to-transparent"></div>
        </div>

        {/* Thank You Note */}
        <div className="pt-2">
          <p className="text-xs font-['Cormorant_Garamond'] font-light text-[#7a5274]/80 tracking-wide italic">
            Kehadiran dan doa restu tuan/puan amat dihargai
          </p>
        </div>
      </div>
    </div>
  );
}