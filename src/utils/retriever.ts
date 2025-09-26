import { OpenAIEmbeddings } from "@langchain/openai";

import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
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

const retriever = vectorStore.asRetriever({ k: 2 });

export { vectorStore, retriever };
