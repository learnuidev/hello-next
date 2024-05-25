// @ts-ignore
import lodashPick from "lodash.pick";

export const maxDuration = 60;

export async function joinApi({ select, join }: { select: any; join: any }) {
  const [[respA, tableAKey, selectA], [respB, tableBKey, selectB]] = join;

  const joinExample = [
    ["resp-a", "table-a", "sentenceId"],
    ["res-b", "table-b", "hanzi"],
  ];

  return respA.Items?.map((itemAItem: any) => {
    const itemBItem = respB?.Items?.find((itemB: any) => {
      return itemAItem[tableAKey] === itemB[tableBKey];
    });

    let selectedA;
    let selectedB;
    if (selectA?.[0] === "*") {
      selectedA = itemAItem;
    } else {
      selectedA = lodashPick(itemAItem, selectA);
    }

    if (selectB?.[0] === "*") {
      selectedB = itemBItem;
    } else {
      selectedB = lodashPick(itemBItem, selectB);
    }

    return {
      ...selectedA,
      ...selectedB,
    };
  });
}
