const tonesMap = {
  āēīōūǖ: 1,
  áéíóúǘ: 2,
  ǎěǐǒǔǚ: 3,
  àèìòùǜ: 4,
  aeiouü: 5, // Neutral tone for ü (optional, can be omitted if not needed)
} as any;

export const calculateTones = (char: { pinyin: string }) => {
  const pinyin = char.pinyin;
  for (const key of Object.keys(tonesMap)) {
    for (const toneChar of key) {
      if (pinyin?.includes(toneChar)) {
        return tonesMap?.[key];
      }
    }
  }
  // If no tone character found, default to 5 (neutral)
  return 5;
};
