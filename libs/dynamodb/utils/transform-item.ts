{
  /*
   trasformItem
   Transforms raw Dynamodb Item
   Input: DynamoDBItemMap
   Output: Record<string, any>

*/
}

type DynamoDBItemMap = any;

export const transformItem = (item: DynamoDBItemMap): Record<string, any> => {
  // If the key is of type "M", then we simply flatten its valus and return it
  // This is done by calling the transformItem which takes a Map value
  if (Object.keys(item)?.[0] === "M") {
    const mapValue = Object.values(item)?.[0] as DynamoDBItemMap;
    return transformItem(mapValue);
  }

  // Other wise we loop over each key value pairs
  return Object.entries(item).reduce((acc, curr: any) => {
    const [key, val] = curr;

    // First we extract the value type and the value it self
    const valueKeyType = Object.keys(val)[0];
    const valueItems = Object.values(val)[0] as any;

    // If the value type is a list, then two cases are possible. Its either collection
    // of 1. primitives (string, number). 2 maps
    if (valueKeyType === "L") {
      const firstItem = valueItems?.[0];

      // if the value are collection of primitives then we...
      if (["S", "N"]?.includes(Object.keys(firstItem)[0])) {
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
  }, {});
  return item;
};
