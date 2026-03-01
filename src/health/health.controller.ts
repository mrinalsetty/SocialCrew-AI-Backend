import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      service: 'socialcrew-ai-backend',
      version: process.env.APP_VERSION || '1.1.0',
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
      llmProvider: 'groq',
      graphRuntime: 'langgraph-js',
      creatorModel: process.env.GROQ_CREATOR_MODEL || 'llama-3.1-8b-instant',
      analystModel: process.env.GROQ_ANALYST_MODEL || 'llama-3.3-70b-versatile',
    };
  }
}
