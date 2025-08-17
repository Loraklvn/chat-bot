"use client";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export default function Home() {
  async function splitDocument() {
    const response = await fetch("podcasts.txt");
    const text = await response.text();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 150,
      chunkOverlap: 15,
    });
    const output = await splitter.createDocuments([text]);
    console.log(output);
  }
  splitDocument();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => splitDocument()}
        >
          Split Document
        </button>
      </main>
    </div>
  );
}
