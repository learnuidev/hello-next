// const getMulti = (val: string) => val.split('，').map(item => item.split("、")).flat()
export const getMulti = (val: string) => val?.split("，");
