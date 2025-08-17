import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";
const models = [
  "meta-llama/Llama-3.1-8B-Instruct",
  "distilbert/distilbert-base-uncased-finetuned-sst-2-english",
  "nari-labs/Dia-1.6B",
];

const token = process.env.HF_TOKEN;

if (!token) {
  console.warn("HF_TOKEN is not set. Please add it to your .env.local file");
}

const hfClient = new InferenceClient(token, {
  includeCredentials: false,
});

export const generateText = async (request: NextRequest) => {
  try {
    const { prompt, model = models[0] } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await hfClient.chatCompletion({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model,
    });

    return NextResponse.json({
      generated_text: response.choices[0].message.content,
      model: model,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("API Error:", error);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const generateTextToSpeech = async (request: NextRequest) => {
  try {
    const { prompt, model = models[2] } = await request.json();

    const response = await hfClient.textToSpeech({
      inputs: prompt,
      model,
    });

    return NextResponse.json({
      audio: response,
      model: model,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("API Error:", error);
  }
};
