"use client";

let scanningOscillator: OscillatorNode | null = null;
let scanningGain: GainNode | null = null;
let scanningAudioContext: AudioContext | null = null;

export function useSoundEffects() {
  const playScanStart = () => {
    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      180,
      audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      700,
      audioContext.currentTime + 0.25
    );

    gain.gain.setValueAtTime(
      0.001,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.2,
      audioContext.currentTime + 0.03
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.35
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.35);
  };

  const startScanning = () => {
    if (scanningOscillator) {
      return;
    }

    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      90,
      audioContext.currentTime
    );

    gain.gain.setValueAtTime(
      0.001,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.04,
      audioContext.currentTime + 0.5
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    scanningOscillator = oscillator;
    scanningGain = gain;
    scanningAudioContext = audioContext;
  };

  const stopScanning = () => {
    if (
      !scanningOscillator ||
      !scanningGain ||
      !scanningAudioContext
    ) {
      return;
    }

    const now = scanningAudioContext.currentTime;

    scanningGain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.2
    );

    scanningOscillator.stop(now + 0.2);

    scanningOscillator = null;
    scanningGain = null;
    scanningAudioContext = null;
  };

  return {
    playScanStart,
    startScanning,
    stopScanning,
  };
}