const componentParser1 = (res) =>
  res.component.split("\n").map((str) => {
    const indentationIndex = str
      ?.split("")
      .findIndex((item) => item.trim() !== "");
    if (str.includes(`import`) || str.includes(`import`)) {
      if (str?.includes(";")) {
        return {
          type: "dependency",
          complete: true,
          value: str,
          indentationIndex,
        };
      }

      return {
        type: "dependency",
        begin: true,
        value: str,
        indentationIndex,
      };
    }

    if (str.includes(`from`)) {
      if (str?.includes(";")) {
        return {
          type: "dependency",
          end: true,
          value: str,
          indentationIndex,
        };
      }

      return {
        type: "dependency",
        partial: true,
        value: str,
        indentationIndex,
      };
    }

    if (str.includes("export const")) {
      const name = str.split("export const ")[1].split("=")[0];
      const ucs = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
      return {
        type: "export-const",
        name,
        variant: ucs?.includes(name?.[0]) ? "Component" : "todo",
        value: str,
        indentationIndex,
      };
    }

    if (str.trim()?.split(",")?.length === 2) {
      return {
        type: "argument-destructuring",
        name: str.trim()?.split(",")[0],
        value: str,
        indentationIndex,
      };
    }

    if (!str.trim()) {
      return {
        type: "blank-line",
        value: str,
        indentationIndex,
      };
    }

    return {
      type: "todo",
      value: str,
      indentationIndex,
    };
  });

module.exports.componentParser1 = componentParser1;
