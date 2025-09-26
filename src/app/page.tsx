"use client";

import { ChatOpenAI } from "@langchain/openai";

import { Chatbot } from "@/components/chatbot";
import { answerPrompt, standaloneQuestionPrompt } from "@/utils/prompts";
import { retriever } from "@/utils/retriever";
import { Document } from "@langchain/core/documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

const standaloneChain = standaloneQuestionPrompt
  .pipe(model)
  .pipe(new StringOutputParser());

const retrieverChain = RunnableSequence.from([
  (prevResult) => prevResult.standalone_question,
  retriever,
  (prev) => {
    return prev.map((match: Document) => match.pageContent).join("\n\n");
  },
]);

const answerChain = answerPrompt.pipe(model).pipe(new StringOutputParser());

const mainChain = RunnableSequence.from([
  {
    standalone_question: standaloneChain,
    original_input: new RunnablePassthrough(),
  },
  {
    context: retrieverChain,
    question: ({ original_input }) => original_input.input,
    conv_history: ({ original_input }) =>
      original_input.messageHistory
        .map((message: Message) => `${message.role}: ${message.content}`)
        .join("\n"),
  },
  answerChain,
]);

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};
export default function Page() {
  const handleMovieMessage = async (
    message: string,
    messages: Message[]
  ): Promise<string> => {
    const response = await mainChain.invoke({
      input: message,
      messageHistory: messages,
    });

    return response;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Scrimba Chatbot Demo
          </h1>
          <p className="text-xl text-gray-600">
            Click the chat button in the bottom right to start discovering great
            movies!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">
                🎬 Movie Recommendations
              </h3>
              <p className="text-gray-600">
                Get personalized movie suggestions based on your preferences
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">
                💬 Natural Conversation
              </h3>
              <p className="text-gray-600">
                Chat naturally about movies, genres, and what you&apos;re in the
                mood for
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">
                🎯 Smart Suggestions
              </h3>
              <p className="text-gray-600">
                Intelligent recommendations based on your taste and current mood
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">
                📱 Responsive Design
              </h3>
              <p className="text-gray-600">
                Works perfectly on desktop and mobile devices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot
        title="Scrimba Assistant"
        subtitle="Ask me anything about Scrimba!"
        placeholder="What movie would you like to know about?"
        onSendMessage={handleMovieMessage}
      />
    </div>
  );
}
