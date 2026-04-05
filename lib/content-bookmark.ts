// Type definition for return info
interface CharacterMatchInfo {
  character: string;
  sentenceIndex: number;
  positionInWord: number;
  wordStartIndex: number;
  isPartOfValidMatch: boolean;
  matchedWord: string | null;
}

export const isCharacterPartOfWordMatch = (
  sentence: string,
  word: string,
  character: string,
  characterIndex: number // The expected index of the character in the sentence
): boolean => {
  const sentenceChars: string[] = sentence.split("");
  const targetWordChars: string[] = word.split("");

  // Check if the character at the specified index matches the given character
  if (characterIndex < 0 || characterIndex >= sentenceChars.length) {
    return false;
  }

  if (sentenceChars[characterIndex] !== character) {
    return false;
  }

  // For this specific character index, check if it could be part of the word
  for (let posInWord = 0; posInWord < targetWordChars.length; posInWord++) {
    if (targetWordChars[posInWord] === character) {
      const possibleStartIndex: number = characterIndex - posInWord;

      // Check if the word would fit starting at this position
      if (
        possibleStartIndex >= 0 &&
        possibleStartIndex + word.length <= sentence.length
      ) {
        // Extract the potential word
        const potentialWord: string = sentence.slice(
          possibleStartIndex,
          possibleStartIndex + word.length
        );

        if (potentialWord === word) {
          return true;
        }
      }
    }
  }

  return false;
};

// Enhanced version with detailed return info
export const getCharacterMatchInfo = (
  sentence: string,
  word: string,
  character: string,
  characterIndex: number
): CharacterMatchInfo => {
  const sentenceChars: string[] = sentence.split("");

  // Validate the character at the specified index
  if (characterIndex < 0 || characterIndex >= sentenceChars.length) {
    return {
      character,
      sentenceIndex: characterIndex,
      positionInWord: -1,
      wordStartIndex: -1,
      isPartOfValidMatch: false,
      matchedWord: null,
    };
  }

  if (sentenceChars[characterIndex] !== character) {
    return {
      character,
      sentenceIndex: characterIndex,
      positionInWord: -1,
      wordStartIndex: -1,
      isPartOfValidMatch: false,
      matchedWord: null,
    };
  }

  // Check each possible position this character could occupy in the word
  for (let posInWord = 0; posInWord < word.length; posInWord++) {
    if (word[posInWord] === character) {
      const possibleStartIndex: number = characterIndex - posInWord;

      if (
        possibleStartIndex >= 0 &&
        possibleStartIndex + word.length <= sentence.length
      ) {
        const potentialWord: string = sentence.slice(
          possibleStartIndex,
          possibleStartIndex + word.length
        );
        const isMatch: boolean = potentialWord === word;

        if (isMatch) {
          return {
            character: character,
            sentenceIndex: characterIndex,
            positionInWord: posInWord,
            wordStartIndex: possibleStartIndex,
            isPartOfValidMatch: true,
            matchedWord: potentialWord,
          };
        }
      }
    }
  }

  return {
    character,
    sentenceIndex: characterIndex,
    positionInWord: -1,
    wordStartIndex: -1,
    isPartOfValidMatch: false,
    matchedWord: null,
  };
};

// Function overloads for flexible return types
export function findWordMatchInfo(
  sentence: string,
  word: string,
  character: string,
  characterIndex: number,
  returnType: "boolean"
): boolean;
export function findWordMatchInfo(
  sentence: string,
  word: string,
  character: string,
  characterIndex: number,
  returnType: "detailed"
): CharacterMatchInfo | null;
export function findWordMatchInfo(
  sentence: string,
  word: string,
  character: string,
  characterIndex: number,
  returnType: "boolean" | "detailed" = "boolean"
): boolean | CharacterMatchInfo | null {
  const sentenceChars: string[] = sentence.split("");

  // Validate the character at the specified index
  if (characterIndex < 0 || characterIndex >= sentenceChars.length) {
    return returnType === "boolean" ? false : null;
  }

  if (sentenceChars[characterIndex] !== character) {
    return returnType === "boolean" ? false : null;
  }

  // Check each possible position this character could occupy in the word
  for (let posInWord = 0; posInWord < word.length; posInWord++) {
    if (word[posInWord] === character) {
      const possibleStartIndex: number = characterIndex - posInWord;

      if (
        possibleStartIndex >= 0 &&
        possibleStartIndex + word.length <= sentence.length
      ) {
        const potentialWord: string = sentence.slice(
          possibleStartIndex,
          possibleStartIndex + word.length
        );
        const isMatch: boolean = potentialWord === word;

        if (isMatch && returnType === "boolean") {
          return true;
        }

        if (isMatch && returnType === "detailed") {
          return {
            character,
            sentenceIndex: characterIndex,
            positionInWord: posInWord,
            wordStartIndex: possibleStartIndex,
            isPartOfValidMatch: true,
            matchedWord: potentialWord,
          };
        }
      }
    }
  }

  return returnType === "boolean" ? false : null;
}
