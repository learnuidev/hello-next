"use client";

import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { Icons } from "@/components/ui/icons.v2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface UnknownCharacterTableData {
  input: string;
  hskLevel: number | null;
  isCharacter: boolean;
  isHsk: boolean;
  pinyin: string;
  en: string;
  createdAt: number;
  id: string;
  frequency: number;
}

type SortColumn =
  | "hanzi"
  | "pinyin"
  | "en"
  | "createdAt"
  | "hskLevel"
  | "type"
  | "frequency"
  | "actions";
type SortDirection = "asc" | "desc";

interface ConvoInsightsUnknownTableProps {
  unknowns: UnknownCharacterTableData[];
  lang: string;
  onCharacterClick: (char: any) => void;
}

function UnknownTableItem({
  item,
  onCharacterClick,
}: {
  item: UnknownCharacterTableData;
  onCharacterClick: (char: any) => void;
}) {
  const color = calculateColor({});

  const getCharacterTypeBadge = () => {
    if (!item.isCharacter) {
      if (item.isHsk && item.hskLevel) {
        return {
          label: `HSK ${item.hskLevel} (词)`,
          className:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        };
      }
      return {
        label: "非单字",
        className:
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      };
    }

    if (item.isHsk && item.hskLevel) {
      return {
        label: `HSK ${item.hskLevel}`,
        className:
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      };
    }

    return {
      label: "非HSK",
      className:
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };
  };

  const typeBadge = getCharacterTypeBadge();

  return (
    <TableRow
      key={`${item?.input}-unknown-table-${item.id}`}
      onClick={() => onCharacterClick(item)}
      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <TableCell className="font-medium">
        <span className={cn("text-xl", color)}>{item?.input}</span>
      </TableCell>
      <TableCell>{item?.pinyin || "-"}</TableCell>
      <TableCell>{item?.en || "-"}</TableCell>
      <TableCell>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            typeBadge.className
          )}
        >
          {typeBadge.label}
        </span>
      </TableCell>
      <TableCell>{item?.hskLevel ? `HSK ${item.hskLevel}` : "N/A"}</TableCell>
      <TableCell>{item?.frequency || 0}</TableCell>
      <TableCell>
        {item?.createdAt
          ? new Date(item.createdAt).toLocaleDateString("zh-CN")
          : "-"}
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
          >
            <Icons.bookmark className="w-4 h-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ConvoInsightsUnknownTable({
  unknowns,
  lang,
  onCharacterClick,
}: ConvoInsightsUnknownTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedUnknowns = [...unknowns].sort((a, b) => {
    let aVal: any, bVal: any;

    switch (sortColumn) {
      case "hanzi":
        aVal = a?.input || "";
        bVal = b?.input || "";
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal, "zh-CN")
          : bVal.localeCompare(aVal, "zh-CN");
      case "pinyin":
        aVal = a?.pinyin || "";
        bVal = b?.pinyin || "";
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      case "en":
        aVal = a?.en || "";
        bVal = b?.en || "";
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      case "createdAt":
        aVal = a?.createdAt || 0;
        bVal = b?.createdAt || 0;
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      case "frequency":
        aVal = a?.frequency || 0;
        bVal = b?.frequency || 0;
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      case "hskLevel":
        aVal = a?.hskLevel ?? 999;
        bVal = b?.hskLevel ?? 999;
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      default:
        return 0;
    }
  });

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return <span className="ml-2 text-gray-400">⇅</span>;
    }
    return (
      <span className="ml-2 text-gray-700 dark:text-gray-300">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const columns = [
    { key: "hanzi" as SortColumn, label: "汉字", width: "w-20" },
    { key: "pinyin" as SortColumn, label: "拼音", width: "w-28" },
    { key: "en" as SortColumn, label: "英文", width: "w-32" },
    { key: "type" as SortColumn, label: "类型", width: "w-24" },
    { key: "hskLevel" as SortColumn, label: "HSK等级", width: "w-24" },
    { key: "frequency" as SortColumn, label: "频率", width: "w-20" },
    { key: "createdAt" as SortColumn, label: "标记日期", width: "w-28" },
    { key: "actions" as SortColumn, label: "操作", width: "w-24" },
  ];

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(
                  col.key !== "actions"
                    ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    : "",
                  col.width
                )}
                onClick={
                  col.key !== "actions"
                    ? () =>
                        handleSort(
                          col.key === "type" ? ("hanzi" as SortColumn) : col.key
                        )
                    : undefined
                }
              >
                <div className="flex items-center">
                  {col.label}
                  {col.key !== "actions" && renderSortIcon(col.key)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUnknowns.map((item, idx) => {
            return (
              <UnknownTableItem
                item={item}
                key={`${item?.input}-unknown-table-${idx}`}
                onCharacterClick={onCharacterClick}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
