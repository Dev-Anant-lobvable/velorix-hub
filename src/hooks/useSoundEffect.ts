const audioCache: Record<string, HTMLAudioElement> = {};

export const playSound = (src: string, volume = 0.5) => {
  try {
    if (!audioCache[src]) {
      audioCache[src] = new Audio(src);
    }
    const audio = audioCache[src];
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch {}
};

export const playDownloadSound = () => playSound("/sounds/download-click.mp3", 0.6);
export const playExternalLinkSound = () => playSound("/sounds/external-link.mp3", 0.4);
