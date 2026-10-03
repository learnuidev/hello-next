const HAN_PATTERN = /\p{Script=Han}/u;

/**
 * True for a single Han character.
 *
 * The reader hands these to `CharacterItem` so a character wears the colour of
 * what it is to you (learned, forgotten, still unknown); latin letters have no
 * such state and are rendered as plain text.
 */
export const isHanCharacter = (character: string) =>
  HAN_PATTERN.test(character || "");
