export const calculateHoverColor = (dict: any) => {
  switch (parseInt(dict?.tone)) {
    case 1:
      return "hover:text-rose-400";
    case 2:
      return "hover:text-teal-400";
    case 3:
      return "hover:text-purple-400";
    case 4:
      return "hover:text-pink-400";
    case 5:
      return "hover:dark:text-white hover:text-black";
    default:
      return "hover:dark:text-white hover:text-black";
  }
};
