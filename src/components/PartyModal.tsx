import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { BirthdayProfile } from '../types';

interface PartyModalProps {
  isOpen: boolean;
  profile: BirthdayProfile;
  onClose: () => void;
  onTriggerMoreFireworks: () => void;
}

export const PartyModal: React.FC<PartyModalProps> = ({
  isOpen,
  profile,
  onClose,
  onTriggerMoreFireworks,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1D1A]/70 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-md bg-white border border-[#E0DCD3] rounded-3xl p-6 sm:p-10 text-center shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F3EFE6] text-[#736E64] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Festive emblem */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 animate-bounce">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <span className="text-xs uppercase tracking-widest font-bold text-[#D97706] block mb-1">
          Make a Wish • Age {profile.age}
        </span>

        <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E1D1A] mb-3">
          Happy Birthday, <span className="bg-gradient-to-r from-[#D97706] to-[#E11D48] bg-clip-text text-transparent">{profile.name}!</span>
        </h3>

        <p className="text-sm sm:text-base text-[#545048] leading-relaxed mb-8 font-normal">
          Semua lilin perayaan ke-{profile.age} telah ditiup. Semoga setiap langkahmu selalu dipenuhi kebahagiaan, kesehatan, dan impian yang terwujud! 🎉✨
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onTriggerMoreFireworks}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D97706] to-[#E11D48] hover:from-[#B45309] hover:to-[#BE123C] text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Kembang Api Lagi!</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-[#E0DCD3] hover:bg-[#F3EFE6] text-[#1E1D1A] font-bold text-sm transition cursor-pointer"
          >
            Tutup & Lihat Doa
          </button>
        </div>
      </div>
    </div>
  );
};

