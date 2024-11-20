import { Icons } from "@/components/ui/icons.v2";
import { useState } from "react";
import { useDiaryStore } from "../hooks/use-diary-store";
import { useAddJournalEntryMutation } from "../hooks/use-add-journal-entry-mutatuon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFixGrammarMutation } from "../hooks/use-fix-grammar-mutation";

const exampleEntry = {
  text: `It’s been 2 months and 15 days since I quit weed and alcohol. The first month was very hard. I had anxiety attacks, paranoia, insomnia, and so on. But after a month, things started to get much better.
  
Initially, I was taking medications, but I didn’t like the side effects. So, I did some research online and learned that saffron is a great natural alternative for treating anxiety and depression, and it’s also an excellent mood booster.
  
I’ve been taking saffron, and it has really helped me control my anxiety and depression. What’s more, my sleep quality has improved significantly, and I’ve started having vivid dreams, which I used to forget before.
  
I’m happy I quit drugs. I’m getting better, I’m getting stronger.
  
I will make more time to spend with my daughter and my wife.
  
I love them. I love life.`,
};

export const AddEntry = () => {
  // const [text, setText] = useState("");
  const router = useRouter();
  const addJournalMutation = useAddJournalEntryMutation();
  const setCreateNew = useDiaryStore((state) => state.setCreateNew);
  const text = useDiaryStore((state) => state.text);
  const setText = useDiaryStore((state) => state.setText);
  const correctedGrammar = useDiaryStore((state) => state.correctedGrammar);
  const setCorrectedGrammar = useDiaryStore(
    (state) => state.setCorrectedGrammar
  );
  const showGrammar = useDiaryStore((state) => state.showGrammar);
  const setShowGrammar = useDiaryStore((state) => state.setShowGrammar);

  const fixGrammarMutation = useFixGrammarMutation();
  return (
    <div className="max-w-3xl m-auto">
      <div className="flex justify-between items-center mt-12 mb-8">
        <p className="text-gray-400">
          <span className="text-gray-500"> Words:</span>{" "}
          <span>{text.split(" ")?.length}</span>
          <span> / </span>
          <span>{exampleEntry.text.split(" ").length}</span>
        </p>
        <button
          onClick={() => {
            setCreateNew(false);
          }}
        >
          <Icons.xMark className="text-2xl" />
        </button>
      </div>

      <div>
        <textarea
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          disabled={addJournalMutation.isLoading}
          placeholder="Type your thoughts here..."
          className="p-4 w-full h-[260px] rounded-xl focus-visible:outline-none focus-visible:ring-ring"
        />

        <div className="flex justify-between">
          <div>
            {correctedGrammar && (
              <Button
                onClick={() => {
                  setShowGrammar(!showGrammar);
                }}
                // disabled={
                //   text?.split(" ")?.length < 20 || fixGrammarMutation.isLoading
                // }
                className="mt-4"
              >
                {showGrammar ? "Hide Grammar" : "Show Grammar"}
              </Button>
            )}
          </div>
          <div>
            <Button
              onClick={() => {
                fixGrammarMutation
                  .mutateAsync({
                    text,
                  })
                  .then((resp) => {
                    setCorrectedGrammar(resp.text);
                  });
              }}
              disabled={
                text?.split(" ")?.length < 3 || fixGrammarMutation.isLoading
              }
              className="mt-4"
            >
              {fixGrammarMutation.isLoading ? "Fixing..." : "Fix Grammar"}
            </Button>
            <Button
              onClick={() => {
                addJournalMutation
                  .mutateAsync({
                    text,
                  })
                  .then((resp) => {
                    router.push(`/diary/${resp.id}`);
                  });
              }}
              disabled={
                text?.split(" ")?.length < 10 || addJournalMutation.isLoading
              }
              className="mt-4"
            >
              {addJournalMutation.isLoading ? "Adding..." : "Add New Journal"}
            </Button>
          </div>
        </div>

        {showGrammar && correctedGrammar && (
          <textarea
            value={correctedGrammar}
            readOnly
            disabled={addJournalMutation.isLoading}
            placeholder="Type your thoughts here..."
            className="mt-8 p-4 w-full h-[220px] rounded-xl focus-visible:outline-none focus-visible:ring-ring"
          />
        )}
      </div>
    </div>
  );
};
