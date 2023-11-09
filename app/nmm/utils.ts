export const calculateColor = (dict: any) => {
  switch (parseInt(dict?.tone)) {
    case 1:
      return "text-red-400";
    case 2:
      return "text-green-500";
    case 3:
      return "text-purple-400";
    case 4:
      return "text-pink-400";
    default:
      return "text-gray-600 dark:text-white";
  }
};

export const belts = [
  {
    fill: "bg-slate-100",
    unselected: "bg-slate-800",
    maxCharacterLevel: 105,
    level: "white",
  },
  {
    fill: "bg-yellow-500",
    unselected: "bg-yellow-800",
    maxCharacterLevel: 300,
    level: "yellow",
  },
  {
    fill: "bg-green-500",
    unselected: "bg-green-800",
    maxCharacterLevel: 600,
    level: "green",
  },
  {
    fill: "bg-blue-500",
    unselected: "bg-blue-800",
    maxCharacterLevel: 1200,
    level: "blue",
  },
  {
    fill: "bg-red-500",
    unselected: "bg-red-800",
    maxCharacterLevel: 2000,
    level: "red",
  },
  {
    fill: "bg-black",
    unselected: "bg-slate-800",
    maxCharacterLevel: 3000,
    level: "black",
  },
];
