import React from 'react';
import { Sparkles } from 'lucide-react';

interface SecretMessageToastProps {
  message: string | null;
  onClose: () => void;
}

export const SecretMessageToast: React.FC<SecretMessageToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-auto select-none">
      <div 
        onClick={onClose}
        className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#2D2A26] border border-[#433E39] text-[#FAF7F2] shadow-xl cursor-pointer"
      >
        <div className="p-1 rounded-full bg-[#433E39] text-[#C9A27E]">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        <div>
          <p className="text-[11px] text-[#A89078] font-medium">Balon Terbuka • Harapan Untuk Matt:</p>
          <p className="text-xs sm:text-sm font-semibold text-white">{message}</p>
        </div>
      </div>
    </div>
  );
};
