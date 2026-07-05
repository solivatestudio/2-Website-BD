import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FloatingBalloons } from './components/FloatingBalloons';
import { InteractiveCake } from './components/InteractiveCake';
import { WishesSection } from './components/WishesSection';
import { PartyModal } from './components/PartyModal';
import { EditProfileModal } from './components/EditProfileModal';
import { MusicControllerPill } from './components/MusicControllerPill';
import { SecretMessageToast } from './components/SecretMessageToast';
import { Footer } from './components/Footer';
import { BirthdayWish, BirthdayProfile } from './types';
import { INITIAL_WISHES, INITIAL_PROFILE } from './data/birthdayData';
import { soundEngine } from './utils/soundEngine';
import { triggerPartyConfetti, triggerFireworks } from './utils/confettiHelper';

export default function App() {
  const [profile, setProfile] = useState<BirthdayProfile>(INITIAL_PROFILE);
  const [wishes, setWishes] = useState<BirthdayWish[]>(INITIAL_WISHES);

  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPartyModalOpen, setIsPartyModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [secretMessage, setSecretMessage] = useState<string | null>(null);

  const handleToggleMusic = () => {
    soundEngine.toggleMusic((playing) => {
      setIsPlayingMusic(playing);
    });
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const handleBalloonPopped = (msg: string) => {
    soundEngine.playPop();
    triggerPartyConfetti();
    setSecretMessage(msg);
  };

  const handleCandleExtinguished = () => {
    soundEngine.playCandleBlow();
  };

  const handleCandleLight = () => {
    soundEngine.playSparkle();
  };

  const handleAllCandlesBlown = () => {
    soundEngine.playCelebrationFanfare();
    triggerFireworks();
    triggerPartyConfetti();
    setIsPartyModalOpen(true);
  };

  const handleAddWish = (newWish: BirthdayWish) => {
    soundEngine.playSparkle();
    triggerPartyConfetti();
    setWishes((prev) => [newWish, ...prev]);
  };

  const handleTriggerParty = () => {
    soundEngine.playCelebrationFanfare();
    triggerFireworks();
    triggerPartyConfetti();
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2A26] font-sans antialiased selection:bg-[#C9A27E] selection:text-white relative overflow-x-hidden">
      {/* Subtle paper grain texture overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(#dcd3c7_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none"></div>

      {/* Interactive Balloons */}
      <FloatingBalloons onBalloonPopped={handleBalloonPopped} />

      {/* Secret Toast */}
      <SecretMessageToast message={secretMessage} onClose={() => setSecretMessage(null)} />

      {/* Navbar */}
      <Navbar
        profile={profile}
        onTriggerConfetti={handleTriggerParty}
        onOpenEditProfile={() => setIsEditModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content */}
      <main className="relative z-20 space-y-12 pb-12">
        <HeroSection
          profile={profile}
          onScrollToCake={() => handleScrollToSection('cake')}
          onScrollToWishes={() => handleScrollToSection('wishes')}
          onTriggerParty={handleTriggerParty}
          onOpenEditProfile={() => setIsEditModalOpen(true)}
        />

        <section id="cake" className="py-6 px-4">
          <InteractiveCake
            profile={profile}
            onCandleExtinguished={handleCandleExtinguished}
            onAllCandlesBlown={handleAllCandlesBlown}
            onLightCandle={handleCandleLight}
          />
        </section>

        <WishesSection
          profile={profile}
          wishes={wishes}
          onAddWish={handleAddWish}
        />
      </main>

      {/* Audio Controller */}
      <MusicControllerPill
        isPlayingMusic={isPlayingMusic}
        isMuted={isMuted}
        onToggleMusic={handleToggleMusic}
        onToggleMute={handleToggleMute}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        profile={profile}
        onSave={(updated) => {
          setProfile(updated);
          soundEngine.playSparkle();
        }}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Celebration Modal */}
      <PartyModal
        isOpen={isPartyModalOpen}
        profile={profile}
        onClose={() => setIsPartyModalOpen(false)}
        onTriggerMoreFireworks={() => {
          soundEngine.playCelebrationFanfare();
          triggerFireworks();
        }}
      />

      {/* Footer */}
      <Footer
        profile={profile}
        onTriggerParty={handleTriggerParty}
        onScrollToTop={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
