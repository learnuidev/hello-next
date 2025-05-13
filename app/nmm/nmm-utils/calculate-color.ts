import { calculateTones } from "./calculate-tones";

export const calculateColor = (dict: any) => {
  if (!dict?.tone) {
    return "dark:text-white text-black";
  }
  switch (parseInt(dict?.tone || calculateTones(dict))) {
    case 1:
      return "dark:text-rose-400 text-rose-400";
    case 2:
      return "dark:text-teal-400 text-teal-400";
    case 3:
      return "dark:text-purple-400 text-purple-400";
    case 4:
      return "dark:text-pink-400 text-pink-400";
    case 5:
      return "text-blue-500";
    case 0:
      return "dark:text-white text-black";

    default:
      return "";
  }
};
