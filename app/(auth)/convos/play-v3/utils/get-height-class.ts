const heightMapping = {
  0: "h-12",
  100: "h-12",
  200: "h-12",
  300: "h-16",
  400: "h-16",
  500: "h-20",
  600: "h-28",
  700: "h-28",
  800: "h-34",
} as any;

export const getHeightClass = (length: number) => {
  const minVal = Math.floor(length / 100) * 100;

  return heightMapping?.[minVal] || "h-38";
};
