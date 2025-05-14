export const smartSplit = ({
  input,
  lang,
}: {
  input: string;
  lang: string;
}) => {
  if (lang === "zh") {
    return input?.split("");
  }

  return input?.split(" ");
};
