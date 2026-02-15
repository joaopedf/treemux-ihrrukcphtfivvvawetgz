'use client';

import { useState, useEffect } from 'react';
import { DebateParticipant, DebateMessage } from '@/lib/types';
import DebateCard from './DebateCard';
import { ArrowLeft, Crown } from 'lucide-react';

interface DebateArenaProps {
  topic: string;
  onBack: () => void;
}

const PARTICIPANTS: DebateParticipant[] = [
  {
    id: 'claude',
    name: 'Claude',
    model: 'claude-3-5-sonnet-20241022',
    position: 'for',
    color: '#8B5CF6',
  },
  {
    id: 'gpt',
    name: 'GPT-4',
    model: 'gpt-4o',
    position: 'against',
    color: '#EC4899',
  },
];

const TOTAL_ROUNDS = 3;

export default function DebateArena({ topic, onBack }: DebateArenaProps) {
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [activeParticipant, setActiveParticipant] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    startDebate();
  }, []);

  const startDebate = async () => {
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      setCurrentRound(round);

      for (const participant of PARTICIPANTS) {
        setActiveParticipant(participant.id);

        try {
          const response = await fetch('/api/debate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              topic,
              participantId: participant.id,
              model: participant.model,
              position: participant.position,
              history: messages.map(m => ({
                role: m.role,
                content: m.content,
                participantId: m.participantId,
              })),
              round,
            }),
          });

          const data = await response.json();

          if (data.success) {
            const newMessage: DebateMessage = {
              id: `${participant.id}-${round}-${Date.now()}`,
              role: 'assistant',
              content: data.response,
              timestamp: Date.now(),
              participantId: participant.id,
              round,
            };

            setMessages(prev => [...prev, newMessage]);

            // Wait before next participant
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } catch (error) {
          console.error('Error in debate:', error);
        }
      }

      // Wait before next round
      if (round < TOTAL_ROUNDS) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    setActiveParticipant(null);
    setIsComplete(true);
  };

  const getLatestMessage = (participantId: string) => {
    const participantMessages = messages.filter(m => m.participantId === participantId);
    return participantMessages[participantMessages.length - 1]?.content;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">{topic}</h1>
          <p className="text-gray-600">
            Round {currentRound} of {TOTAL_ROUNDS}
            {isComplete && (
              <span className="ml-3 inline-flex items-center gap-1 text-yellow-600 font-semibold">
                <Crown className="w-4 h-4" />
                Debate Complete
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {PARTICIPANTS.map(participant => (
          <DebateCard
            key={participant.id}
            participant={participant}
            message={getLatestMessage(participant.id)}
            isActive={activeParticipant === participant.id}
          />
        ))}
      </div>

      {messages.length > 2 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Debate History</h2>
          <div className="space-y-4">
            {messages.map((message, index) => {
              const participant = PARTICIPANTS.find(p => p.id === message.participantId);
              return (
                <div
                  key={message.id}
                  className="p-4 rounded-lg border border-gray-200 bg-white"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: participant?.color }}
                    />
                    <span className="font-semibold">{participant?.name}</span>
                    <span className="text-sm text-gray-500">• Round {message.round}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
