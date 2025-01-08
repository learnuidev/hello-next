const slackParser = (str) =>
  str
    ?.split("\n")
    .filter(Boolean)
    .map((x) => x.split(":"))
    .map((x) => {
      const [minutes, seconds, text] = x;
      return {
        start: parseInt(minutes) * 60 + parseInt(seconds),
        input: text,
      };
    })
    .map((x, i, ctx) => {
      if (i === ctx?.length - 1) {
        return {
          ...x,
          end: x.start + 1,
        };
      }

      return {
        ...x,
        end: ctx?.[i + 1].start,
      };
    });

module.exports = {
  slackParser,
};
