import { Controller, Get } from '@nestjs/common';

@Controller('system')
export class SystemController {
  @Get('meta')
  getMeta() {
    return {
      name: 'SocialCrew AI Backend',
      version: process.env.APP_VERSION || '1.1.0',
      statusPage: '/health',
      architecture: [
        'Frontend sends topic to /generate',
        'LangGraph starts creator agent',
        'Creator agent calls Groq and returns structured post options',
        'LangGraph passes creator output to analyst agent',
        'Analyst agent scores and recommends the best post',
        'Backend returns combined result to frontend',
      ],
      stack: {
        runtime: ['NestJS', 'Fastify', 'TypeScript'],
        ai: ['LangGraph JS', 'Groq SDK'],
        models: [
          process.env.GROQ_CREATOR_MODEL || 'llama-3.1-8b-instant',
          process.env.GROQ_ANALYST_MODEL || 'llama-3.3-70b-versatile',
        ],
        deployment: ['Render', 'Vercel'],
      },
      endpoints: [
        { method: 'GET', path: '/health' },
        { method: 'GET', path: '/system/meta' },
        { method: 'POST', path: '/generate' },
      ],
      notes: [
        'Creator agent focuses on generation.',
        'Analyst agent focuses on scoring and suggestions.',
        'Health endpoint powers the frontend live status badge.',
      ],
    };
  }
}
