# Portfolio

AI-powered portfolio with React 19 + Vite + TypeScript, hosted on AWS S3 + CloudFront with Gemini API integration.

## Live Demo

🌐 **[www.jessevandenberghe.com](https://www.jessevandenberghe.com)**

## Features

- Interactive AI chat agent (powered by Google Gemini)
- Dark theme with Tailwind CSS & Framer Motion animations
- Infrastructure-as-code (CloudFormation)
- Auto-deploy via GitHub Actions

## Quick Start

```bash
npm install
echo "GEMINI_API_KEY=your-api-key" > .env.local
npm run dev
```

Visit http://localhost:5173 and test the chat widget.

## Build & Deploy

```bash
npm run build          # Create production bundle
npm run preview        # Preview dist/ locally
make sync-s3           # Upload to S3 + invalidate CloudFront
```

Auto-deploys to AWS on push to `main` via GitHub Actions.

For first-time AWS setup: see [infrastructure/README.md](infrastructure/README.md)

## Project Structure

- `src/` – React components, constants, services
- `components/` – Portfolio sections (Hero, Experience, Skills, etc.)
- `services/geminiService.ts` – Gemini API integration
- `infrastructure/` – CloudFormation templates & deployment scripts

## Getting API Key

Get a free Gemini API key at [Google AI Studio](https://aistudio.google.com/apikey)
