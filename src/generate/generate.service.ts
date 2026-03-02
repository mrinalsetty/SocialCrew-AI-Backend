import { Injectable } from '@nestjs/common';
import { SocialCrewGraph } from './socialcrew.graph';
import type { GeneratedPost } from '../agents/content-creator.service';
import type { GenerateRequest } from './generate.types';

export interface GenerateResponse {
  strategy: {
    angle: string;
    audienceFit: string;
    hookStyle: string;
    ctaApproach: string;
    brief: string;
  };
  contentCreator: GeneratedPost[];
  contentSummary: string;
  socialAnalyst: {
    bestPost: number;
    reason: string;
    suggestions: string[];
    positioning: string;
  };
  agentFlow: {
    name: string;
    summary: string;
  }[];
}

@Injectable()
export class GenerateService {
  constructor(private readonly socialCrewGraph: SocialCrewGraph) {}

  async generateFromTopic(input: GenerateRequest): Promise<GenerateResponse> {
    const result = await this.socialCrewGraph.invoke(input);

    return {
      strategy: {
        angle: result.strategyOutput?.angle ?? '',
        audienceFit: result.strategyOutput?.audienceFit ?? '',
        hookStyle: result.strategyOutput?.hookStyle ?? '',
        ctaApproach: result.strategyOutput?.ctaApproach ?? '',
        brief: result.strategyOutput?.brief ?? '',
      },
      contentCreator: result.creatorOutput?.posts ?? [],
      contentSummary:
        result.creatorOutput?.summary ?? 'No creator summary returned.',
      socialAnalyst: {
        bestPost: result.analystOutput?.bestPost ?? 1,
        reason: result.analystOutput?.reason ?? 'No analyst reason returned.',
        suggestions: result.analystOutput?.suggestions ?? [],
        positioning:
          result.analystOutput?.positioning ??
          'No positioning recommendation returned.',
      },
      agentFlow: [
        {
          name: 'Strategy Agent',
          summary:
            result.strategyOutput?.brief || 'No strategy brief returned.',
        },
        {
          name: 'Creator Agent',
          summary:
            result.creatorOutput?.summary || 'No creator summary returned.',
        },
        {
          name: 'Analyst Agent',
          summary:
            result.analystOutput?.reason || 'No analyst reason returned.',
        },
      ],
    };
  }
}
