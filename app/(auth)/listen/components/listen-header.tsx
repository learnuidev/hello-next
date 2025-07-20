"use client";

import { Icons } from "@/components/ui/icons.v2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListenState } from "../hooks/use-listen-state";
import { ContentType, FilterType } from "../listen.types";
import { useNewConvoStore } from "@/components/step";

export function ListenHeader() {
  const {
    contentType,
    setContentType,
    filterType,
    setFilterType,
    addNewContent,
    setAddNewContent,
    addNew,
    setAddNew,
    setAddNewBook,
    addNewBook,
  } = useListenState();

  console.log("ADD NEW", addNew);

  const setStep = useNewConvoStore((state) => state.setStep);
  return (
    <header className="flex justify-between items-center">
      <div
        className="text-xl"
        onClick={() => {
          setAddNew(!addNew);
          setAddNewContent(false);
          setAddNewBook(false);

          setStep("content");
        }}
      >
        <Icons.speechify /> <span> Listen</span>
      </div>

      <div className="flex gap-4">
        <div>
          <Select
            defaultValue="all"
            value={contentType}
            onValueChange={(value: ContentType) => {
              setContentType(value);
            }}
          >
            <SelectTrigger className="w-40 bg-transparent dark:text-white dark:border-gray-800 px-2">
              <SelectValue placeholder="Select content type" className="" />
            </SelectTrigger>
            <SelectContent className="mx-0">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="web">Web</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            defaultValue="date-listened"
            value={filterType}
            onValueChange={(value: FilterType) => {
              setFilterType(value);
            }}
          >
            <SelectTrigger className="w-40 bg-transparent dark:text-white dark:border-gray-800 px-2">
              <SelectValue placeholder="Select content type" className="" />
            </SelectTrigger>
            <SelectContent className="mx-0">
              <SelectItem value="date-listened">Date Listened</SelectItem>
              <SelectItem value="date-added">Date Added</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
