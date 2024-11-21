export const calculateBorderColor = (dict: any) => {
  switch (parseInt(dict?.tone)) {
    case 1:
      return "border-red-400";
    case 2:
      return "border-teal-500";
    case 3:
      return "border-purple-400";
    case 4:
      return "border-pink-300";
    // default:
    //   return "dark:text-white";
  }
};

export const belts = [
  {
    fill: "dark:bg-white bg-gray-100",
    color: "dark:text-white text-gray-100",
    unselected: "dark:bg-gray-800 bg-gray-400",
    maxCharacterLevel: 105,
    minCharacterLevel: 0,
    level: "white",
    hskLevel: 1,
  },

  {
    fill: "dark:bg-yellow-500 bg-yellow-400",
    unselected: "dark:bg-gray-800 bg-gray-400",
    color: "text-yellow-500",
    maxCharacterLevel: 300,
    minCharacterLevel: 105,
    level: "yellow",
    hskLevel: 2,
  },
  {
    fill: "dark:bg-green-500 bg-green-400",
    unselected: "dark:bg-gray-800 bg-gray-400",
    color: "text-green-500",
    maxCharacterLevel: 600,
    minCharacterLevel: 300,
    level: "green",
    hskLevel: 3,
  },
  {
    fill: "dark:bg-blue-500 bg-blue-400",
    unselected: "dark:bg-gray-800 bg-gray-400",
    color: "text-blue-500",
    maxCharacterLevel: 1000,
    minCharacterLevel: 600,
    level: "blue",
    hskLevel: 4,
  },
  {
    fill: "dark:bg-rose-500 bg-rose-400",
    unselected: "dark:bg-gray-800 bg-gray-400",
    color: "text-red-500",
    maxCharacterLevel: 1500,
    minCharacterLevel: 1000,
    level: "red",
    hskLevel: 5,
  },
  {
    fill: "dark:bg-pink-500 bg-pink-400",
    unselected: "dark:bg-gray-800 bg-gray-400",
    color: "text-pink-500",
    maxCharacterLevel: 2200,
    minCharacterLevel: 1500,
    level: "pink",
    hskLevel: 6,
  },
  {
    fill: "dark:bg-gray-500 bg-gray-600",
    unselected: "dark:bg-slate-800 bg-gray-400",
    color: "text-gray-500",
    maxCharacterLevel: 30500,
    minCharacterLevel: 2200,
    level: "black",
    hskLevel: 9,
  },

  // {
  //   fill: "bg-violet-500",
  //   color: "text-white",
  //   unselected: "dark: bg-gray-800 bg-gray-200",
  //   maxCharacterLevel: 3500,
  //   minCharacterLevel: 0,
  //   level: "all",
  // },
];

export const getHSKLevel = (level: number) => {
  const belt = belts?.find(
    (belt) =>
      belt?.minCharacterLevel <= level && belt?.maxCharacterLevel >= level
  );

  return belt?.hskLevel;
};
