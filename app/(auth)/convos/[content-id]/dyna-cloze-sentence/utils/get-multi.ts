// const getMulti = (val: string) => val.split('，').map(item => item.split("、")).flat()
export const getMulti = (val: string) =>
  val
    ?.split("，")
    ?.map((x) => x.split("。"))
    ?.flat();

export const isMulti = (val: string) => {
  return getMulti(val)?.length > 1;
};
