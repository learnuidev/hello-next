export const characterTonesMap = {
  1: "āēīōū",
  2: "áéíóú",
  3: "ǎěǐǒǔ",
  4: "àèìòù",
};

export type ICharacter = {
  hanzi: string;
  pinyin: string;
  en?: string;
};

export const getCharacterToneLevel = (
  character: ICharacter
): number | undefined => {
  const level = Object.entries(characterTonesMap)?.find(([tone, vals]) => {
    return vals?.split("")?.find((v) => character?.pinyin?.includes(v));
  })?.[0];

  if (level) {
    return parseInt(level);
  }
};
