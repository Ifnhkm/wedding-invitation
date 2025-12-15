"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Dialog({
  isOpen,
  onClose,
  title,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-center pb-16 p-4 pointer-events-none">
      {/* Backdrop - closes dialog when clicked */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Dialog Container - doesn't close when clicked inside */}
      <div 
        className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#976790]/20 w-full max-w-xs max-h-[60vh] overflow-hidden pointer-events-auto transform transition-all duration-300 mb-2"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Content */}
        <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(60vh)' }}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}