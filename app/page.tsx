'use client';

import { useState } from 'react';
import DebateSetup from '@/components/DebateSetup';
import DebateArena from '@/components/DebateArena';

export default function Home() {
  const [topic, setTopic] = useState<string | null>(null);

  const handleStartDebate = (newTopic: string) => {
    setTopic(newTopic);
  };

  const handleBack = () => {
    setTopic(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto py-12">
        {!topic ? (
          <DebateSetup onStart={handleStartDebate} />
        ) : (
          <DebateArena topic={topic} onBack={handleBack} />
        )}
      </div>
    </main>
  );
}
