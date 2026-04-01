import { motion } from "framer-motion";

export function ContentListGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="grid grid-cols-[repeat(auto-fit,minmax(32rem,1fr))] sm:grid-cols-[repeat(2,minmax(20rem,1fr))] md:grid-cols-[repeat(3,minmax(20rem,1fr))] gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
