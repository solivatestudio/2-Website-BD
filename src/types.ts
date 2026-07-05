export interface BirthdayProfile {
  name: string;
  age: number;
  date: string;
  tagline: string;
}

export interface BirthdayWish {
  id: string;
  category: 'Doa Utama' | 'Karier & Sukses' | 'Kesehatan' | 'Kebahagiaan';
  title: string;
  message: string;
  author: string;
  relationship: string;
}

export interface Candle {
  id: number;
  x: number;
  y: number;
  isLit: boolean;
}

export interface BalloonItem {
  id: string;
  x: number;
  y: number;
  speed: number;
  scale: number;
  color: string;
  popped: boolean;
  message: string;
}

