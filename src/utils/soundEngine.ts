// Lightweight Web Audio API Synthesizer for gentle background music and festive sound effects
// Guaranteed to be light on memory, zero lag, and no external audio network requests needed!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private loopTimer: number | null = null;
  private currentTrack: 'gentle' | 'acoustic' | 'starlight' = 'gentle';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public setTrack(track: 'gentle' | 'acoustic' | 'starlight') {
    this.currentTrack = track;
  }

  public toggleMusic(onStateChange?: (playing: boolean) => void) {
    this.initContext();
    if (this.isPlaying) {
      this.stopMusic();
      if (onStateChange) onStateChange(false);
    } else {
      this.startMusic();
      if (onStateChange) onStateChange(true);
    }
  }

  public startMusic() {
    this.initContext();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;
    this.playLoop();
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  private playLoop() {
    if (!this.isPlaying || !this.ctx) return;

    // Gentle Happy Birthday & Warm Chord Progression Notes (Hz)
    // C Major / G Major gentle box scale
    const melodyGentle = [
      { note: 261.63, duration: 0.4 }, // C4
      { note: 261.63, duration: 0.4 }, // C4
      { note: 293.66, duration: 0.8 }, // D4
      { note: 261.63, duration: 0.8 }, // C4
      { note: 349.23, duration: 0.8 }, // F4
      { note: 329.63, duration: 1.6 }, // E4

      { note: 261.63, duration: 0.4 }, // C4
      { note: 261.63, duration: 0.4 }, // C4
      { note: 293.66, duration: 0.8 }, // D4
      { note: 261.63, duration: 0.8 }, // C4
      { note: 392.00, duration: 0.8 }, // G4
      { note: 349.23, duration: 1.6 }, // F4

      { note: 261.63, duration: 0.4 }, // C4
      { note: 261.63, duration: 0.4 }, // C4
      { note: 523.25, duration: 0.8 }, // C5
      { note: 440.00, duration: 0.8 }, // A4
      { note: 349.23, duration: 0.8 }, // F4
      { note: 329.63, duration: 0.8 }, // E4
      { note: 293.66, duration: 1.2 }, // D4

      { note: 466.16, duration: 0.4 }, // Bb4
      { note: 466.16, duration: 0.4 }, // Bb4
      { note: 440.00, duration: 0.8 }, // A4
      { note: 349.23, duration: 0.8 }, // F4
      { note: 392.00, duration: 0.8 }, // G4
      { note: 349.23, duration: 2.0 }, // F4
    ];

    const melodyStarlight = [
      { note: 523.25, duration: 0.5 },
      { note: 659.25, duration: 0.5 },
      { note: 783.99, duration: 0.5 },
      { note: 1046.50, duration: 1.0 },
      { note: 880.00, duration: 0.5 },
      { note: 783.99, duration: 1.0 },
      { note: 659.25, duration: 0.5 },
      { note: 587.33, duration: 0.5 },
      { note: 659.25, duration: 1.5 },
    ];

    const melody = this.currentTrack === 'starlight' ? melodyStarlight : melodyGentle;

    let totalTime = 0;
    melody.forEach((item) => {
      this.scheduleMusicBoxNote(item.note, totalTime, item.duration);
      // Add a soft harmonizing bass note every few beats
      if (Math.random() > 0.4) {
        this.scheduleMusicBoxNote(item.note / 2, totalTime, item.duration * 1.5, 0.04);
      }
      totalTime += item.duration * (this.currentTrack === 'starlight' ? 0.7 : 0.65);
    });

    this.loopTimer = window.setTimeout(() => {
      this.playLoop();
    }, totalTime * 1000 + 1200);
  }

  private scheduleMusicBoxNote(freq: number, delaySec: number, durationSec: number, gainVal = 0.08) {
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime + delaySec;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Sine wave with soft harmonics simulates a celesta/music box
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + durationSec + 0.35);
  }

  public playPop() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  public playCandleBlow() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    // Breath white noise + gentle chime
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.4);

    // Chime
    this.scheduleMusicBoxNote(1046.50, 0, 0.5, 0.1);
  }

  public playSparkle() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    this.scheduleMusicBoxNote(1318.51, 0, 0.3, 0.08);
    this.scheduleMusicBoxNote(1567.98, 0.1, 0.4, 0.08);
  }

  public playCelebrationFanfare() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const chords = [
      { f: 523.25, d: 0 },   // C5
      { f: 659.25, d: 0.1 }, // E5
      { f: 783.99, d: 0.2 }, // G5
      { f: 1046.50, d: 0.35 } // C6
    ];

    chords.forEach(c => {
      this.scheduleMusicBoxNote(c.f, c.d, 1.2, 0.15);
    });
  }
}

export const soundEngine = new SoundEngine();
