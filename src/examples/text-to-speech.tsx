"use client";

import { hfClient } from "@/libs/huggingface";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [generatedText, setGeneratedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    const text = "It's an exciting time to be an A.I. engineer.";

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: text,
        }),
      });
      // const response = await hfClient.chatCompletion({
      //   messages: [
      //     {
      //       role: "user",
      //       content: textToGenerate,
      //     },
      //   ],
      //   model: "meta-llama/Llama-3.1-8B-Instruct",
      // });
      // console.log("response", response);
      const audio = await response.blob();
      const audioUrl = URL.createObjectURL(audio);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }

      console.log("response", audio);

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.error || "Failed to generate text");
      // }

      // const data = await response.json();
      // setGeneratedText(data.generated_text);
      // console.log("Generated text:", data);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(error, errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <audio ref={audioRef} controls />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => fetchData()}
        >
          Generate Text to Speech
        </button>
      </main>
    </div>
  );
}
