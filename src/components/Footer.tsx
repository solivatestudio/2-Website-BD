import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { BirthdayProfile } from '../types';

interface FooterProps {
  profile: BirthdayProfile;
  onTriggerParty: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onTriggerParty, onScrollToTop }) => {
  return (
    <footer className="mt-20 border-t border-[#EBE4DC] bg-[#FAF7F2] py-14 px-4 text-center select-none">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-4">
        <div 
          onClick={onScrollToTop}
          className="w-10 h-10 rounded-full bg-[#EFE8DF] border border-[#DCD3C7] flex items-center justify-center text-[#8C6D4F] cursor-pointer hover:scale-110 transition-transform"
          title="Kembali ke Atas"
        >
          <ArrowUp className="w-4 h-4 text-[#694E33]" />
        </div>

        <h4 className="font-serif text-2xl font-bold text-[#2D2A26]">
          Happy {profile.age}th Birthday, <span className="italic">{profile.name}</span>.
        </h4>

        <p className="text-xs sm:text-sm text-[#736B62] max-w-sm font-light leading-relaxed">
          Dirancang dengan palet warna editorial yang lembut, ringan, dan responsif untuk merayakan hari istimewamu.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={onTriggerParty}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full border border-[#DCD3C7] bg-[#F2ECE4] hover:bg-[#EAE2D8] text-[#5C544B] text-xs font-medium transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A27E]" />
            <span>Rayakan Pesta Lagi</span>
          </button>
        </div>

        <div className="w-16 h-px bg-[#DCD3C7] my-4"></div>

        <p className="text-[11px] text-[#9E958A] tracking-wide">
          CELEBRATING {profile.name.toUpperCase()} • {profile.date}
        </p>
      </div>
    </footer>
  );
};
