import React from 'react';
import { Sparkles, Gift, Cake, ArrowDown, Calendar as CalendarIcon, Heart, Crown, Edit3 } from 'lucide-react';
import { BirthdayProfile } from '../types';

interface HeroSectionProps {
  profile: BirthdayProfile;
  onScrollToCake: () => void;
  onScrollToWishes: () => void;
  onTriggerParty: () => void;
  onOpenEditProfile: () => void;
}

// Helper to parse day number and month string from date
function parseBirthdayDate(dateStr: string) {
  const dayMatch = dateStr.match(/\b([1-9]|[12]\d|3[01])\b/);
  const day = dayMatch ? parseInt(dayMatch[1], 10) : 5;
  
  const monthStr = dateStr.replace(/\b([1-9]|[12]\d|3[01])\b/, '').trim();
  const monthYear = monthStr.length > 0 ? monthStr : 'Juli 2026';
  
  return { day, monthYear };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onScrollToCake,
  onScrollToWishes,
  onTriggerParty,
  onOpenEditProfile,
}) => {
  const { day: bdayDay, monthYear } = parseBirthdayDate(profile.date);

  // Generate a realistic 31-day calendar layout with offset starting day (e.g. Wednesday)
  const startOffset = 2; // Starts on Wednesday
  const totalDays = 31;
  const calendarCells: (number | null)[] = [];
  
  for (let i = 0; i < startOffset; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    calendarCells.push(d);
  }

  return (
    <section id="hero" className="relative pt-6 sm:pt-12 pb-12 px-4 max-w-5xl mx-auto text-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-gradient-to-tr from-[#F59E0B]/20 via-[#E11D48]/15 to-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }}></div>

      {/* Editable Milestone Pill */}
      <div 
        onClick={onOpenEditProfile}
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 border border-[#E0DCD3] shadow-sm hover:border-[#D97706] text-[#545048] text-xs font-bold tracking-wider uppercase mb-6 cursor-pointer transition duration-200 group"
        title="Klik untuk mengubah Nama, Tanggal, dan Usia"
      >
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <span className="text-[#1E1D1A] group-hover:text-[#D97706] transition-colors">Perayaan Spesial Ulang Tahun</span>
        <span className="text-[#D97706] font-extrabold">•</span>
        <span className="flex items-center gap-1 text-zinc-600 underline decoration-dotted">
          Edit Info <Edit3 className="w-3 h-3" />
        </span>
      </div>

      {/* Focused Main Title: Name, Age, Birth Date */}
      <div className="mb-8">
        <div className="inline-block px-4 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-500/20 text-[#D97706] font-display font-extrabold text-sm sm:text-base tracking-widest uppercase mb-3">
          👑 Ulang Tahun Ke-{profile.age}
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-[#1E1D1A] tracking-tight leading-[1.05] mb-4">
          Happy Birthday, <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-[#D97706] via-[#E11D48] to-[#7C3AED] bg-clip-text text-transparent inline-block">
            {profile.name}!
          </span>
          <span className="inline-block ml-2 sm:ml-3 animate-bounce" style={{ animationDuration: '2s' }}>🎉</span>
        </h1>

        <div className="flex items-center justify-center gap-2 text-base sm:text-xl font-bold text-[#545048]">
          <CalendarIcon className="w-5 h-5 text-[#E11D48]" />
          <span>Tanggal Lahir: <strong className="text-[#1E1D1A] underline decoration-amber-400 decoration-2 underline-offset-4">{profile.date}</strong></span>
        </div>
      </div>

      {/* Aesthetic Calendar Illustration Centerpiece */}
      <div className="my-8 sm:my-12 max-w-lg mx-auto">
        <div className="relative bg-[#FFFDF9] border-2 border-[#E8E4DB] rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 p-5 sm:p-7 overflow-hidden text-left">
          {/* Decorative Top Spiral Binding Rings */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#EAE6DF] to-transparent flex justify-around items-center px-6">
            {[...Array(7)].map((_, idx) => (
              <div key={idx} className="w-4 h-6 -mt-3 rounded-full bg-gradient-to-b from-zinc-400 via-zinc-200 to-zinc-500 border border-zinc-600 shadow-sm"></div>
            ))}
          </div>

          {/* Calendar Header Bar */}
          <div className="mt-4 pb-4 border-b border-[#EAE6DF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D97706] to-[#E11D48] flex items-center justify-center text-white shadow-md">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#1E1D1A] uppercase tracking-wide">
                  {monthYear}
                </h3>
                <p className="text-[11px] font-semibold text-[#8C6D4F]">Kalender Perayaan Hari Spesial</p>
              </div>
            </div>

            <div 
              onClick={onTriggerParty}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-800 text-xs font-bold cursor-pointer hover:bg-amber-200 transition"
              title="Klik untuk menyalakan kembang api!"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Hari Ultah ke-{profile.age}!</span>
            </div>
          </div>

          {/* Days of Week Row */}
          <div className="grid grid-cols-7 gap-1 mt-4 text-center">
            {['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'].map((day, idx) => (
              <div key={day} className={`text-[11px] font-extrabold tracking-wider py-1 ${idx >= 5 ? 'text-rose-600' : 'text-[#736E64]'}`}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Number Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mt-2">
            {calendarCells.map((cellNum, index) => {
              if (cellNum === null) {
                return <div key={`empty-${index}`} className="h-9 sm:h-11 rounded-xl bg-zinc-50/50"></div>;
              }

              const isBirthday = cellNum === bdayDay;

              return (
                <div
                  key={cellNum}
                  onClick={isBirthday ? onTriggerParty : undefined}
                  className={`relative h-9 sm:h-11 rounded-xl flex flex-col items-center justify-center font-display text-xs sm:text-sm transition select-none ${
                    isBirthday
                      ? 'bg-gradient-to-br from-[#D97706] via-[#E11D48] to-[#9333EA] text-white font-black shadow-lg shadow-rose-500/30 scale-110 z-10 cursor-pointer ring-4 ring-amber-300/60 animate-pulse'
                      : 'bg-white hover:bg-[#F8F6F0] text-[#1E1D1A] font-semibold border border-[#F0ECE3]'
                  }`}
                  style={isBirthday ? { animationDuration: '3s' } : undefined}
                  title={isBirthday ? `🎈 Hari Ulang Tahun ${profile.name} ke-${profile.age}! Klik untuk kembang api!` : undefined}
                >
                  <span>{cellNum}</span>
                  {isBirthday && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md border border-white animate-bounce">
                      <Crown className="w-3 h-3 text-amber-950 fill-amber-300" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer note inside calendar */}
          <div className="mt-5 pt-3 border-t border-[#EAE6DF] flex items-center justify-between text-xs font-medium text-[#736E64]">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Diberkati pada tanggal <strong className="text-[#1E1D1A]">{bdayDay} {monthYear}</strong></span>
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold border border-rose-200">
              Age {profile.age}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
        <button
          onClick={onScrollToCake}
          className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#1E1D1A] hover:bg-[#33312B] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#1E1D1A]/15 transition transform active:scale-95 cursor-pointer"
        >
          <Cake className="w-4 h-4 text-[#F59E0B]" />
          <span>Tiup Lilin Usia Ke-{profile.age}</span>
          <ArrowDown className="w-4 h-4 text-[#A39E93] ml-0.5" />
        </button>

        <button
          onClick={onTriggerParty}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D97706] to-[#E11D48] hover:from-[#B45309] hover:to-[#BE123C] text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Ledakkan Kembang Api</span>
        </button>

        <button
          onClick={onScrollToWishes}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-[#E0DCD3] hover:bg-[#F3EFE6] text-[#1E1D1A] font-semibold text-sm sm:text-base shadow-xs transition active:scale-95 cursor-pointer"
        >
          <Gift className="w-4 h-4 text-[#E11D48]" />
          <span>Lihat {profile.name}'s Wishes</span>
        </button>
      </div>
    </section>
  );
};


