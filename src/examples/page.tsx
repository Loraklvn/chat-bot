"use client";

import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY || ""
);

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-ada-002",
  openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "documents",
  queryName: "match_documents",
});

// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

export default function Home() {
  const saveDocument = async (documents: Document[]) => {
    console.log("saving document...");
    const response = await vectorStore.addDocuments(documents);
    console.log({ response });
    console.log("document saved...");
  };

  async function splitDocument() {
    const response = await fetch("/docs/scrimba-info.txt");
    const text = await response.text();

    // console.log(text);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });
    console.log("splitting document...");
    const output = await splitter.createDocuments([text]);
    console.log({ output });
    // saveDocument( output);
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <button
          className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600"
          onClick={() => splitDocument()}
        >
          Split Document
        </button>
      </main>
    </div>
  );
}
