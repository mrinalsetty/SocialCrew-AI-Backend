# SocialCrew AI Backend

NestJS + Fastify backend for the SocialCrew AI two-agent demo.

## What it does

- Exposes a health endpoint for uptime and live status
- Exposes backend metadata for the frontend dashboard
- Runs a two-agent LangGraph workflow:
  1. Content Creator agent
  2. Social Analyst agent
- Uses Groq as the LLM provider

## Stack

- NestJS
- Fastify
- TypeScript
- LangGraph JS
- Groq SDK

## Endpoints

- `GET /health`
- `GET /system/meta`
- `POST /generate`

## Environment variables

```env
PORT=4000
CORS_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
GROQ_API_KEY=your_groq_api_key
GROQ_CREATOR_MODEL=llama-3.1-8b-instant
GROQ_ANALYST_MODEL=llama-3.3-70b-versatile
APP_VERSION=1.1.0
```
