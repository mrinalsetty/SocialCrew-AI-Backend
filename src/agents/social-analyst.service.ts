import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Groq from 'groq-sdk';
import type { GeneratedPost } from './content-creator.service';
import type { GenerateRequest } from '../generate/generate.types';
import type { StrategyAgentOutput } from './strategy-agent.service';

export type AnalystAgentOutput = {
  bestPost: number;
  reason: string;
  suggestions: string[];
  positioning: string;
};

type RawAnalystResponse = {
  bestPost?: unknown;
  reason?: unknown;
  suggestions?: unknown;
  positioning?: unknown;
};

@Injectable()
export class SocialAnalystService {
  async run(
    input: GenerateRequest,
    posts: GeneratedPost[],
    strategy: StrategyAgentOutput,
  ): Promise<AnalystAgentOutput> {
    const groq = this.getClient();

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_ANALYST_MODEL || 'llama-3.3-70b-versatile',
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `
You are Social Analyst, a performance and messaging evaluation agent.

Return ONLY valid JSON in this exact shape:
{
  "bestPost": 1,
  "reason": "why this post is strongest",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "positioning": "short summary of how the topic should be positioned"
}

Rules:
- Pick the strongest post by id.
- Evaluate for platform fit, clarity, hook strength, and likely engagement.
- Suggestions must be concrete.
- No markdown code fences.
          `.trim(),
        },
        {
          role: 'user',
          content: `
Topic: ${input.topic}
Platform: ${input.platform}
Brand Name: ${input.brandName || 'Personal Brand'}
Audience: ${input.audience || 'Founders, creators, small business operators'}
Tone: ${input.tone || 'Smart, practical, human'}
CTA Style: ${input.ctaStyle || 'Soft CTA'}

Strategy Brief: ${strategy.brief}
Hook Style: ${strategy.hookStyle}
CTA Approach: ${strategy.ctaApproach}

Posts:
${JSON.stringify(posts, null, 2)}
          `.trim(),
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim() || '{}';
    const parsed = this.parseJson(raw);

    return {
      bestPost:
        typeof parsed.bestPost === 'number'
          ? parsed.bestPost
          : Number(parsed.bestPost ?? 1),
      reason:
        typeof parsed.reason === 'string'
          ? parsed.reason
          : 'No reason returned.',
      suggestions: Array.isArray(parsed.suggestions)
        ? parsed.suggestions.map((item: unknown) => String(item))
        : [],
      positioning:
        typeof parsed.positioning === 'string'
          ? parsed.positioning
          : 'Position the topic with clarity and strong hooks.',
    };
  }

  private getClient(): Groq {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new InternalServerErrorException('Missing GROQ_API_KEY');
    }

    return new Groq({ apiKey });
  }

  private parseJson(raw: string): RawAnalystResponse {
    const cleaned = raw
      .replace(/^```json/i, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    try {
      const parsedUnknown: unknown = JSON.parse(cleaned);

      if (!parsedUnknown || typeof parsedUnknown !== 'object') {
        return {};
      }

      return parsedUnknown as RawAnalystResponse;
    } catch {
      throw new InternalServerErrorException(
        'Social Analyst returned invalid JSON.',
      );
    }
  }
}
