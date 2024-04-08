import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function detectLanguage(content: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are a language detection expert,
Given a text, try to guess which language it is using ISO 639-1 language codes
For example:

Hello should return en
你好 should return zh-CN
        `,
      },
      { role: "user", content: `content: ${content}` },
    ],
    model: "gpt-3.5-turbo",
  });

  const resp = chatCompletion?.choices?.[0]?.message?.content;

  return resp;
}
