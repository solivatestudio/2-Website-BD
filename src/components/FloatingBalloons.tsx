import React, { useState, useEffect, useRef } from 'react';
import { BalloonItem } from '../types';
import { BALLOON_MESSAGES } from '../data/birthdayData';

interface FloatingBalloonsProps {
  onBalloonPopped: (message: string, x: number, y: number) => void;
}

const PASTEL_BALLOON_COLORS = [
  { fill: '#E2A699', highlight: '#F0C2B8', ribbon: '#C98B7C' }, // Soft Terracotta Blush
  { fill: '#C6D2BE', highlight: '#DFE8DA', ribbon: '#A6B59C' }, // Soft Sage Green
  { fill: '#F4E8C1', highlight: '#FFF5D9', ribbon: '#D8C698' }, // Calm Butter Yellow
  { fill: '#DCCBB5', highlight: '#EDE3D5', ribbon: '#BCA88F' }, // Warm Sand
  { fill: '#D0C4D8', highlight: '#E5DFEA', ribbon: '#B2A3BD' }, // Muted Lavender
];

export const FloatingBalloons: React.FC<FloatingBalloonsProps> = ({ onBalloonPopped }) => {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const initialBalloons: BalloonItem[] = Array.from({ length: 6 }, (_, i) => ({
      id: `balloon-${i}-${Date.now()}`,
      x: 12 + Math.random() * 76,
      y: 85 + Math.random() * 60,
      speed: 0.1 + Math.random() * 0.14,
      scale: 0.8 + Math.random() * 0.25,
      color: JSON.stringify(PASTEL_BALLOON_COLORS[i % PASTEL_BALLOON_COLORS.length]),
      popped: false,
      message: BALLOON_MESSAGES[Math.floor(Math.random() * BALLOON_MESSAGES.length)],
    }));
    setBalloons(initialBalloons);
  }, []);

  useEffect(() => {
    let lastTime = performance.now();

    const updatePosition = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 16.66;
      lastTime = currentTime;

      setBalloons((prev) =>
        prev.map((b) => {
          if (b.popped) return b;
          let newY = b.y - b.speed * delta;
          let newX = b.x + Math.sin(currentTime / 1000 + parseFloat(b.id.split('-')[1])) * 0.05 * delta;
          
          if (newY < -20) {
            newY = 105 + Math.random() * 15;
            newX = 10 + Math.random() * 80;
          }

          return {
            ...b,
            x: newX,
            y: newY,
          };
        })
      );

      animRef.current = requestAnimationFrame(updatePosition);
    };

    animRef.current = requestAnimationFrame(updatePosition);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handlePop = (balloon: BalloonItem, event: React.MouseEvent | React.TouchEvent) => {
    if (balloon.popped) return;
    event.stopPropagation();

    const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : (event as React.MouseEvent).clientY;

    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b))
    );

    onBalloonPopped(balloon.message, clientX, clientY);

    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) => {
          if (b.id === balloon.id) {
            const randomColor = PASTEL_BALLOON_COLORS[Math.floor(Math.random() * PASTEL_BALLOON_COLORS.length)];
            return {
              id: `balloon-${Date.now()}-${Math.random()}`,
              x: 12 + Math.random() * 76,
              y: 108,
              speed: 0.1 + Math.random() * 0.14,
              scale: 0.8 + Math.random() * 0.25,
              color: JSON.stringify(randomColor),
              popped: false,
              message: BALLOON_MESSAGES[Math.floor(Math.random() * BALLOON_MESSAGES.length)],
            };
          }
          return b;
        })
      );
    }, 3000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {balloons.map((b) => {
        if (b.popped) return null;
        const colorObj = JSON.parse(b.color);

        return (
          <div
            key={b.id}
            onClick={(e) => handlePop(b, e)}
            onTouchStart={(e) => handlePop(b, e)}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: `scale(${b.scale}) translate(-50%, -50%)`,
            }}
            className="absolute pointer-events-auto cursor-pointer group transition-transform hover:scale-105 active:scale-95 duration-150"
            title="Sentuh untuk meletupkan & buka pesan!"
          >
            <div className="relative flex flex-col items-center">
              <svg width="56" height="68" viewBox="0 0 56 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Balloon Body */}
                <ellipse cx="28" cy="26" rx="24" ry="26" fill={colorObj.fill} className="drop-shadow-sm" />
                {/* Soft highlight */}
                <ellipse cx="18" cy="16" rx="6" ry="9" transform="rotate(-20 18 16)" fill={colorObj.highlight} fillOpacity="0.75" />
                {/* Knot */}
                <path d="M25 51 L31 51 L29 55 L27 55 Z" fill={colorObj.fill} />
                {/* Ribbon string */}
                <path
                  d="M28 55 C 28 60, 23 63, 28 67"
                  stroke={colorObj.ribbon}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              <div className="absolute -bottom-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-2 py-0.5 rounded bg-[#2D2A26] text-[#FAF7F2] text-[10px] font-medium shadow pointer-events-none">
                🎈 Sentuh!
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
