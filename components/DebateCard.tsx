'use client';

import { DebateParticipant } from '@/lib/types';
import { Bot } from 'lucide-react';

interface DebateCardProps {
  participant: DebateParticipant;
  message?: string;
  isActive?: boolean;
}

export default function DebateCard({ participant, message, isActive }: DebateCardProps) {
  return (
    <div
      className={`rounded-xl border-2 p-6 transition-all duration-300 ${
        isActive
          ? `border-${participant.color}-500 shadow-lg scale-105`
          : 'border-gray-200 opacity-75'
      }`}
      style={{
        borderColor: isActive ? participant.color : undefined,
        boxShadow: isActive ? `0 0 20px ${participant.color}33` : undefined,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: participant.color }}
        >
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{participant.name}</h3>
          <p className="text-sm text-gray-500">
            {participant.model} • {participant.position === 'for' ? 'Supporting' : 'Opposing'}
          </p>
        </div>
      </div>

      {message && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
      )}

      {isActive && !message && (
        <div className="mt-4 flex items-center gap-2 text-gray-500">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm">Thinking...</span>
        </div>
      )}
    </div>
  );
}
