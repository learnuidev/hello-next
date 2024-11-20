import { Icons } from "@/components/ui/icons.v2";
import { useState } from "react";
import { useDiaryStore } from "../hooks/use-diary-store";
import { useAddJournalEntryMutation } from "../hooks/use-add-journal-entry-mutatuon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const exampleEntry = {
  text: `It’s been 2 months and 15 days since I quit weed and alcohol. The first month was very hard. I had anxiety attacks, paranoia, insomnia, and so on. But after a month, things started to get much better.
  
Initially, I was taking medications, but I didn’t like the side effects. So, I did some research online and learned that saffron is a great natural alternative for treating anxiety and depression, and it’s also an excellent mood booster.
  
I’ve been taking saffron, and it has really helped me control my anxiety and depression. What’s more, my sleep quality has improved significantly, and I’ve started having vivid dreams, which I used to forget before.
  
I’m happy I quit drugs. I’m getting better, I’m getting stronger.
  
I will make more time to spend with my daughter and my wife.
  
I love them. I love life.`,
};

export const AddEntry = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const addJournalMutation = useAddJournalEntryMutation();
  const setCreateNew = useDiaryStore((state) => state.setCreateNew);
  return (
    <div className="max-w-3xl m-auto">
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-gray-300">New Entry</h1>
        <button
          onClick={() => {
            setCreateNew(false);
          }}
        >
          <Icons.xMark className="text-2xl" />
        </button>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-gray-500">
          Words Count: <span>{text.split(" ")?.length}</span>
          <span> / </span>
          <span>{exampleEntry.text.split(" ").length}</span>
        </p>
        <textarea
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          disabled={addJournalMutation.isLoading}
          placeholder="Type your thoughts here..."
          className="p-4 w-full h-[320px] rounded-xl focus-visible:outline-none focus-visible:ring-ring"
        />

        <div className="flex justify-end">
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
              text?.split(" ")?.length < 30 || addJournalMutation.isLoading
            }
            className="mt-4"
          >
            Add New Journal
          </Button>
        </div>
      </div>
    </div>
  );
};
