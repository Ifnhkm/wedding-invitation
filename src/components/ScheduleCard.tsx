export default function ScheduleCard() {
    return (
        <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 border border-[#976790]/30 shadow-lg">
            <div className="space-y-6 text-center">
                <div className="pt-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#976790]/40 to-transparent"></div>
                </div>
                <div className="text-center">
                    <h3 className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider mb-6">
                       ATUR CARA MAJLIS
                    </h3>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <p className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider">
                            11.30 pagi
                        </p>
                        <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#976790]">
                            Tetamu hadir
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider">
                            12.30 tengah hari
                        </p>
                        <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#976790]">
                            Ketibaan pasangan pengantin
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-base font-['Cormorant_Garamond'] font-semibold text-[#7a5274] tracking-wider">
                            3.30 petang
                        </p>
                        <p className="text-sm font-['Cormorant_Garamond'] font-light text-[#976790]">
                            Majlis tamat
                        </p>
                    </div>
                </div>

                <div className="pt-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#976790]/40 to-transparent"></div>
                </div>
            </div>
        </div>
    );
}