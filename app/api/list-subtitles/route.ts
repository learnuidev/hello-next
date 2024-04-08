import { listSubtitles } from "@/libs/youtube/list-subtitles";

export const maxDuration = 60;

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { videoUrl, lang } = await req.json();

  // // 1. Download video
  const subtitles = await listSubtitles({
    id: videoUrl,
    lang: lang || "zh-CN",
  });

  // return subtitles;

  return Response.json(subtitles);
}
