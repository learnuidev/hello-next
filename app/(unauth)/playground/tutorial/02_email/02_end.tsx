import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@/components/ui/icons.v2";
// import * as Icons from "@heroicons/react/outline";

let titles = [
  ["Apple's newest iPhone is here", "Watch our July event"],
  [
    "Nintendo's Newsletter for July",
    "Introducing Strike, a 5-on-5 soccer game",
  ],
  ["Your funds have been processed", "See your latest deposit online"],
  ["This Week in Sports", "The finals are heating up"],
  ["Changelog update", "Edge subroutines and more"],
  ["React Hawaii is here!", "Time for fun in the sun"],
];

const base = 4;
const t = (delta: number) => delta * base;

export function Email() {
  const [messages, setMessages] = useState([...(Array(9).keys() as any)]);
  const [selectedMessages, setSelectedMessages] = useState<any>([]);

  function addMessage() {
    let newId = (messages.at(-1) || 0) + 1;
    setMessages((messages) => [...messages, newId]);
  }

  function toggleMessage(mid: any) {
    if (selectedMessages.includes(mid)) {
      setSelectedMessages((messages: any) =>
        messages.filter((id: any) => id !== mid)
      );
    } else {
      setSelectedMessages((messages: any) => [...messages, mid]);
    }
  }

  function archiveSelectedMessages() {
    setMessages((messages) =>
      messages.filter((id) => !selectedMessages.includes(id))
    );
    setSelectedMessages([]);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center overscroll-y-contain bg-gradient-to-br from-slate-700 to-slate-900 py-8 px-6 text-slate-600">
      <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden rounded-2xl bg-white ">
        <div className="flex flex-col bg-slate-50 py-2">
          <div className="border-b px-5">
            <div className="flex justify-between py-2 text-right">
              <button
                onClick={addMessage}
                className="-mx-2 rounded px-2 py-1 text-slate-400 hover:text-slate-500 active:bg-slate-200"
              >
                <Icons.mailbox className="h-5 w-5 " />
              </button>
              <button
                onClick={archiveSelectedMessages}
                className="-mx-2 rounded px-2 py-1 text-slate-400 hover:text-slate-500 active:bg-slate-200"
              >
                <Icons.archive className="h-5 w-5" />
              </button>
            </div>
          </div>
          <ul className="overflow-y-scroll px-3 pt-2">
            <AnimatePresence initial={false}>
              {[...messages].reverse().map((mid) => (
                <motion.li
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      //   type: "spring",
                      //   bounce: 0.3,
                      //   opacity: { delay: t(0.025) },
                    },
                  }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: t(0.1),
                    // type: "spring",
                    // bounce: 0,
                    opacity: { duration: t(0.01) },
                  }}
                  key={mid}
                  className="relative"
                >
                  <div className="transition">
                    <button
                      onClick={() => toggleMessage(mid)}
                      className={`${
                        selectedMessages.includes(mid)
                          ? "bg-blue-500"
                          : "hover:bg-slate-200"
                      } block w-full cursor-pointer truncate rounded py-3 px-3 text-left`}
                    >
                      <p
                        className={`${
                          selectedMessages.includes(mid)
                            ? "text-white"
                            : "text-slate-500"
                        } truncate text-sm font-medium`}
                      >
                        {titles[mid % titles.length][0]}
                      </p>
                      <p
                        className={`${
                          selectedMessages.includes(mid)
                            ? "text-blue-200"
                            : "text-slate-400"
                        } truncate text-xs`}
                      >
                        {titles[mid % titles.length][1]}
                      </p>
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}
