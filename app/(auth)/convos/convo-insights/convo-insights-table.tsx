"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICharacter } from "@/domain/lesson/character.queries";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

interface CharacterTableData extends ICharacter {
  input: string;
  isLearned: boolean;
  frequency: number;
}

type SortColumn = "hanzi" | "pinyin" | "en" | "createdAt" | "rightCount" | "frequency" | "status";
type SortDirection = "asc" | "desc";

interface ConvoInsightsTableProps {
  characters: CharacterTableData[];
  lang: string;
  onCharacterClick: (char: any) => void;
}

export function ConvoInsightsTable({ characters, lang, onCharacterClick }: ConvoInsightsTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      learned: { label: "已学", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
      forgotten: { label: "掌握", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    };
    return statusMap[status] || { label: "未学", className: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300" };
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return "-";
    return new Date(timestamp).toLocaleDateString("zh-CN");
  };

  const color = calculateColor({});

  const sortedCharacters = useMemo(() => {
    const sorted = [...characters];
    sorted.sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortColumn) {
        case "hanzi":
          aVal = a?.hanzi || a?.input || "";
          bVal = b?.hanzi || b?.input || "";
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
        case "rightCount":
          aVal = a?.rightCount || 0;
          bVal = b?.rightCount || 0;
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        case "frequency":
          aVal = a?.frequency || 0;
          bVal = b?.frequency || 0;
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        case "status":
          const statusOrder = { learned: 1, forgotten: 2 };
          aVal = statusOrder[a?.status as keyof typeof statusOrder] || 3;
          bVal = statusOrder[b?.status as keyof typeof statusOrder] || 3;
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        default:
          return 0;
      }
    });
    return sorted;
  }, [characters, sortColumn, sortDirection]);

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
    return <span className="ml-2 text-gray-700 dark:text-gray-300">{sortDirection === "asc" ? "↑" : "↓"}</span>;
  };

  const columns = [
    { key: "hanzi" as SortColumn, label: "汉字", width: "w-24" },
    { key: "pinyin" as SortColumn, label: "拼音", width: "" },
    { key: "en" as SortColumn, label: "英文", width: "" },
    { key: "createdAt" as SortColumn, label: "学习日期", width: "" },
    { key: "rightCount" as SortColumn, label: "练习次数", width: "" },
    { key: "frequency" as SortColumn, label: "频率", width: "" },
    { key: "status" as SortColumn, label: "状态", width: "" },
  ];

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn("cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", col.width)}
                onClick={() => handleSort(col.key)}
              >
                <div className="flex items-center">
                  {col.label}
                  {renderSortIcon(col.key)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCharacters.map((char, idx) => {
            const statusBadge = getStatusBadge(char.status);
            return (
              <TableRow
                key={`${char?.hanzi || char?.input}-table-${idx}`}
                onClick={() => onCharacterClick(char)}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <TableCell className="font-medium">
                  <span className={cn("text-xl", color)}>
                    {char?.hanzi || char?.input}
                  </span>
                </TableCell>
                <TableCell>{char?.pinyin || "-"}</TableCell>
                <TableCell>{char?.en || "-"}</TableCell>
                <TableCell>{formatDate(char?.createdAt)}</TableCell>
                <TableCell>{char?.rightCount || 0}</TableCell>
                <TableCell>{char?.frequency || 0}</TableCell>
                <TableCell>
                  <span className={cn("px-2 py-1 rounded-full text-xs font-medium", statusBadge.className)}>
                    {statusBadge.label}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
