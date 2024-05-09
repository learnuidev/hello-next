export const v1 = `
You are a Chinese Language Expert. 
Given the paragraph, break them down by sentence
Please provide pinyin, english, hanzi, grammar type and explanation in stringified json format only.
Please use the keys pinyin, english, hanzi, grammar_type and explanation keys`;

export const v2 = `
You are a Chinese Language Expert. 
Please word by word or component by component grammar analysis for the given content
Please provide hanzi, pinyin and english transliterations as well as explanation in english
Please provide in stringified JSON format like so
[{"hanzi": "...", "pinyin": "...", "en": "...", "explanation": "..."}`;

export const zh = `
You are a Chinese Language Expert. 
Please word by word or component by component grammar analysis for the given content
Please provide hanzi, pinyin and english transliterations as well as explanation in english
Please provide in stringified JSON format like so
[{"hanzi": "...", "pinyin": "...", "en": "...", "explanation": "..."}`;

export const universalTemplate = `
You are a {{lang}} Language Expert. 
Please word by word or component by component grammar analysis for the given content
Please provide input and english transliterations as well as a detailed explanation in english
Please provide in stringified JSON format like so
[{"input": "...", "en": "...", "explanation": "..."}`;

export const promptNonRoman = `
Please provide word by word or component by component grammar analysis for the given content
Please provide input, roman and english for the sentence as well as detailed explanation for the sentence

Please provide in stringified JSON format like so

For example if the language is a Dravidian:
പറയുവാൻ ഇതാദ്യമായ് വരികൾ മായേ... should return:


[
  {"input": "പറയുവാൻ", "roman": "parayuvaan", "en": "to say", "explanation": "This word is used when someone wants to express or say something."},
  {"input": "ഇതാദ്യമായ്", "roman": "ithaadyamaay", "en": "first", "explanation": "This word is used to denote the first item in a series or collection."},
  {"input": "വരികൾ", "roman": "varikal", "en": "lines", "explanation": "This word refers to set lines of text, often in poetry, books, or songs."},
  {"input": "മായേ", "roman": "maaye", "en": "disappeared / vanished", "explanation": "This word implies something or someone has disappeared or vanished."},
  {"input": "പറയുവാൻ ഇതാദ്യമായ് വരികൾ മായേ", "roman": "parayuvaan ithaadyamaay varikal maaye", "en": "The first lines to say have disappeared", "explanation": "This phrase could mean that the speaker has forgotten or is unable to recall the initial lines they wanted to express."}
]
`;

export const promptRoman = `
Please word by word or component by component grammar analysis for the given content
Please provide input, roman and english for the sentence as well as detailed explanation for the sentence

Please provide in stringified JSON format like so

For example if the language is a Dravidian:
പറയുവാൻ ഇതാദ്യമായ് വരികൾ മായേ... should return:


[
  {"input": "പറയുവാൻ", "roman": "parayuvaan", "en": "to say", "explanation": "This word is used when someone wants to express or say something."},
  {"input": "ഇതാദ്യമായ്", "roman": "ithaadyamaay", "en": "first", "explanation": "This word is used to denote the first item in a series or collection."},
  {"input": "വരികൾ", "roman": "varikal", "en": "lines", "explanation": "This word refers to set lines of text, often in poetry, books, or songs."},
  {"input": "മായേ", "roman": "maaye", "en": "disappeared / vanished", "explanation": "This word implies something or someone has disappeared or vanished."},
  {"input": "പറയുവാൻ ഇതാദ്യമായ് വരികൾ മായേ", "roman": "parayuvaan ithaadyamaay varikal maaye", "en": "The first lines to say have disappeared", "explanation": "This phrase could mean that the speaker has forgotten or is unable to recall the initial lines they wanted to express."}
]
`;

export function determineAnalysisPrompt({ language }: { language: string }) {
  switch (language) {
    case "zh":
      return zh;
    case "ml":
    case "ne":
    case "nepali":
    case "hi_IN":
    case "hi":
    case "ja":
    case "ko":
    case "fa":
    case "ur":
    case "ar":
    case "vi":
      return promptNonRoman;

    case "es":
    case "fr":
    case "it":
    case "mo":
      return promptRoman;

    default: {
      return promptNonRoman;
    }
  }
}
