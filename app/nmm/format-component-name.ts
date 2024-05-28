export const formatComponentName = (component: { en: string }, value = 3) => {
  return component?.en?.includes("/")
    ? component?.en
        ?.split("/")
        ?.slice(0, value)
        ?.map((item: any) => {
          if (item?.includes("(")) {
            return item?.split("(")[0];
          }
          return item;
        })
        .join(", ")
    : component?.en
        ?.split(",")
        ?.slice(0, value)
        ?.map((item: any) => {
          if (item?.includes("(")) {
            return item?.split("(")[0];
          }
          return item;
        })
        .join(", ");
};
