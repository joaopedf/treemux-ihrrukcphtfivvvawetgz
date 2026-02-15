'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface DebateSetupProps {
  onStart: (topic: string) => void;
}

const SUGGESTED_TOPICS = [
  "AI will have a net positive impact on humanity",
  "Remote work is more productive than office work",
  "Social media does more harm than good",
  "Universal basic income should be implemented globally",
  "Space exploration should be prioritized over ocean exploration",
];

export default function DebateSetup({ onStart }: DebateSetupProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onStart(topic.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI Debate Arena
        </h1>
        <p className="text-gray-600 text-lg">
          Watch AI models debate any topic in real-time
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
            Debate Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a debate topic..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Suggested Topics:</p>
          <div className="grid gap-2">
            {SUGGESTED_TOPICS.map((suggestedTopic) => (
              <button
                key={suggestedTopic}
                type="button"
                onClick={() => setTopic(suggestedTopic)}
                className="text-left px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition border border-gray-200"
              >
                {suggestedTopic}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          Start Debate
        </button>
      </form>
    </div>
  );
}
