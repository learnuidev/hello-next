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
  if (val?.length < 24) {
    return false;
  }
  return getMulti(val)?.length > 1;
};
