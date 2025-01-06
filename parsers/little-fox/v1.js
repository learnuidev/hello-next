const littleFoxParser = () =>
  JSON.stringify(
    document
      .querySelectorAll(".desc")[1]
      .children[0].children[0].innerHTML.split("\n")
      .map((x) =>
        x.replaceAll("<br>", "")?.trim()?.replaceAll("&nbsp;", "")?.trim()
      )
      .filter(Boolean)
      .map((item) => {
        return {
          start: 0,
          end: 0,
          input: item,
          lang: "zh",
        };
      })
  );
