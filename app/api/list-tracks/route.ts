import ytdl from "@distube/ytdl-core";

const getInfo = ({ id, lang }: { id: string; lang: string }) => {
  return ytdl.getInfo(id).then(async (info: any) => {
    return info;
  });
};

export const maxDuration = 60;

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { videoUrl, lang } = await req.json();

  // // 1. Download video
  const videoInfo = await getInfo({
    id: videoUrl,
    lang: lang || "zh-CN",
  });

  return Response.json(videoInfo);
}
