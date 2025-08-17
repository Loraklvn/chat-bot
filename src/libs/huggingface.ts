import { InferenceClient } from "@huggingface/inference";

const token = process.env.NEXT_PUBLIC_HF_TOKEN;

console.log("token", token);

if (!token) {
  console.warn(
    "NEXT_PUBLIC_HF_TOKEN is not set. Please add it to your .env.local file"
  );
}

export const hfClient = new InferenceClient(token);
