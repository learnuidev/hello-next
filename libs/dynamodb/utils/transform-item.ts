{
  /*
   trasformItem
   Transforms raw Dynamodb Item
   Input: DynamoDBItemMap
   Output: Record<string, any>

*/
}

type DynamoDBItemMap = any;

let counter = 0;
export const transformItem = (item: DynamoDBItemMap): Record<string, any> => {
  // If the key is of type "M", then we simply flatten its valus and return it
  // This is done by calling the transformItem which takes a Map value

  const objKey = Object.keys(item)?.[0];
  if (objKey === "M") {
    const mapValue = Object.values(item)?.[0] as DynamoDBItemMap;
    return transformItem(mapValue);
  }

  counter++;

  console.log("-------------------------");
  console.log("OBJECT KEY", objKey);
  console.log("COUNTER", counter);
  console.log("ITEM", item);
  console.log("-------------------------");

  // Other wise we loop over each key value pairs
  return Object.entries(item).reduce((acc, curr: any) => {
    const [key, val] = curr;
    try {
      // First we extract the value type and the value it self
      const valueKeyType = Object.keys(val)?.[0];
      const valueItems = Object.values(val)?.[0] as any;

      // If the value type is a list, then two cases are possible. Its either collection
      // of 1. primitives (string, number). 2 maps
      if (valueKeyType === "L") {
        // If the values items is empty, smplify return empty array
        // If this check is removed, it throws error :(
        if (!valueItems?.length) {
          return {
            ...acc,
            [key]: [],
          };
        }
        const firstItem = valueItems?.[0];

        // if the value are collection of primitives then we...
        if (["S", "N"]?.includes(Object.keys(firstItem)?.[0])) {
          return {
            ...acc,

            // ... loop over the values and get the values and flatten the arry
            [key]: valueItems?.map((item: any) => Object.values(item)).flat(),
          };
        }

        return {
          ...acc,
          // Other wise, we call the transform function again
          [key]: valueItems?.map((item: DynamoDBItemMap) => {
            return transformItem(item);
          }),
        };
      }

      return {
        ...acc,
        [key]: Object.values(val)[0],
      };
    } catch (err) {
      return {
        ...acc,
        [key]: val,
      };
    }
  }, {});
  return item;
};

const sampleResponse = {
  summary: {
    S: 'The word "primavera" in Spanish refers to the season of spring. This season typically occurs between the months of March and June in the northern hemisphere, and between September and December in the southern hemisphere. During spring, temperatures begin to rise, flowers bloom, and nature comes back to life after the winter. It is a time of renewal and growth in the natural world. In Spanish-speaking countries, "primavera" is often celebrated with festivals, outdoor activities, and traditions that mark the arrival of this beautiful season.',
  },
  sentenceId: {
    S: "primavera.",
  },
  creator: {
    S: "learnuidev@gmail.com",
  },
  meanings: {
    L: [
      {
        M: {
          explanation: {
            S: "This meaning refers to the verb 'ser' (to be) in Spanish, specifically when used to indicate that a subject is the same as the predicate.",
          },
          en: {
            S: "is (third person singular present tense of the verb 'to be' in Spanish)",
          },
          original: {
            S: "es (verbo ser en tercera persona del presente en español)",
          },
        },
      },
      {
        M: {
          explanation: {
            S: "This meaning refers to the international standard language code for Spanish, which is 'es' under the ISO 639-1 standard.",
          },
          en: {
            S: "es (ISO 639-1 code for the Spanish language)",
          },
          original: {
            S: "es (código ISO 639-1 para el idioma español)",
          },
        },
      },
    ],
  },
  createdAt: {
    N: "1714518908277",
  },
  id: {
    S: "3fbc9697-ee49-5368-953b-284393927c99",
  },
  lang: {
    S: "es",
  },
};

const sampleResponseError = {
  summary: {
    S: 'The Chinese character "一" has several translations in English, depending on the context:\n\n## 1. One\n\nThe most common translation of "一" is "one" when referring to the number 1. For example:\n这是一本书。 - This is one book.\n\n## 2. Single, Whole\n\n"一" can also mean "single" or "whole" when used in phrases like "一条龙" (wholeheartedly) or "一体" (integrated).\n\n## 3. First, Beginning\n\nIn certain contexts, "一" can mean "first" or "beginning". For example:\n一月 - January (the first month of the year)\n一切 - Everything (the beginning of all things)\n\n## 4. Same\n\nWhen used before a noun or pronoun, "一" can indicate "same" or "identical". For example:\n我们是一家人。 - We are one family (We are a family).\n\nSo in summary, the English translations of the Chinese character "一" can include "one", "single/whole", "first/beginning", and "same", depending on the specific context in which it is used.',
  },
  sentenceId: {
    S: "一",
  },
  creator: {
    S: "learnuidev@gmail.com",
  },
  // Step 1: Error comes from this data
  meanings: {
    L: [
      {
        M: {
          explanation: {
            S: "Content refers to the substance or material within a written work, website, or other media. It can include articles, images, videos, and other forms of information.",
          },
          meaning: {
            S: "content",
          },
          // Step 2: Error comes from this specifc data
          use_cases: {
            L: [],
          },
        },
      },
    ],
  },
  createdAt: {
    N: "1713902781655",
  },
  id: {
    S: "3c5dc9c0-92f8-5ee0-b36e-b9083ca44ecc",
  },
  lang: {
    S: "zh",
  },
};

console.log(transformItem(sampleResponseError));
