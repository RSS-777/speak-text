export const speakText = (text: string, lang: string) => {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  speechSynthesis.speak(utterance);
};