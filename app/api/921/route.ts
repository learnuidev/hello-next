import { nineTwoOneData, nineTwoOneReturns } from "@/libs/921/lang";
import { postProcess } from "@/libs/921/post-process";
import { listSubtitles } from "@/libs/youtube/list-subtitles";

export const maxDuration = 60;

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { returns, variables } = await req.json();

  const ctx = await nineTwoOneData(variables);

  // // 1. Download video
  const subtitles = await nineTwoOneReturns(returns, ctx);

  // return subtitles;

  return Response.json(subtitles);
}
