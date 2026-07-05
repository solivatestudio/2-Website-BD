import React, { useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface MusicControllerPillProps {
  isPlayingMusic: boolean;
  isMuted: boolean;
  onToggleMusic: () => void;
  onToggleMute: () => void;
}

export const MusicControllerPill: React.FC<MusicControllerPillProps> = ({
  isPlayingMusic,
  isMuted,
  onToggleMusic,
  onToggleMute,
}) => {
  const [currentTrackName, setCurrentTrackName] = useState<'Kotak Musik Lembut' | 'Starlight Harapan'>('Kotak Musik Lembut');

  const switchTrack = () => {
    if (currentTrackName === 'Kotak Musik Lembut') {
      setCurrentTrackName('Starlight Harapan');
      soundEngine.setTrack('starlight');
    } else {
      setCurrentTrackName('Kotak Musik Lembut');
      soundEngine.setTrack('gentle');
    }

    if (isPlayingMusic) {
      soundEngine.stopMusic();
      soundEngine.startMusic();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full bg-[#FAF7F2]/95 border border-[#DCD3C7] shadow-lg backdrop-blur-md transition-all">
      <button
        onClick={onToggleMusic}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition cursor-pointer ${
          isPlayingMusic
            ? 'bg-[#2D2A26] text-white shadow-xs'
            : 'bg-[#EFE8DF] text-[#736B62] hover:text-[#2D2A26]'
        }`}
        title={isPlayingMusic ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
      >
        <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'animate-bounce' : ''}`} />
      </button>

      <div className="hidden sm:flex flex-col pr-2 cursor-pointer select-none" onClick={switchTrack} title="Klik untuk mengganti melodi latar">
        <span className="text-[10px] text-[#8C6D4F] font-semibold tracking-wider uppercase">
          Melodi Ulang Tahun
        </span>
        <span className="text-xs font-medium text-[#2D2A26] truncate max-w-[120px]">
          {currentTrackName}
        </span>
      </div>

      <div className="h-5 w-px bg-[#DCD3C7] hidden sm:block"></div>

      <button
        onClick={onToggleMute}
        className="p-1.5 rounded-full hover:bg-[#EFE8DF] text-[#736B62] hover:text-[#2D2A26] transition cursor-pointer"
        title={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5 text-[#694E33]" />}
      </button>
    </div>
  );
};
