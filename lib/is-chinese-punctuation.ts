export const chinesePunctuations = [
  "。",
  "？",
  "，",
  "、",
  "·",
  "《",
  "》",
  "〈",
  "〉",
  "⸺",
  "–",
  "～",
  "！",
  "，",
];

export function isChinesePunctuation(character: string) {
  return chinesePunctuations?.includes(character);
}
