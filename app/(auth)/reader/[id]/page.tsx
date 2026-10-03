"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { Icons } from "@/components/ui/icons.v2";
import { Nothing } from "@/app/nmm/nothing";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useHasMounted } from "../hooks/use-has-mounted";
import { useReaderStore } from "../hooks/use-reader-store";
import { countReaderWords } from "../utils/count-reader-words";
import { formatReaderDate } from "../utils/format-reader-date";

export default function ReaderText() {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const hasMounted = useHasMounted();
  const items = useReaderStore((state) => state.items);

  const item = items.find((readerItem) => readerItem.id === id);

  if (!hasMounted) {
    return (
      <main>
        <div className="max-w-2xl m-auto px-4 md:px-12 mt-16" />
        <FloatingNavbar />
      </main>
    );
  }

  if (!item) {
    return (
      <main>
        <div className="max-w-2xl m-auto px-4 md:px-12">
          <Nothing icon={Icons.bookOpen} message="This text is not here">
            <Link
              href="/reader"
              className="mt-6 inline-block uppercase text-xs tracking-wider text-gray-400 border-[1px] border-gray-300 dark:border-gray-800 px-4 py-2 hover:text-rose-400 dark:hover:text-white transition"
            >
              <Icons.back className="mr-2 text-xs" />
              <span>Back to reader</span>
            </Link>
          </Nothing>
        </div>

        <FloatingNavbar />
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-2xl m-auto px-4 md:px-12">
        <div className="mt-12 flex justify-between items-center">
          <Link
            href="/reader"
            className="uppercase text-xs tracking-wider text-gray-400 hover:text-rose-400 dark:hover:text-white transition"
          >
            <Icons.back className="mr-2 text-xs" />
            <span>Reader</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mt-10">{item.title}</h1>

        <p className="text-xs text-gray-500 font-light mt-3 uppercase tracking-wider">
          <span>{formatReaderDate(item.createdAt)}</span>
          <span> · </span>
          <span>{countReaderWords(item.text)} words</span>
        </p>

        <p className="mt-12 mb-32 whitespace-pre-wrap break-words text-lg font-extralight leading-9 text-gray-800 dark:text-gray-200">
          {item.text}
        </p>
      </div>

      <FloatingNavbar />
    </main>
  );
}
