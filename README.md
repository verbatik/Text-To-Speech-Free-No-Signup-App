# Text-to-Speech App

A free, easy-to-use text-to-speech converter powered by the Verbatik API.


## Features

- Convert text to natural-sounding speech
- Multiple voice options with different languages and genders
- No signup required - just use a Verbatik API key
- Audio visualization
- Local storage for your settings
- Modern, responsive design

## Getting Started

## About Verbatik API

[Verbatik](https://verbatik.com/api) is a powerful text-to-speech API that provides high-quality, natural-sounding voice synthesis. This application leverages the Verbatik API to convert text into speech.

### Getting a Verbatik API Key

1. Visit [Verbatik's website](https://api.verbatik.com) and create an account
2. Navigate to the API section in your dashboard
3. Generate a new API key
4. Copy the API key and use it in this application

### Verbatik API Features Used in This App

- **Voice Selection**: Access to multiple voices with different genders and language options
- **Text-to-Speech Conversion**: Convert plain text to natural-sounding speech
- **Audio Storage**: Generated audio files are stored and accessible via URLs
- **Voice Metadata**: Information about available voices including name, gender, and language code

### API Endpoints Used

- `GET https://api.verbatik.com/api/v1/voices` - Retrieves available voices
- `POST https://api.verbatik.com/api/v1/tts` - Converts text to speech

For more information about the Verbatik API, including rate limits, additional features, and pricing, visit the [Verbatik documentation](https://docs.verbatik.com/en/collections/11809373-verbatik-api).


### Prerequisites

- Node.js (v18 or newer)
- npm, yarn, pnpm, or bun
- Verbatik API key

### Installation

```bash
# Clone the repository
git clone https://github.com/verbatik/text-to-speech-app-free.git
cd text-to-speech-app-free

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Enter your Verbatik API key
2. Type or paste your text
3. Select a voice
4. Click "Generate Speech"
5. Play or download the generated audio


## Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com/).

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production
vercel --prod
```

Alternatively, connect your GitHub repository to Vercel for automatic deployments.

### Self-Hosting

```bash
# Build the application
npm run build

# Start the production server
npm run start

# For production with PM2
npm install -g pm2
pm2 start npm --name "text-to-speech-app" -- start
```

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- Framer Motion
- Verbatik API

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Powered by Verbatik API • No signup required