import { el } from "date-fns/locale";
import { scan } from "./scan";
// @ts-ignore
import lodashPick from "lodash.pick";
import { joinApi } from "./join.api";

export const maxDuration = 60;

export async function join({ select, join }: { select: any; join: any }) {
  const [[tableA, tableAKey, selectA], [tableB, tableBKey, selectB]] = join;

  const joinExample = [
    ["table-a", "sentenceId"],
    ["table-b", "hanzi"],
  ];
  const respA = await scan({ TableName: tableA }, { transform: true });
  const respB = await scan({ TableName: tableB }, { transform: true });

  const joinedData = await joinApi({
    select,
    join: [
      [respA, tableAKey, selectA],
      [respB, tableBKey, selectB],
    ],
  });

  return joinedData;
}
