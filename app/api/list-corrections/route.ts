import { mandarinoApi } from "mandarino";

export const maxDuration = 60;

const deepSeekApiKey = process.env.DEEPSEEK_API_KEY;

const mandarinoDeepseek = mandarinoApi({
  apiKey: deepSeekApiKey,
  variant: "deepseek",
  modelName: "deepseek-v4-flash",
});

export async function POST(req: Request) {
  const { content, sourceLang, targetLang } = await req.json();

  const response = await mandarinoDeepseek.getCorrection({
    content,
    sourceLang,
    targetLang,
  });

  return Response.json(response);
}
