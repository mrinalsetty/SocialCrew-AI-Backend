import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Groq from 'groq-sdk';
import type { GenerateRequest } from '../generate/generate.types';

export type StrategyAgentOutput = {
  angle: string;
  audienceFit: string;
  hookStyle: string;
  ctaApproach: string;
  brief: string;
};

type RawStrategyResponse = {
  angle?: unknown;
  audienceFit?: unknown;
  hookStyle?: unknown;
  ctaApproach?: unknown;
  brief?: unknown;
};

@Injectable()
export class StrategyAgentService {
  async run(input: GenerateRequest): Promise<StrategyAgentOutput> {
    const groq = this.getClient();

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_ANALYST_MODEL || 'llama-3.3-70b-versatile',
      temperature: 0.3,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `
You are Strategy Agent.

Return ONLY valid JSON in this exact shape:
{
  "angle": "main content angle",
  "audienceFit": "why this topic fits the audience",
  "hookStyle": "recommended hook style",
  "ctaApproach": "recommended CTA style",
  "brief": "one concise creative strategy brief"
}

Rules:
- Think like a social strategist.
- Optimize for the requested platform.
- Keep the brief concise and actionable.
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
          `.trim(),
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim() || '{}';
    const parsed = this.parseJson(raw);

    return {
      angle:
        typeof parsed.angle === 'string'
          ? parsed.angle
          : 'Insight-driven educational angle',
      audienceFit:
        typeof parsed.audienceFit === 'string'
          ? parsed.audienceFit
          : 'This topic matches the target audience.',
      hookStyle:
        typeof parsed.hookStyle === 'string'
          ? parsed.hookStyle
          : 'Strong curiosity hook',
      ctaApproach:
        typeof parsed.ctaApproach === 'string'
          ? parsed.ctaApproach
          : 'Soft CTA',
      brief:
        typeof parsed.brief === 'string'
          ? parsed.brief
          : 'Create a concise, platform-aware post with a strong opening hook.',
    };
  }

  private getClient(): Groq {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new InternalServerErrorException('Missing GROQ_API_KEY');
    }

    return new Groq({ apiKey });
  }

  private parseJson(raw: string): RawStrategyResponse {
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

      return parsedUnknown as RawStrategyResponse;
    } catch {
      throw new InternalServerErrorException(
        'Strategy Agent returned invalid JSON.',
      );
    }
  }
}
