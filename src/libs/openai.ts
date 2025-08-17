import OpenAI from "openai";

export const openAiClient = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});
