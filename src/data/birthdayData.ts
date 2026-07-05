import { BirthdayProfile, BirthdayWish } from '../types';

export const INITIAL_PROFILE: BirthdayProfile = {
  name: 'Matt',
  age: 25, // default, editable in UI
  date: '5 Juli 2026', // clean editable birthday date
  tagline: 'A celebration of another wonderful year of growth, joy, and inspiration.',
};

export const INITIAL_WISHES: BirthdayWish[] = [
  {
    id: '1',
    category: 'Doa Utama',
    title: 'Sebuah Harapan di Usia Baru',
    message: 'Selamat ulang tahun, Matt! Semoga bertambahnya usia ini membawa ketenangan batin, kebahagiaan yang melimpah, dan segala langkahmu selalu dimudahkan.',
    author: 'Sahabat Terdekat',
    relationship: 'Teman',
  },
  {
    id: '2',
    category: 'Karier & Sukses',
    title: 'Pencapaian & Karya Gemilang',
    message: 'Semoga setiap proyek dan impian yang sedang dirintis tahun ini membuahkan hasil terbaik. Teruslah menginspirasi dengan dedikasi dan karyamu!',
    author: 'Rekan & Keluarga',
    relationship: 'Keluarga',
  },
  {
    id: '3',
    category: 'Kesehatan',
    title: 'Kesehatan yang Prima',
    message: 'Harapan utama untukmu adalah fisik yang sehat, pikiran yang jernih, serta waktu rilis yang cukup di tengah kesibukan sehari-hari. Take care always!',
    author: 'Kerabat & Sahabat',
    relationship: 'Sahabat',
  },
  {
    id: '4',
    category: 'Kebahagiaan',
    title: 'Momen-momen Penuh Tawa',
    message: 'Semoga dikelilingi oleh orang-orang yang tulus, persahabatan yang erat, dan tawa bahagia yang sederhana setiap harinya. Cheers for Matt!',
    author: 'Lingkungan Terdekat',
    relationship: 'Teman',
  },
];

export const BALLOON_MESSAGES = [
  '🌿 Happy Birthday Matt!',
  '✨ Sukses & Sehat Selalu!',
  '🎂 May your dreams unfold gracefully',
  '🕊️ Damai & bahagia di usia baru',
  '☀️ Cahaya positif setiap hari!',
  '🎉 Cheers to your best year ahead!',
  '💫 Tetap inspiratif & membumi!',
  '🎁 A wonderful celebration for Matt!'
];

