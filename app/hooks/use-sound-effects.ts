"use client";

let scanningOscillator: OscillatorNode | null = null;
let scanningGain: GainNode | null = null;
let scanningAudioContext: AudioContext | null = null;

export function useSoundEffects() {
  const playFalseSignal = () => {
  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "square";

  oscillator.frequency.setValueAtTime(
    180,
    audioContext.currentTime
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    70,
    audioContext.currentTime + 0.3
  );

  gain.gain.setValueAtTime(
    0.12,
    audioContext.currentTime
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

 const playMjolnirFound = () => {
  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(
    180,
    audioContext.currentTime
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    900,
    audioContext.currentTime + 0.45
  );

  gain.gain.setValueAtTime(
    0.001,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.3,
    audioContext.currentTime + 0.08
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.9
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.9);
};

const playThunder = () => {
  const audioContext = new AudioContext();

  // Thunder crack
  const crack = audioContext.createOscillator();
  const crackGain = audioContext.createGain();

  crack.type = "square";
  crack.frequency.setValueAtTime(900, audioContext.currentTime);
  crack.frequency.exponentialRampToValueAtTime(
    120,
    audioContext.currentTime + 0.12
  );

  crackGain.gain.setValueAtTime(0.001, audioContext.currentTime);
  crackGain.gain.exponentialRampToValueAtTime(
    0.35,
    audioContext.currentTime + 0.01
  );
  crackGain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.15
  );

  crack.connect(crackGain);
  crackGain.connect(audioContext.destination);

  crack.start();
  crack.stop(audioContext.currentTime + 0.15);

  // Deep thunder rumble
  const rumble = audioContext.createOscillator();
  const rumbleGain = audioContext.createGain();

  rumble.type = "sawtooth";

  rumble.frequency.setValueAtTime(80, audioContext.currentTime + 0.08);
  rumble.frequency.exponentialRampToValueAtTime(
    35,
    audioContext.currentTime + 2.2
  );

  rumbleGain.gain.setValueAtTime(0.001, audioContext.currentTime + 0.08);
  rumbleGain.gain.exponentialRampToValueAtTime(
    0.4,
    audioContext.currentTime + 0.25
  );
  rumbleGain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 2.2
  );

  rumble.connect(rumbleGain);
  rumbleGain.connect(audioContext.destination);

  rumble.start(audioContext.currentTime + 0.08);
  rumble.stop(audioContext.currentTime + 2.2);
};

  return {
    playScanStart,
    startScanning,
    stopScanning,
    playFalseSignal,
    playMjolnirFound,
    playThunder
  };
}