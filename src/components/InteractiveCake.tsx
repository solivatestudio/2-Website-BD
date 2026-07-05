import React, { useState } from 'react';
import { Wind, RotateCcw, Sparkles, Flame } from 'lucide-react';
import { Candle, BirthdayProfile } from '../types';

interface InteractiveCakeProps {
  profile: BirthdayProfile;
  onCandleExtinguished: () => void;
  onAllCandlesBlown: () => void;
  onLightCandle: () => void;
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({
  profile,
  onCandleExtinguished,
  onAllCandlesBlown,
  onLightCandle,
}) => {
  const [candles, setCandles] = useState<Candle[]>([
    { id: 1, x: 20, y: 0, isLit: true },
    { id: 2, x: 35, y: 0, isLit: true },
    { id: 3, x: 50, y: 0, isLit: true },
    { id: 4, x: 65, y: 0, isLit: true },
    { id: 5, x: 80, y: 0, isLit: true },
  ]);

  const [isBlowing, setIsBlowing] = useState(false);

  const litCount = candles.filter((c) => c.isLit).length;

  const handleCandleClick = (id: number) => {
    setCandles((prev) => {
      const next = prev.map((c) => {
        if (c.id === id) {
          const newLitState = !c.isLit;
          if (!newLitState) {
            onCandleExtinguished();
          } else {
            onLightCandle();
          }
          return { ...c, isLit: newLitState };
        }
        return c;
      });

      if (next.every((c) => !c.isLit)) {
        setTimeout(() => {
          onAllCandlesBlown();
        }, 400);
      }
      return next;
    });
  };

  const handleBlowAll = () => {
    if (litCount === 0) return;
    setIsBlowing(true);

    setTimeout(() => {
      setCandles((prev) => prev.map((c) => ({ ...c, isLit: false })));
      setIsBlowing(false);
      onCandleExtinguished();
      setTimeout(() => {
        onAllCandlesBlown();
      }, 350);
    }, 600);
  };

  const handleRelightAll = () => {
    setCandles((prev) => prev.map((c) => ({ ...c, isLit: true })));
    onLightCandle();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#1E1D1A] to-[#2D2A24] text-white shadow-2xl border border-white/10 overflow-hidden">
      {/* Glow ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Title */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Flame className="w-3.5 h-3.5" />
          <span>Interactive Cake • Age {profile.age}</span>
        </div>
        <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
          Make a Wish, {profile.name}!
        </h3>
        <p className="text-xs sm:text-sm text-white/70 mt-2 max-w-sm mx-auto font-normal">
          {litCount > 0
            ? 'Sentuh lilin langsung di layar HP kamu untuk meniupnya satu per satu, atau klik tombol di bawah.'
            : '✨ Semua lilin telah padam! Semoga harapan terindahmu terkabul tahun ini.'}
        </p>
      </div>

      {/* Interactive Cake Stage */}
      <div className="relative w-full max-w-[340px] h-[280px] sm:h-[320px] mx-auto flex flex-col items-center justify-end select-none">
        {/* Wind blowing animation overlay */}
        {isBlowing && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none animate-fade-in">
            <div className="text-4xl sm:text-5xl animate-bounce">💨 🌬️ ✨</div>
          </div>
        )}

        {/* Interactive Candles Row */}
        <div className="relative w-4/5 flex justify-between items-end h-28 mb-[-14px] z-20 px-4">
          {candles.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCandleClick(c.id)}
              className="group relative flex flex-col items-center justify-end p-2 -m-2 touch-manipulation focus:outline-none"
              title={c.isLit ? 'Sentuh untuk meniup!' : 'Sentuh untuk menyalakan'}
            >
              {/* Flame Touch Area */}
              <div className="h-10 flex items-end justify-center mb-1 relative">
                {c.isLit ? (
                  <div className="relative flex flex-col items-center">
                    {/* Golden Glow */}
                    <div className="absolute -inset-3 bg-amber-400/50 rounded-full blur-md animate-pulse"></div>
                    {/* Flame Core */}
                    <div
                      className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-300 to-white rounded-full animate-bounce shadow-lg shadow-amber-500/50"
                      style={{ animationDuration: `${0.8 + c.id * 0.15}s` }}
                    ></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center opacity-60">
                    <span className="text-xs animate-float">💨</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                  </div>
                )}
              </div>

              {/* Candle Stick */}
              <div className="w-3.5 sm:w-4 h-14 rounded-t-sm bg-gradient-to-b from-rose-400 via-pink-400 to-rose-500 border border-white/30 shadow-md flex flex-col justify-around py-1 overflow-hidden">
                <div className="w-full h-1 bg-white/40 transform -rotate-12"></div>
                <div className="w-full h-1 bg-white/40 transform -rotate-12"></div>
                <div className="w-full h-1 bg-white/40 transform -rotate-12"></div>
              </div>
            </button>
          ))}
        </div>

        {/* Modern Minimalist Cake Body */}
        <div className="relative w-full z-10 flex flex-col items-center">
          {/* Top Tier Frosting */}
          <div className="w-56 h-12 bg-gradient-to-b from-[#FFFBEB] to-[#F3E8FF] rounded-t-2xl border-t border-x border-white/60 shadow-inner relative flex justify-around items-end pb-1 overflow-hidden">
            <div className="w-6 h-6 rounded-full bg-rose-400 -mt-3 shadow-xs"></div>
            <div className="w-6 h-6 rounded-full bg-amber-400 -mt-3 shadow-xs"></div>
            <div className="w-6 h-6 rounded-full bg-emerald-400 -mt-3 shadow-xs"></div>
          </div>

          {/* Bottom Tier */}
          <div className="w-72 h-28 bg-gradient-to-b from-[#F3E8FF] via-[#E0E7FF] to-[#EDE9FE] rounded-t-xl rounded-b-3xl border border-white/40 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
            {/* Banner badge */}
            <div className="px-5 py-1.5 rounded-full bg-[#1E1D1A] border border-white/20 text-white font-display font-bold tracking-widest text-xs shadow-md">
              HAPPY {profile.age}th BIRTHDAY
            </div>
            <div className="text-[11px] font-semibold text-[#4C1D95] mt-1 tracking-wider uppercase">
              {profile.name}
            </div>
          </div>

          {/* Cake Stand */}
          <div className="w-80 h-4 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 rounded-full shadow-lg mt-1"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 relative z-20">
        {litCount > 0 ? (
          <button
            onClick={handleBlowAll}
            disabled={isBlowing}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition active:scale-95 cursor-pointer"
          >
            <Wind className={`w-4 h-4 ${isBlowing ? 'animate-spin' : ''}`} />
            <span>Tiup Semua Lilin ({litCount})</span>
          </button>
        ) : (
          <button
            onClick={handleRelightAll}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-300" />
            <span>Nyalakan Kembali</span>
          </button>
        )}

        <button
          onClick={onAllCandlesBlown}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#1E1D1A] hover:bg-zinc-100 font-bold text-sm shadow-md transition active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Buka Pesta Kejutan</span>
        </button>
      </div>
    </div>
  );
};

