const sounds = {
  rune: "/sounds/rune.mp3",
  relics: "/sounds/relics.mp3",
  pergament: "/sounds/pergament.mp3",
  gong: "/sounds/gong.mp3",
  background: "/sounds/background.mp3",
};

export const playSound = (
  sound: keyof typeof sounds,
  volume = 1
) => {
  const audio = new Audio(sounds[sound]);
  audio.volume = volume;
  audio.play().catch(() => {});
};