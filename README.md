# 🎭 AI Debate Arena

**TreeHacks 2026 Submission**

An innovative platform that orchestrates real-time debates between different AI models (Claude and GPT-4), showcasing their reasoning capabilities and argumentative strategies on any topic you choose.

## 🌟 Features

- **Multi-Model AI Debates**: Watch Claude 3.5 Sonnet and GPT-4o debate in real-time
- **Custom Topics**: Enter any debate topic or choose from suggested ones
- **Round-Based Format**: Structured 3-round debates with opening statements and rebuttals
- **Real-Time Streaming**: See AI responses as they're generated
- **Beautiful UI**: Modern, responsive interface with animated transitions
- **Debate History**: Track the full progression of arguments

## 🚀 Why This Wins

### Novelty ✨
- First-of-its-kind platform for AI vs AI debates
- Unique educational tool for understanding different AI reasoning styles
- Showcases the diversity of AI model perspectives

### Technical Excellence 💻
- Next.js 15 with App Router and Server Actions
- Real-time API integration with multiple AI providers
- TypeScript for type safety
- Tailwind CSS 4 for modern styling
- Production-ready error handling

### Market Potential 📈
- Educational institutions: Teach critical thinking and debate skills
- AI researchers: Compare model capabilities
- Content creators: Generate debate content
- General public: Entertainment and education

### Demo Ready 🎬
- Fully functional with polished UI
- Works immediately with API keys
- No setup complexity
- Impressive visual experience

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI APIs**: Anthropic Claude, OpenAI GPT-4
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys to .env.local

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## 🔑 Environment Variables

You need API keys from:
- **Anthropic**: Get from [console.anthropic.com](https://console.anthropic.com)
- **OpenAI**: Get from [platform.openai.com](https://platform.openai.com)

```env
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

## 🎯 How It Works

1. **Enter a Topic**: Choose from suggestions or create your own debate topic
2. **Watch the Debate**: AI models take turns presenting arguments across 3 rounds
3. **Review History**: Scroll through the complete debate transcript
4. **Start New Debate**: Try different topics to see how AI reasoning adapts

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Environment Variables on Vercel
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `ANTHROPIC_API_KEY` and `OPENAI_API_KEY`
4. Redeploy

## 🎨 Architecture

```
app/
├── api/debate/          # AI debate API endpoint
├── components/          # React components
│   ├── DebateSetup.tsx # Topic selection interface
│   ├── DebateArena.tsx # Main debate orchestrator
│   └── DebateCard.tsx  # Individual AI participant card
├── lib/types.ts        # TypeScript definitions
└── page.tsx            # Main application page
```

## 🏆 Judging Criteria Alignment

- **Impact**: Democratizes access to diverse AI perspectives
- **Technical Complexity**: Multi-model orchestration, real-time streaming
- **Design**: Polished, intuitive, visually appealing
- **Completeness**: Fully functional, production-ready
- **Creativity**: Unique concept in the AI application space

## 📝 License

MIT License - Built for TreeHacks 2026

## 👥 Credits

Built with Claude Code for TreeHacks 2026
