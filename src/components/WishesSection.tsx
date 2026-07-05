import React, { useState } from 'react';
import { Plus, Share2, Check, Sparkles, Filter, MessageSquareHeart } from 'lucide-react';
import { BirthdayWish, BirthdayProfile } from '../types';

interface WishesSectionProps {
  profile: BirthdayProfile;
  wishes: BirthdayWish[];
  onAddWish: (newWish: BirthdayWish) => void;
}

const CATEGORIES = ['Semua', 'Doa Utama', 'Karier & Sukses', 'Kesehatan', 'Kebahagiaan'];

export const WishesSection: React.FC<WishesSectionProps> = ({ profile, wishes, onAddWish }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [author, setAuthor] = useState('');
  const [relationship, setRelationship] = useState('Sahabat');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'Doa Utama' | 'Karier & Sukses' | 'Kesehatan' | 'Kebahagiaan'>('Doa Utama');

  const filteredWishes = selectedCategory === 'Semua'
    ? wishes
    : wishes.filter((w) => w.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !message) return;

    const newWish: BirthdayWish = {
      id: `wish-${Date.now()}`,
      category,
      title: title || `Untuk ${profile.name}`,
      message,
      author,
      relationship,
    };

    onAddWish(newWish);
    setAuthor('');
    setTitle('');
    setMessage('');
    setIsModalOpen(false);
  };

  const handleShare = (wish: BirthdayWish) => {
    const text = `🌿 "${wish.title}"\n\n"${wish.message}"\n— ${wish.author} (${wish.relationship})\n\nSelamat Ulang Tahun Ke-${profile.age}, ${profile.name}! ✨`;
    navigator.clipboard.writeText(text);
    setCopiedId(wish.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="wishes" className="py-12 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#D97706] block mb-1">
            Wishes & Messages
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E1D1A] tracking-tight">
            Kartu Doa Untuk {profile.name}
          </h2>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#1E1D1A] hover:bg-[#33312B] text-white font-semibold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F59E0B]" />
          <span>Tulis Ucapan Selamat</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-1.5 text-xs text-[#736E64] font-semibold pr-1 shrink-0">
          <Filter className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Filter:</span>
        </div>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#1E1D1A] text-white shadow-xs'
                : 'bg-white border border-[#E0DCD3] text-[#545048] hover:bg-[#F3EFE6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredWishes.map((w) => (
          <div
            key={w.id}
            className="group flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E4DB] shadow-xs hover:shadow-lg hover:border-[#D1CDC2] transition duration-300 relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F8F6F0] border border-[#E0DCD3] text-[#B45309]">
                  {w.category}
                </span>
                <Sparkles className="w-4 h-4 text-[#F59E0B] opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-[#1E1D1A] mb-2.5 group-hover:text-[#D97706] transition-colors">
                {w.title}
              </h3>

              <p className="text-sm sm:text-base text-[#545048] leading-relaxed font-normal mb-6">
                "{w.message}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0ECE3] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D97706] to-[#E11D48] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-2xs">
                  {w.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-[#1E1D1A] leading-tight">{w.author}</p>
                  <p className="text-[10px] text-[#736E64] font-medium">{w.relationship}</p>
                </div>
              </div>

              <button
                onClick={() => handleShare(w)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F6F0] hover:bg-[#EFECE3] border border-[#E0DCD3] text-xs font-semibold text-[#545048] transition cursor-pointer shrink-0"
                title="Salin Ucapan"
              >
                {copiedId === w.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Bagikan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Wish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1D1A]/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white border border-[#E0DCD3] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-2xl font-bold text-[#1E1D1A] mb-1 flex items-center gap-2">
              <MessageSquareHeart className="w-5 h-5 text-[#D97706]" />
              <span>Tulis Doa Untuk {profile.name}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#736E64] mb-6 font-normal">
              Pesan yang kamu tulis akan langsung tampil pada koleksi kartu ucapan ulang tahun ini.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#736E64] mb-1">
                    Nama Kamu
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Alex"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E0DCD3] text-[#1E1D1A] focus:outline-none focus:border-[#D97706] text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#736E64] mb-1">
                    Hubungan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sahabat / Teman Kerja"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E0DCD3] text-[#1E1D1A] focus:outline-none focus:border-[#D97706] text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#736E64] mb-1">
                    Judul Kartu
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Sehat & Sukses Selalu!"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E0DCD3] text-[#1E1D1A] focus:outline-none focus:border-[#D97706] text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#736E64] mb-1">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as unknown as typeof category)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E0DCD3] text-[#1E1D1A] focus:outline-none focus:border-[#D97706] text-sm font-medium"
                  >
                    <option value="Doa Utama">✨ Doa Utama</option>
                    <option value="Karier & Sukses">🚀 Karier & Sukses</option>
                    <option value="Kesehatan">🌿 Kesehatan</option>
                    <option value="Kebahagiaan">😊 Kebahagiaan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#736E64] mb-1">
                  Pesan Ucapan
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={`Selamat ulang tahun ke-${profile.age}, ${profile.name}! Semoga semua hal baik yang kamu rintis terus berkembang...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E0DCD3] text-[#1E1D1A] focus:outline-none focus:border-[#D97706] text-sm font-medium resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E4DB]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E0DCD3] hover:bg-[#F3EFE6] text-[#736E64] text-sm font-bold transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1E1D1A] hover:bg-[#33312B] text-white font-bold text-sm shadow-md transition cursor-pointer"
                >
                  Kirim Kartu ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

