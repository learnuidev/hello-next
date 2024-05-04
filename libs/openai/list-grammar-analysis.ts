import OpenAI from "openai";
import { determineAnalysisPrompt } from "./list-grammar-analysis.prompt";
import { openaiConfig } from "./openai.config";
import { resolveHumanLangs } from "./utils";

const openai = new OpenAI({
  apiKey: openaiConfig?.apiKey,
});

async function listSentences({
  content,
  language,
}: {
  content: string;
  language: string;
}) {
  console.log(`Generating grammar for: ${content}`);

  const prompt = determineAnalysisPrompt({ language });
  console.log("list-grammar-analysis/lang", language);

  console.log("PROMPT", prompt);
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${prompt}
          
        Also the content is of the following language: ${resolveHumanLangs(language)}`,
      },
      { role: "user", content: `content: ${content}` },
    ],
    model: "gpt-3.5-turbo",
  });

  const resp = await JSON.parse(
    chatCompletion?.choices?.[0]?.message?.content as any
  );

  return resp;
}

export async function listGrammarAnaysis({
  content,
  language,
}: {
  content: string;
  language: string;
}) {
  try {
    const t0 = performance.now();

    const sents = await listSentences({ content, language });

    const t1 = performance.now();

    console.log(`Call to listGrammarAnalysis took ${t1 - t0} milliseconds.`);

    return sents;
  } catch (err) {
    return [];
  }
}
