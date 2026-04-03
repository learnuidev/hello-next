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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAddBookmarkMutation } from "@/domain/bookmark/use-add-bookmark-mutation";
import { useDeleteBookmarkMutation } from "@/domain/bookmark/use-delete-bookmark-mutation";
import { useListBookmarksQuery } from "@/domain/bookmark/use-list-bookmarks-query";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface WordTableData {
  hanzi: string;
  pinyin: string;
  en: string;
  hskLevel?: number;
  frequency: number;
  input?: string;
}

type SortColumn =
  | "hanzi"
  | "pinyin"
  | "en"
  | "hskLevel"
  | "frequency"
  | "actions";
type SortDirection = "asc" | "desc";

interface ConvoInsightsWordTableProps {
  words: WordTableData[];
  lang: string;
  onWordClick?: (word: any) => void;
}

function WordTableItem({
  word,
  lang,
  onWordClick,
}: {
  lang: string;
  word: WordTableData;
  onWordClick?: (word: any) => void;
}) {
  const addBookmarkMutation = useAddBookmarkMutation();
  const deleteBookmarkMutation = useDeleteBookmarkMutation();
  const { data: bookmarks } = useListBookmarksQuery();

  const [loadingWord, setLoadingWord] = useState<string | null>(null);

  const color = calculateColor({});

  const wordHanzi = word?.hanzi || word?.input || "";
  const bookmarked = bookmarks?.filter(
    (item: any) => item?.hanzi === wordHanzi
  )?.[0];

  return (
    <TableRow
      key={`${word?.hanzi || word?.input}-word-table`}
      onClick={() => onWordClick?.(word)}
      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <TableCell className="font-medium">
        <span className={cn("text-xl", color)}>
          {word?.hanzi || word?.input}
        </span>
      </TableCell>
      <TableCell>{word?.pinyin || "-"}</TableCell>
      <TableCell>{word?.en || "-"}</TableCell>
      <TableCell>{word?.hskLevel ? `HSK ${word.hskLevel}` : "N/A"}</TableCell>
      <TableCell>{word?.frequency || 0}</TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    const hanzi = word?.hanzi || word?.input || "";
                    setLoadingWord(hanzi);
                    if (bookmarked) {
                      deleteBookmarkMutation.mutateAsync({
                        hanzi,
                      });
                      toast.success(`已取消收藏: ${hanzi}`);
                    } else {
                      addBookmarkMutation.mutateAsync({
                        hanzi,
                        en: word?.en,
                        pinyin: word?.pinyin,
                        lang,
                      });
                      toast.success(`已收藏: ${hanzi}`);
                    }
                    setTimeout(() => setLoadingWord(null), 300);
                  }}
                  disabled={
                    loadingWord === wordHanzi ||
                    addBookmarkMutation.isPending ||
                    deleteBookmarkMutation.isPending
                  }
                  className={cn(
                    "p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                    loadingWord === wordHanzi
                      ? "opacity-50 cursor-not-allowed"
                      : bookmarked
                        ? "text-rose-500 dark:text-rose-400"
                        : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {addBookmarkMutation.isPending ||
                  deleteBookmarkMutation.isPending ? (
                    <Icons.loadingSpinner className="w-4 h-4" />
                  ) : bookmarked ? (
                    <Icons.bookmarkSolid className="w-4 h-4" />
                  ) : (
                    <Icons.bookmark className="w-4 h-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{bookmarked ? "取消收藏" : "收藏"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ConvoInsightsWordTable({
  words,
  lang,
  onWordClick,
}: ConvoInsightsWordTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("frequency");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedWords = words.slice().sort((a, b) => {
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
      case "hskLevel":
        aVal = a?.hskLevel ?? 999;
        bVal = b?.hskLevel ?? 999;
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      case "frequency":
        aVal = a?.frequency || 0;
        bVal = b?.frequency || 0;
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
    { key: "hanzi" as SortColumn, label: "词语", width: "w-32" },
    { key: "pinyin" as SortColumn, label: "拼音", width: "w-32" },
    { key: "en" as SortColumn, label: "英文", width: "w-40" },
    { key: "hskLevel" as SortColumn, label: "HSK等级", width: "w-24" },
    { key: "frequency" as SortColumn, label: "频率", width: "w-20" },
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
                  col.key !== "actions" ? () => handleSort(col.key) : undefined
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
          {sortedWords.map((word, idx) => {
            return (
              <WordTableItem
                word={word}
                key={`${word?.hanzi || word?.input}-word-table-${idx}`}
                lang={lang}
                onWordClick={onWordClick}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}