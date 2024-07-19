const formatEndIndex = (w, endIndexes) => {
  return endIndexes.map((x) => {
    const vals = Object.groupBy(w.slice(x.start, x.end), (val) => val.key);

    return {
      roman:
        vals?.undefined?.[0] || vals?.roman?.map((val) => val?.val)?.join(", "),
      en: vals?.examples?.[0]?.isEnglish
        ? vals?.examples?.[0]?.val
        : vals?.en?.length
          ? vals?.en?.map((val) => val?.val)?.join(", ")
          : "",
      lang: "dz",
      type: vals?.type?.[0]?.val,
    };
  });
};
