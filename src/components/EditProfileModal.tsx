import React, { useState } from 'react';
import { X, Check, Calendar, User, Award, Quote } from 'lucide-react';
import { BirthdayProfile } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  profile: BirthdayProfile;
  onSave: (updated: BirthdayProfile) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  profile,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState<number>(profile.age);
  const [date, setDate] = useState(profile.date);
  const [tagline, setTagline] = useState(profile.tagline);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name: name || 'Matt', age: Number(age) || 25, date: date || '5 Juli 2026', tagline });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1D1A]/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-[#E0DCD3] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DB] mb-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-[#1E1D1A]">Atur Info Ulang Tahun</h3>
            <p className="text-xs text-[#736E64]">Sesuaikan nama, tanggal, atau usia yang dirayakan.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F3EFE6] text-[#736E64] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#736E64] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Nama Yang Dirayakan</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E0DCD3] text-[#1E1D1A] focus:outline-none focus:border-[#D97706] text-sm font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#736E64] mb-1.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Ulang Tahun Ke-</span>
              </label>
              <input
                type="number"
                min="1"
                max="120"
                required
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E0DCD3] text-[#1E1D1A] focus:outline-none focus:border-[#D97706] text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#736E64] mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Tanggal Perayaan</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: 5 Juli 2026"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E0DCD3] text-[#1E1D1A] focus:outline-none focus:border-[#D97706] text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#736E64] mb-1.5 flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Catatan / Subjudul</span>
            </label>
            <textarea
              rows={2}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E0DCD3] text-[#1E1D1A] focus:outline-none focus:border-[#D97706] text-sm font-medium resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E4DB]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#E0DCD3] hover:bg-[#F3EFE6] text-[#736E64] text-sm font-bold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E1D1A] hover:bg-[#33312B] text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              <Check className="w-4 h-4 text-amber-400" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

