import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";
import Link from "next/link";
import hanbookImg from "./hanbook.png";

export const HanbookLink = ({ hanzi }: { hanzi: string }) => {
  const { data } = useListComponentVariantsQuery({ hanzi });
  const hanbookId = data?.[0]?.hanbookId;

  if (!hanbookId) {
    return null;
  }

  return (
    <Link
      target="_blank"
      href={`https://www.hanbook.com/chinese-dictionary/words/${hanbookId}`}
      className={`text-sm bg-white dark:bg-black p-2 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
    >
      <img
        width={20}
        alt="hanbook"
        // src={hanbookImg.src}
        src="https://www.hanbook.com/images/common/logo-big.cb78e2c2.webp"
      />
    </Link>
  );
};
