export const smartSplit = ({
  input,
  lang,
}: {
  input: string;
  lang: string;
}) => {
  try {
    if (lang === "zh") {
      return (input || "")?.split("");
    }

    return input?.split(" ")?.reduce((acc: any, curr) => {
      return acc.concat([curr?.toLowerCase(), " "]);
    }, []);
  } catch (err) {
    return [""];
  }
};
