export const calculateColor = (dict: any) => {
  switch (parseInt(dict?.tone)) {
    case 1:
      return "hover:text-rose-400 text-rose-400";
    case 2:
      return "hover:text-teal-400 text-teal-400";
    case 3:
      return "hover:text-purple-400 text-purple-400";
    case 4:
      return "hover:text-pink-400 text-pink-400";
    case 5:
      return "text-gray-600 hover:dark:text-white";
    default:
      return "";
  }
};

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
    fill: "bg-white",
    color: "text-white",
    unselected: "bg-gray-800",
    maxCharacterLevel: 105,
    minCharacterLevel: 0,
    level: "white",
    hskLevel: 1,
  },

  {
    fill: "bg-yellow-600",
    unselected: "bg-gray-800",
    color: "text-yellow-500",
    maxCharacterLevel: 300,
    minCharacterLevel: 105,
    level: "yellow",
    hskLevel: 2,
  },
  {
    fill: "bg-green-600",
    unselected: "bg-gray-800",
    color: "text-green-500",
    maxCharacterLevel: 600,
    minCharacterLevel: 300,
    level: "green",
    hskLevel: 3,
  },
  {
    fill: "bg-blue-600",
    unselected: "bg-gray-800",
    color: "text-blue-500",
    maxCharacterLevel: 1000,
    minCharacterLevel: 600,
    level: "blue",
    hskLevel: 4,
  },
  {
    fill: "bg-rose-500",
    unselected: "bg-gray-800",
    color: "text-red-500",
    maxCharacterLevel: 1500,
    minCharacterLevel: 1000,
    level: "red",
    hskLevel: 5,
  },
  {
    fill: "bg-pink-500",
    unselected: "bg-gray-800",
    color: "text-pink-500",
    maxCharacterLevel: 2200,
    minCharacterLevel: 1500,
    level: "pink",
    hskLevel: 6,
  },
  {
    fill: "bg-gray-500",
    unselected: "bg-slate-800",
    color: "text-gray-500",
    maxCharacterLevel: 3050,
    minCharacterLevel: 2200,
    level: "black",
    hskLevel: 9,
  },

  // {
  //   fill: "bg-violet-500",
  //   color: "text-white",
  //   unselected: "bg-gray-800",
  //   maxCharacterLevel: 3500,
  //   minCharacterLevel: 0,
  //   level: "all",
  // },
];
