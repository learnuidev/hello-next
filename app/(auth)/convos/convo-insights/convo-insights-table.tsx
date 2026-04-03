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
import {
  useAddCharacterMutation,
  useUpdateCharacterStatusMutation,
} from "@/domain/lesson/character.mutations";
import { ICharacter } from "@/domain/character/character.types";
import { useDeleteCharacterMutation } from "@/domain/lesson/use-delete-character-mutation";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface CharacterTableData extends ICharacter {
  input: string;
  isLearned: boolean;
  frequency: number;
  mandarinoIndex?: number;
}

type SortColumn =
  | "hanzi"
  | "pinyin"
  | "en"
  | "createdAt"
  | "rightCount"
  | "frequency"
  | "mandarinoIndex"
  | "status"
  | "actions";
type SortDirection = "asc" | "desc";

interface ConvoInsightsTableProps {
  characters: CharacterTableData[];
  lang: string;
  onCharacterClick: (char: any) => void;
}

const formatDate = (timestamp: number) => {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleDateString("zh-CN");
};

function TableItem({
  char,
  onCharacterClick,
  lang,
}: {
  lang: string;
  char: CharacterTableData;
  onCharacterClick: (char: any) => void;
}) {
  const addCharacterMutation = useAddCharacterMutation();
  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();
  const addBookmarkMutation = useAddBookmarkMutation();
  const deleteBookmarkMutation = useDeleteBookmarkMutation();
  const { data: bookmarks } = useListBookmarksQuery();

  const [loadingCharacter, setLoadingCharacter] = useState<string | null>(null);

  const color = calculateColor({});

  const deleteCharacterMutation = useDeleteCharacterMutation();

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      DISCOVERED: {
        label: "已学",
        className:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      },
      learned: {
        label: "已学",
        className:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      },
      forgotten: {
        label: "掌握",
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      },
    };
    return (
      statusMap[status] || {
        label: "未学",
        className:
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      }
    );
  };

  const statusBadge = getStatusBadge(char.status);
  const isMastered = char.status === "forgotten";
  const isLearned = char.isLearned || isMastered;
  const charHanzi = char?.hanzi || char?.input || "";
  const bookmarked = bookmarks?.filter(
    (item: any) => item?.hanzi === charHanzi
  )?.[0];

  return (
    <TableRow
      key={`${char?.hanzi || char?.input}-table-${JSON.stringify(char)}`}
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
      <TableCell>{char?.mandarinoIndex || 0}</TableCell>
      <TableCell>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            statusBadge.className
          )}
        >
          {statusBadge.label}
        </span>
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    const hanzi = char?.hanzi || char?.input || "";
                    setLoadingCharacter(hanzi);
                    if (bookmarked) {
                      deleteBookmarkMutation.mutateAsync({
                        hanzi,
                      });
                      toast.success(`已取消收藏: ${hanzi}`);
                    } else {
                      addBookmarkMutation.mutateAsync({
                        hanzi,
                        en: char?.en,
                        pinyin: char?.pinyin,
                        lang,
                      });
                      toast.success(`已收藏: ${hanzi}`);
                    }
                    setTimeout(() => setLoadingCharacter(null), 300);
                  }}
                  disabled={
                    loadingCharacter === charHanzi ||
                    addBookmarkMutation.isPending ||
                    deleteBookmarkMutation.isPending
                  }
                  className={cn(
                    "p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                    loadingCharacter === charHanzi
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

            {!isLearned && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      const hanzi = char?.hanzi || char?.input || "";
                      setLoadingCharacter(hanzi);
                      (addCharacterMutation as any).mutate({
                        hanzi: hanzi,
                        journeyId: "",
                        status: "learned",
                        pinyin: char?.pinyin,
                        en: char?.en,
                        story: char?.story,
                        lang: lang,
                      });
                      toast.success(`已学习: ${hanzi}`);
                      setTimeout(() => setLoadingCharacter(null), 500);
                    }}
                    disabled={loadingCharacter === charHanzi}
                    className={cn(
                      "p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                      loadingCharacter === charHanzi
                        ? "opacity-50 cursor-not-allowed"
                        : "text-gray-600 dark:text-gray-400"
                    )}
                  >
                    {addCharacterMutation.isPending ? (
                      <Icons.loadingSpinner className="w-4 h-4" />
                    ) : (
                      <Icons.lightBulb className="w-4 h-4" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>学习</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={async () => {
                    const hanzi = char?.hanzi || char?.input || "";
                    setLoadingCharacter(hanzi);

                    try {
                      if (!isLearned) {
                        await (addCharacterMutation as any).mutateAsync({
                          hanzi: hanzi,
                          journeyId: "",
                          status: "learned",
                          pinyin: char?.pinyin,
                          en: char?.en,
                          story: char?.story,
                          lang: lang,
                        });
                      }

                      await (updateCharacterStatusMutation as any).mutateAsync({
                        characterId: char?.id || hanzi,
                        status: "forgotten",
                      });

                      toast.success(`已掌握: ${hanzi}`);
                    } catch (error) {
                      toast.error(`掌握失败: ${hanzi}`);
                    } finally {
                      setTimeout(() => setLoadingCharacter(null), 500);
                    }
                  }}
                  disabled={loadingCharacter === charHanzi}
                  className={cn(
                    "p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                    loadingCharacter === charHanzi
                      ? "opacity-50 cursor-not-allowed"
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {updateCharacterStatusMutation.isPending ? (
                    <Icons.loadingSpinner className="w-4 h-4" />
                  ) : (
                    <Icons.fire className="w-4 h-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMastered ? "已掌握" : "掌握"}</p>
              </TooltipContent>
            </Tooltip>

            {char?.id && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onDoubleClick={async () => {
                      const hanzi = char?.hanzi || char?.input || "";
                      setLoadingCharacter(hanzi);

                      try {
                        deleteCharacterMutation.mutateAsync({
                          id: char?.id || hanzi,
                        } as any);

                        toast.success(`已取消掌握: ${hanzi}`);
                      } catch (error) {
                        toast.error(`取消掌握失败: ${hanzi}`);
                      } finally {
                        setTimeout(() => setLoadingCharacter(null), 500);
                      }
                    }}
                    disabled={deleteCharacterMutation.isPending}
                    className={cn(
                      "p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                      loadingCharacter === charHanzi
                        ? "opacity-50 cursor-not-allowed"
                        : "text-gray-600 dark:text-gray-400"
                    )}
                  >
                    {deleteCharacterMutation.isPending ? (
                      <Icons.loadingSpinner className="w-4 h-4" />
                    ) : (
                      <Icons.trash className="w-4 h-4" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>取消掌握</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ConvoInsightsTable({
  characters,
  lang,
  onCharacterClick,
}: ConvoInsightsTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

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
        case "mandarinoIndex":
          aVal = a?.mandarinoIndex || 0;
          bVal = b?.mandarinoIndex || 0;
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
    { key: "createdAt" as SortColumn, label: "学习日期", width: "w-28" },
    { key: "rightCount" as SortColumn, label: "练习次数", width: "w-20" },
    { key: "frequency" as SortColumn, label: "频率", width: "w-20" },
    {
      key: "mandarinoIndex" as SortColumn,
      label: "橙子指数",
      width: "w-24 text-orange-500",
    },
    { key: "status" as SortColumn, label: "状态", width: "w-24" },
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
          {sortedCharacters.map((char, idx) => {
            return (
              <TableItem
                char={char}
                key={`${char?.hanzi || char?.input}-table-${idx}`}
                lang={lang}
                onCharacterClick={onCharacterClick}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
