import { useCallback, useEffect, useMemo, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useSearchDialogState } from "./search-dialog.state";

import { useListComponents } from "@/domain/lesson/component.queries";
import { getHumanPinyin } from "@/app/nmm/nmm-utils/get-human-pinyin";
import { CharacterSearchResult } from "@/app/(auth)/insights/insights-v2/precision-insight-view/character-search-result";

export function SearchDialogInner({
  isOpen,
  closeSettings,
}: {
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}) {
  const [searchInput, setSearchInput] = useState("");

  const { data: components } = useListComponents();

  const searchResults = useMemo(() => {
    if (!searchInput) {
      return [];
    }
    const filtered = components?.filter(
      (result) => getHumanPinyin(result) === searchInput
    );

    if (filtered?.length === 0) {
      return components?.filter((result) =>
        getHumanPinyin(result)?.includes(searchInput)
      );
    } else {
      return filtered;
    }
  }, [components, searchInput]);

  console.log("search results", searchResults);
  return (
    <Dialog open={isOpen}>
      <DialogContent
        onClick={() => {
          closeSettings();
        }}
        className="sm:max-w-2xl border-gray-900 bg-gray-50 dark:bg-black mt-[-100px]"
      >
        <div className="m-4">
          <div>
            <input
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
                // handleChangeDebounced(event.target.value);
              }}
              className="w-full h-12 p-2 my-4"
              placeholder="search"
            />
          </div>

          <CharacterSearchResult
            className="pb-4 overflow-y-auto h-80"
            nothingClassName={"mt-8"}
            searchResults={searchResults}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function isEditingContent(event: any) {
  let element = event.target;
  let tagName = element.tagName;
  return (
    element.isContentEditable ||
    tagName === "INPUT" ||
    tagName === "SELECT" ||
    tagName === "TEXTAREA"
  );
}

function useDocSearchKeyboardEvents({ isOpen, onOpen, onClose }: any) {
  useEffect(() => {
    function onKeyDown(event: any) {
      function open() {
        // We check that no other DocSearch modal is showing before opening
        // another one.
        if (!document.body.classList.contains("DocSearch--active")) {
          onOpen();
        }
      }

      if (
        (event.keyCode === 27 && isOpen) ||
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (!isEditingContent(event) && event.key === "/" && !isOpen)
      ) {
        event.preventDefault();

        if (isOpen) {
          onClose();
        } else if (!document.body.classList.contains("DocSearch--active")) {
          open();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onOpen, onClose]);
}

export function SearchDialog() {
  const [query, setQuery] = useState("");

  const isOpen = useSearchDialogState((state) => state.isOpen);
  const setOpen = useSearchDialogState((state) => state.setIsOpen);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
  });

  // if (!authUser) {
  //   return null;
  // }

  return (
    <div>
      <SearchDialogInner
        isOpen={isOpen}
        openSettings={onOpen}
        closeSettings={onClose}
      />
    </div>
  );
}
