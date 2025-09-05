# KnowYourRights.fyi

Your Pocket Guide to Rights During Police Interactions - A Base Mini App

## Overview

KnowYourRights.fyi is a mobile-first application that provides instant, location-aware legal rights information and communication tools for individuals interacting with law enforcement. Built as a Base Mini App using Next.js 15 and OnchainKit.

## Features

### 🗺️ State-Specific Rights Guides
- Dynamically displays accurate, concise rights information based on user's current location
- Includes 'what you can,' 'what you cannot do,' and 'what to say' guidelines
- Available in English and Spanish

### 🤖 AI-Powered Script Generator
- Generates contextual scripts for different police interaction scenarios
- Powered by OpenAI with careful prompt engineering for legal accuracy
- Covers traffic stops, street encounters, questioning, and more

### 🎙️ One-Tap Record & Alert
- Single-tap activation for audio recording of interactions
- Emergency contact alerts with location data
- Discreet and secure documentation tools

### 📱 Shareable Summary Cards
- Generates visually appealing summary cards of rights and interactions
- Easy sharing via Farcaster and other social platforms
- IPFS storage for decentralized persistence

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion
- **AI**: OpenAI API for script generation
- **Storage**: Supabase (backend), Pinata (IPFS)
- **Social**: Farcaster integration via Neynar

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys for OpenAI/OpenRouter

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/knowyourrights-fyi.git
cd knowyourrights-fyi
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your API keys in `.env.local`:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `OPENROUTER_API_KEY` or `OPENAI_API_KEY`: For AI script generation

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Basic Navigation
- **Rights Tab**: View state-specific legal rights based on your location
- **Scripts Tab**: Generate AI-powered scripts for different scenarios
- **Record Tab**: Start audio recording and send emergency alerts
- **Share Tab**: Create and share summary cards of your rights

### Language Support
- Toggle between English and Spanish using the globe icon in the header
- All content, including AI-generated scripts, adapts to your language preference

### Location Services
- Grant location permission for state-specific rights information
- Location data is used locally and not stored without consent

## API Routes

### `/api/generate-script`
Generates contextual scripts for police interactions using OpenAI.

**Request:**
```json
{
  "scenario": "traffic-stop",
  "language": "en"
}
```

**Response:**
```json
{
  "script": "I am exercising my right to remain silent..."
}
```

## Design System

The app uses a custom design system with:
- **Colors**: Purple/blue gradient theme with accent colors
- **Typography**: Inter font with clear hierarchy
- **Components**: Glass morphism effects with backdrop blur
- **Animation**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design with tablet/desktop support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Legal Disclaimer

⚠️ This application is for educational purposes only and does not constitute legal advice. Laws may vary by jurisdiction. Always consult with a qualified attorney for specific legal guidance.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@knowyourrights.fyi or open an issue on GitHub.

## Acknowledgments

- Built with [OnchainKit](https://onchainkit.xyz) for Base integration
- Powered by [OpenAI](https://openai.com) for intelligent script generation
- Designed with accessibility and user safety as top priorities
