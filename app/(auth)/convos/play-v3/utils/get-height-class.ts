const heightMapping = {
  100: "h-8",
  200: "h-12",
  300: "h-16",
  500: "h-20",
  600: "h-28",
  700: "h-28",
  800: "h-34",
} as any;

export const getHeightClass = (length: number) => {
  for (const maxLength of Object.keys(heightMapping).reverse()) {
    if (length > parseInt(maxLength)) {
      return heightMapping[maxLength];
    }
  }
  return heightMapping[200]; // Default case if length is less than or equal to 200
};
