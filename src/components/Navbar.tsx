import React from 'react';
import { Sparkles, Calendar, Settings } from 'lucide-react';
import { BirthdayProfile } from '../types';

interface NavbarProps {
  profile: BirthdayProfile;
  isPlayingMusic: boolean;
  isMuted: boolean;
  onToggleMusic: () => void;
  onToggleMute: () => void;
  onTriggerConfetti: () => void;
  onOpenEditProfile: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onTriggerConfetti,
  onOpenEditProfile,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F0]/85 backdrop-blur-xl border-b border-[#E8E4DB]/80 px-4 py-3 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Title */}
        <div 
          onClick={() => onScrollToSection('hero')}
          className="flex items-center gap-2.5 cursor-pointer group select-none min-w-0"
        >
          <div className="w-9 h-9 shrink-0 rounded-2xl bg-gradient-to-tr from-[#1E1D1A] to-[#3A3833] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
            <span className="font-display font-bold text-base">{profile.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-display text-base font-bold tracking-tight text-[#1E1D1A] truncate">
              <span className="truncate">{profile.name}'s Day</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#EFECE3] text-[#635E54] text-[10px] font-semibold">
                {profile.age}th
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#736E64] truncate">
              <Calendar className="w-3 h-3 text-[#D97706] shrink-0" />
              <span className="truncate">{profile.date}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenEditProfile}
            className="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-2xl border border-[#E0DCD3] bg-white/80 text-[#545048] hover:bg-white hover:text-[#1E1D1A] text-xs font-semibold shadow-2xs transition active:scale-95 cursor-pointer"
            title="Ubah info tanggal / usia"
          >
            <Settings className="w-4 h-4 sm:mr-1.5 shrink-0 text-[#736E64]" />
            <span className="hidden sm:inline">Edit Info</span>
          </button>

          <button
            onClick={onTriggerConfetti}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[#1E1D1A] to-[#3D3A33] hover:from-[#2D2B26] hover:to-[#4D4940] text-white font-semibold text-xs shadow-md transition active:scale-95 cursor-pointer"
            title="Ledakkan Kembang Api!"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
            <span>Rayakan!</span>
          </button>
        </div>
      </div>
    </header>
  );
};

