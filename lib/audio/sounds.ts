const sounds = {
  proximity: "/sounds/proximity.mp3",
  scan: "/sounds/scan.mp3",
  analyzing: "/sounds/analyzing.wav",
  mjolnir: "/sounds/mjolnir.wav",
  discoveredItem: "/sounds/thud.wav",
};

export const playSound = (
  sound: keyof typeof sounds,
  volume = 1
) => {
  const audio = new Audio(sounds[sound]);
  audio.volume = volume;
  audio.play().catch(() => {});
};