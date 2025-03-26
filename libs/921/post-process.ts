import { getTotalSeconds } from "../youtube/get-total-seconds";

function partition(arr: any, size: any) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function applyProcessPrimitive({ content, process, variables }: any) {
  switch (process.type.toLowerCase()) {
    // case "list-grammars":
    //   return "";
    case "get-total-seconds":
      return getTotalSeconds(content);
    case "get":
      return content?.[process.key];
    case "concat":
      if (process.variables) {
        return process?.variables
          ?.map((variable: string) => {
            return variables?.[variable];
          })
          .flat();
      }
    case "trim":
      return content.trim();
    case "replace":
      return content.replace(process.from, process.to);
    case "replace-all":
      return content.replaceAll(process.from, process.to);
    case "replace-regex":
      return content.replace(new RegExp(process.from), process.to);
    case "replace-all-regex":
      return content.replaceAll(new RegExp(process.from), process.to);
    case "partition":
      return partition(content, process.value);
    case "slice":
      return content.slice(...process.values);
    case "split":
      return content.split(process.condition || process.value);
    case "get-index":
      return content[process.indexValue];
    default:
      return content;
  }
}

function applyProcess({ content, process, variables }: any) {
  if (process.skip) {
    return content;
  }
  try {
    switch (process.type.toLowerCase()) {
      // case "list-grammars":
      //   return "";
      case "get":
        return content?.[process.key];
      case "concat":
        if (process.variables) {
          return process?.variables
            ?.map((variable: string) => {
              return variables?.[variable];
            })
            .flat();
        }
      case "trim":
        return content.trim();
      case "replace":
        return content.replace(process.from, process.to);
      case "replace-all":
        return content.replaceAll(process.from, process.to);
      case "replace-regex":
        return content.replace(new RegExp(process.from), process.to);
      case "replace-all-regex":
        return content.replaceAll(new RegExp(process.from), process.to);
      case "partition":
        return partition(content, process.value);
      case "slice":
        return content.slice(...process.values);
      case "split":
        return content.split(process.condition || process.value);
      case "get-index":
        return content[process.indexValue];

      // Array Operations
      case "filter":
        return content.filter((item: any) => {
          switch (process.conditions[0]?.toLowerCase()) {
            case "boolean":
              return Boolean(item);
            case "eq":
              return item === process.conditions[1];
            case "not-eq":
              return item !== process.conditions[1];
            case "includes":
              return item.includes(process.conditions[1]);
            default:
              return item;
          }
        });
      case "map":
        if (process?.conditions?.oddEvenIndex) {
          return content
            ?.map((item: any, idx: any) => {
              if (idx % 2 === 0) {
                const evenIndexKey = process?.conditions?.oddEvenIndex?.even;
                const oddIndexKey = process?.conditions?.oddEvenIndex?.odd;

                return {
                  [evenIndexKey]: item,
                  [oddIndexKey]: content?.[idx + 1],
                };
              }
            })
            .filter(Boolean);
        }

        if (process.object) {
          console.log("PROCESSS=====");
          return content?.map((item: any) => {
            let objectKeys = Object.keys(process.object) || [];

            console.log("KEYS", objectKeys);
            return objectKeys.reduce((acc, objectKey) => {
              console.log("NEW ITEM", {
                content: item,
                processes: process.object?.[objectKey]?.processes,
              });
              const newItem = postProcessPrimitive({
                content: item,

                processes: process.object?.[objectKey]?.processes,
              });

              return {
                ...acc,
                [objectKey]: newItem,
              };
            }, {});
          });
        }
        return content.map((item: any) => {
          if (process?.conditions?.type) {
            switch (process?.conditions?.type?.toLowerCase()) {
              case "transform":
                return {
                  [process?.conditions?.key]: item,
                };
              default:
                return item;
            }
          }
          switch (process.conditions[0]?.toLowerCase()) {
            case "transform":
              return {
                [process.conditions[1]]: item,
              };

            case "split":
              return item.split(process.conditions[1]);

            case "slice":
              return item.slice(...process.conditions[1]);
            case "replace":
              return item.replace(process.conditions[1], process.conditions[2]);
            case "replace-regex":
              return item.replace(
                new RegExp(process.conditions[1]),
                process.conditions[2]
              );
            case "replace-all":
              return item.replaceAll(
                process.conditions[1],
                process.conditions[2]
              );
            case "replace-all-regex":
              return item.replaceAll(
                new RegExp(process.conditions[1]),
                process.conditions[2]
              );
            case "trim":
              return item.trim();
            case "multiply":
              switch (typeof item) {
                case "string":
                  return item.repeat(process.conditions[1]);
                case "number":
                  return item * process.conditions[1];
                default:
                  return item;
              }
            default:
              return item;
          }
        });
      default:
        return content;
    }
  } catch (err: any) {
    return {
      error: err.message,
      process,
      content,
    };
  }
}

function postProcessPrimitive({ content, processes, variables }: any) {
  return processes.reduce((acc: any, process: any) => {
    return applyProcessPrimitive({ process, content: acc, variables });
  }, content);
}

export function postProcess({ content, processes, variables }: any) {
  return processes.reduce((acc: any, process: any) => {
    return applyProcess({ process, content: acc, variables });
  }, content);
}
