import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface DebateRequest {
  topic: string;
  participantId: string;
  model: string;
  position: 'for' | 'against';
  history: Array<{ role: string; content: string; participantId: string }>;
  round: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: DebateRequest = await request.json();
    const { topic, participantId, model, position, history, round } = body;

    // Build context from debate history
    const contextMessages = history
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));

    const systemPrompt = `You are participating in a formal debate about: "${topic}".

Your position: You are ${position === 'for' ? 'SUPPORTING' : 'OPPOSING'} this statement.

Rules:
1. Present strong, logical arguments for your position
2. Address counterarguments from your opponent
3. Use evidence, examples, and reasoning
4. Be persuasive but respectful
5. Keep responses concise (2-3 paragraphs max)
6. This is round ${round} of the debate

${round === 1 ? 'This is your opening statement. Present your main arguments clearly.' : 'Respond to your opponent\'s previous arguments and strengthen your position.'}`;

    let response: string;

    // Route to appropriate AI model
    if (model.includes('claude')) {
      const completion = await anthropic.messages.create({
        model: model,
        max_tokens: 1024,
        system: systemPrompt,
        messages: contextMessages.length > 0 ? contextMessages as any : [
          { role: 'user', content: `Make your ${round === 1 ? 'opening statement' : 'argument'} about: ${topic}` }
        ],
      });

      response = completion.content[0].type === 'text' ? completion.content[0].text : '';
    } else if (model.includes('gpt')) {
      const completion = await openai.chat.completions.create({
        model: model,
        max_tokens: 1024,
        messages: [
          { role: 'system', content: systemPrompt },
          ...(contextMessages.length > 0 ? contextMessages : [
            { role: 'user', content: `Make your ${round === 1 ? 'opening statement' : 'argument'} about: ${topic}` }
          ]),
        ] as any,
      });

      response = completion.choices[0]?.message?.content || '';
    } else {
      throw new Error('Unsupported model');
    }

    return NextResponse.json({
      success: true,
      response,
      participantId,
      round,
    });
  } catch (error: any) {
    console.error('Debate API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}
