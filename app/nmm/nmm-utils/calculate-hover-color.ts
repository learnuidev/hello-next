export const calculateHoverColor = (dict: any) => {
  switch (parseInt(dict?.tone)) {
    case 1:
      return "hover:dark:text-rose-400";
    case 2:
      return "hover:dark:text-teal-400";
    case 3:
      return "hover:dark:text-purple-400";
    case 4:
      return "hover:dark:text-pink-400";
    case 5:
      return "hover:dark:text-white";
    default:
      return "hover:dark:text-white";
  }
};
