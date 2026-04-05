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
const getCharacterMatchInfo = (
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
function findWordMatchInfo(
  sentence: string,
  word: string,
  character: string,
  characterIndex: number,
  returnType: "boolean"
): boolean;
function findWordMatchInfo(
  sentence: string,
  word: string,
  character: string,
  characterIndex: number,
  returnType: "detailed"
): CharacterMatchInfo | null;
function findWordMatchInfo(
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

// Usage examples
const sentence: string = "我们改革开放";
const word: string = "改革开放";

// Test with correct character indices
console.log(isCharacterPartOfWordMatch(sentence, word, "改", 2)); // true (改 at index 2)
console.log(isCharacterPartOfWordMatch(sentence, word, "革", 3)); // true (革 at index 3)
console.log(isCharacterPartOfWordMatch(sentence, word, "开", 4)); // true (开 at index 4)
console.log(isCharacterPartOfWordMatch(sentence, word, "放", 5)); // true (放 at index 5)

// Test with wrong character indices
console.log(isCharacterPartOfWordMatch(sentence, word, "改", 0)); // false (改 is not at index 0)
console.log(isCharacterPartOfWordMatch(sentence, word, "开", 2)); // false (开 is not at index 2)

// Test with characters not in word
console.log(isCharacterPartOfWordMatch(sentence, word, "我", 0)); // false
console.log(isCharacterPartOfWordMatch(sentence, word, "们", 1)); // false

// Test with out of bounds index
console.log(isCharacterPartOfWordMatch(sentence, word, "改", 99)); // false

// Get detailed info for a specific character index
const detailedInfo = getCharacterMatchInfo(sentence, word, "开", 4);
console.log(detailedInfo);
// {
//   character: '开',
//   sentenceIndex: 4,
//   positionInWord: 2,
//   wordStartIndex: 2,
//   isPartOfValidMatch: true,
//   matchedWord: '改革开放'
// }

// Using overloaded function
const boolResult: boolean = findWordMatchInfo(
  sentence,
  word,
  "革",
  3,
  "boolean"
);
const detailResult: CharacterMatchInfo | null = findWordMatchInfo(
  sentence,
  word,
  "放",
  5,
  "detailed"
);

console.log(boolResult); // true
console.log(detailResult); // { character: '放', sentenceIndex: 5, positionInWord: 3, wordStartIndex: 2, ... }

// Test all positions in the sentence
const sentenceChars = sentence.split("");
sentenceChars.forEach((char, idx) => {
  const result = isCharacterPartOfWordMatch(sentence, word, char, idx);
  console.log(`Index ${idx}: Character "${char}" - ${result}`);
});
// Index 0: Character "我" - false
// Index 1: Character "们" - false
// Index 2: Character "改" - true
// Index 3: Character "革" - true
// Index 4: Character "开" - true
// Index 5: Character "放" - true
