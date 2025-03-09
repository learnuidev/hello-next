import { chineseConverter } from "mandarino/src/utils/chinese-converter";

export function EditMode({
  state,
  setState,
}: {
  state: string;
  setState: (value: string) => void;
}) {
  return (
    <textarea
      placeholder="Paste text here"
      className="my-32 text-2xl font-light dark:text-gray-200 block w-full outline-none resize-none bg-inherit overflow-hidden h-[881px]"
      value={state}
      onChange={(event) => {
        setState(chineseConverter(event.target.value));
      }}
    />
  );
}
