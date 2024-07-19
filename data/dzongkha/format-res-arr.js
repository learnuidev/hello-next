const formatResArr = (resArr) => ({
  title: resArr[2],
  usefulPhrases: {
    title: resArr[9],
    phrases: resArr
      ?.slice(10, 88)
      .map((val, idx, ctx) => {
        if (idx % 2 === 0) {
          const en = ctx[idx + 1];
          return {
            roman: val.trim(),
            en: en.trim(),
            lang: "dz",
          };
        }
      })
      .filter(Boolean),
  },
  words: resArr
    .slice(89, 10000000000)
    .map((str) => {
      const isEnglish = str
        ?.split("")
        .every((val) =>
          "abcdefghijklmnopqrstuvwxyz"?.includes(val.toLowerCase())
        );

      if (isEnglish) {
        return {
          key: "en",
          val: str,
        };
      }

      const isType =
        str
          ?.split(" ")?.[1]
          ?.split("")
          .every((val) =>
            "abcdefghijklmnopqrstuvwxyz"?.includes(val.toLowerCase())
          ) &&
        str
          ?.split(" ")?.[0]
          ?.split("")
          .every(
            (val) => !"abcdefghijklmnopqrstuvwxyz"?.includes(val.toLowerCase())
          );

      if (isType) {
        return {
          key: "type",
          val: str,
        };
      }

      const isExamples = str?.includes("/");

      if (isExamples) {
        const isEnglish = str.split("/").every((val) =>
          val
            .trim()
            .split("")
            .every((v) =>
              "abcdefghijklmnopqrstuvwxyz"?.includes(v?.toLowerCase())
            )
        );

        return {
          key: "examples",
          isEnglish,
          end: true,
          val: str,
        };
      }

      return str;
    })
    .map((val, idx, ctx) => {
      if (idx === 0) {
        return {
          key: "roman",
          val,
        };
      }

      const prevVal = ctx?.[idx - 1];

      if (prevVal?.end) {
        return {
          key: "roman",
          val: val,
        };
      }

      return val;
    }),
});
