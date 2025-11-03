export const speakText = (
  text: string,
  lang: string,
  onStatusChange?: (isPlaying: boolean) => void
) => {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;

  utterance.onstart = () => {
    if (onStatusChange) onStatusChange(true);
  };

  utterance.onend = utterance.onerror = () => {
    if (onStatusChange) onStatusChange(false);
  };

  speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
    if (onStatusChange) onStatusChange(false);
  };
};
