import { useNewConvoStore } from "@/components/step";
import { useRef } from "react";

import { WebVTTParser } from "webvtt-parser";

function parseVTT(_vttString: string, lang: string) {
  const vttString = `
WEBVTT

${_vttString?.replaceAll(",", ".")}
  `;
  const parser = new WebVTTParser();
  const tree = parser.parse(vttString, "metadata");

  console.log("TREE", tree);

  const cues = tree.cues.map((rawSub: any) => {
    const { id, startTime, endTime, text } = rawSub;
    const tags = /<(v|c).*?>|<\/c>/g;

    return {
      id: crypto.randomUUID(),
      start: startTime,
      end: endTime,
      input: text?.replace(tags, ""),
      lang: lang,
    } as any;
  });

  return cues;
}

export const UploadSubtitlesInput = () => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;
  const fileInputRef = useRef(null);

  const onFileChange = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");

    fileReader.onload = (e) => {
      const result = e?.target?.result as any;

      try {
        setConvo("transcriptions", JSON.parse(result as any));
      } catch (err) {
        const res = parseVTT(result, newConvo?.lang);
        setConvo("transcriptions", res);
      }
      // @ts-ignore
      fileInputRef.current.value = "";
    };
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        onChange={onFileChange}
      />
    </div>
  );
};
