"use client";

import { GridBankMediaContent } from "../modules/media/media.types";
import { ContentItemPreview } from "./content-item-preview";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useMemo } from "react";

const COLUMNS = {
  sm: 3,
  md: 4,
  lg: 4,
};

export const ContentsList = ({
  gridBankContents,
}: {
  gridBankContents: GridBankMediaContent[];
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { rowCount, itemsByRow } = useMemo(() => {
    const maxColumns = Math.max(COLUMNS.sm, COLUMNS.md, COLUMNS.lg);
    const rowCount = Math.ceil(gridBankContents.length / maxColumns);
    const itemsByRow: GridBankMediaContent[][] = [];

    for (let i = 0; i < rowCount; i++) {
      const startIndex = i * maxColumns;
      const endIndex = startIndex + maxColumns;
      itemsByRow.push(gridBankContents.slice(startIndex, endIndex));
    }

    return { rowCount, itemsByRow };
  }, [gridBankContents]);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 3,
  });

  return (
    <div ref={parentRef} className="h-100vh overflow-auto p-4">
      <div
        className="relative"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowItems = itemsByRow[virtualRow.index];
          return (
            <div
              key={`row-${virtualRow.index}`}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className="absolute left-0 top-0 w-full"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                {rowItems.map((content) => (
                  <ContentItemPreview
                    key={content.video_id}
                    content={content}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
