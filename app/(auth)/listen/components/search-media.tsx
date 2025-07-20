import { cn } from "@/lib/utils";

export const SearchMedia = () => {
  return (
    <div className="max-w-3xl mx-auto w-full pb-24 pt-12">
      <input
        placeholder="Search"
        className={cn(
          "font-extralight border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300  dark:text-gray-300 placeholder:text-gray-600 border-2 focus:border-none px-2 rounded-full focus:outline-none active:outline-none py-3.5",
          "w-full px-4 bg-gray-100 dark:bg-[rgb(31,32,33)] text-lg"
        )}
      />
    </div>
  );
};
