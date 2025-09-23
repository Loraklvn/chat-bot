"use client";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { Chatbot } from "@/components/chatbot";

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

const standaloneQuestionPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Given a question, convert it to a standalone question. question: {input} standalone question:",
  ],
  ["human", "{input}"],
]);

const standaloneQuestionChain = standaloneQuestionPrompt.pipe(model);

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant that helps the user with their questions about movies.",
  ],
  ["human", "{input}"],
]);

const promptChain = prompt.pipe(model);

export default function Page() {
  // Example of how to handle custom message processing
  const handleMovieMessage = async (message: string): Promise<string> => {
    // Simulate API call delay
    const standaloneQuestionResponse = await standaloneQuestionChain.invoke({
      input: message,
    });

    console.log({ standaloneQuestionResponse });

    const promptResponse = await promptChain.invoke({
      input: standaloneQuestionResponse.content as string,
    });

    console.log({ promptResponse });

    return promptResponse.content as string;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Movie Chatbot Demo
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
        title="Movie Assistant"
        subtitle="Ask me anything about movies!"
        placeholder="What movie would you like to know about?"
        onSendMessage={handleMovieMessage}
      />
    </div>
  );
}
