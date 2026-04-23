"use client";

import { defaultPic } from "@/data/default-image-urls";
import { useHandleSearch } from "@/hooks/use-handle-search";
import { useSearchSuggestions } from "@/hooks/use-search-suggestions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchQueryStore } from "./search/state";
import { Icons } from "./ui/icons.v2";

export const SearchInput = ({ autoFocus }: { autoFocus?: boolean }) => {
  // 1. State
  const querySync = useSearchQueryStore((state) => state.querySync);
  const searchSuggestions = useSearchQueryStore(
    (state) => state.searchSuggestions,
  );
  const { isLoading } = useSearchSuggestions();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  // 2. Handlers
  const { handleOnChange, handleOnKeyDown } = useHandleSearch();

  const handleSuggestionClick = (contentId: string) => {
    setShowSuggestions(false);
    router.push(`/convos/${contentId}`);
  };

  return (
    <div className="relative w-full">
      <input
        autoFocus={autoFocus === false ? false : true}
        className={cn(
          "font-extralight border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300 dark:bg-black/10 dark:text-gray-300 placeholder:text-gray-600 opacity-100 border-2 focus:border-none px-2 rounded-full focus:outline-none active:outline-none py-2",
          "w-full",
        )}
        placeholder={"搜索"}
        onChange={handleOnChange}
        value={querySync}
        onKeyDown={handleOnKeyDown}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />

      {showSuggestions && searchSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          <div className="max-h-96 overflow-y-auto">
            {searchSuggestions.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(item.id)}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden mr-3 relative">
                  <img
                    src={
                      item.backgroundImageUrl ||
                      item.backgroundImage ||
                      item.backgroundImageAssetId ||
                      defaultPic
                    }
                    alt={item.title}
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
                <Icons.front className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {showSuggestions && isLoading && querySync.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
          </div>
        </div>
      )}
    </div>
  );
};
