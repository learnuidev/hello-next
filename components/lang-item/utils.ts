export const filterWordsByQuery = (data: any, query: string) => {
  const dataToShow = data?.filter((item: any) => {
    if (!query) {
      return true;
    }

    const containsNativeText = (item?.input || item?.hanzi)?.includes(
      query?.toLowerCase()
    );
    const containsEnText = item?.en?.includes(query?.toLowerCase());
    const containsRomanText = item?.roman?.includes(query?.toLowerCase());
    return containsNativeText || containsEnText || containsRomanText;
  });

  return dataToShow;
};
