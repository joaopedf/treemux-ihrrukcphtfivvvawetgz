export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface DebateParticipant {
  id: string;
  name: string;
  model: string;
  position: 'for' | 'against';
  color: string;
}

export interface DebateConfig {
  topic: string;
  participants: DebateParticipant[];
  rounds: number;
  currentRound: number;
}

export interface DebateMessage extends Message {
  participantId: string;
  round: number;
}

export type DebateStatus = 'idle' | 'debating' | 'complete';
