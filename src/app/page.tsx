"use client";

import { Chatbot } from "@/components/chatbot";

export default function Page() {
  // Example of how to handle custom message processing
  const handleMovieMessage = async (message: string): Promise<string> => {
    // Simulate API call delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    // Simple movie-related responses (you can replace this with actual AI/API calls)
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("action")) {
      return "Great choice! For action movies, I'd recommend checking out 'Mad Max: Fury Road', 'John Wick', or 'Mission: Impossible' series. What specific type of action are you looking for?";
    } else if (lowerMessage.includes("comedy")) {
      return "Comedy is perfect for a good laugh! Some recent favorites include 'Everything Everywhere All at Once', 'The Grand Budapest Hotel', or classic picks like 'Groundhog Day'. What kind of humor do you enjoy?";
    } else if (lowerMessage.includes("horror")) {
      return "Horror movies can be thrilling! Are you looking for psychological horror like 'Hereditary', classic scares like 'The Conjuring', or something more recent? What scares you in the best way?";
    } else if (
      lowerMessage.includes("recommend") ||
      lowerMessage.includes("suggest")
    ) {
      return "I'd love to recommend something perfect for you! What genres do you usually enjoy, or what's your mood like today? Are you looking for something light and fun, or deep and thought-provoking?";
    } else {
      return "That's interesting! I'm here to help you discover amazing movies. Feel free to ask me about specific genres, actors, directors, or just tell me what kind of mood you're in and I'll suggest something great!";
    }
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
