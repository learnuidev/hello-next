import { listSubtitles } from "@/libs/youtube/list-subtitles";
import { chineseConverter } from "mandarino/src/utils/chinese-converter";

export const maxDuration = 60;

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { videoUrl, lang } = await req.json();

  // // 1. Download video
  const subtitles = (await listSubtitles({
    id: videoUrl,
    lang: lang || "zh-CN",
  })) as any;

  return Response.json({
    ...subtitles,

    subtitles: subtitles.subtitles.map((item: any) => {
      return {
        ...item,
        input: chineseConverter(item.input),
      };
    }),
  });
}
