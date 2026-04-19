// const getMulti = (val: string) => val.split('，').map(item => item.split("、")).flat()
export const getMulti = (val: string) => {
  if (isMulti(val)) {
    return [val];
  }
  return val
    ?.split("，")
    ?.map((x) => x.split("。"))
    ?.flat();
};

export const isMulti = (val: string) => {
  return val?.length < 24;
};
