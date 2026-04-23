"use client";

import { Icons } from "./ui/icons.v2";
import { SearchInput } from "./search-input";
import { motion } from "framer-motion";

export const SearchBar = ({ autoFocus }: { autoFocus?: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full cursor-pointer text-lg py-2 flex flex-row justify-center items-center"
    >
      <Icons.magnifyingGlass />

      <SearchInput autoFocus={autoFocus} />
    </motion.div>
  );
};
