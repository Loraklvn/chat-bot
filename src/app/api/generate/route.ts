import { NextRequest } from "next/server";
import { generateTextToSpeech } from "../utils";

export async function POST(request: NextRequest) {
  return generateTextToSpeech(request);
}
