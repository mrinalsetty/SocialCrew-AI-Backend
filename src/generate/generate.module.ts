import { Module } from '@nestjs/common';
import { GenerateController } from './generate.controller';
import { GenerateService } from './generate.service';
import { SocialCrewGraph } from './socialcrew.graph';
import { ContentCreatorService } from '../agents/content-creator.service';
import { SocialAnalystService } from '../agents/social-analyst.service';

@Module({
  controllers: [GenerateController],
  providers: [
    GenerateService,
    SocialCrewGraph,
    ContentCreatorService,
    SocialAnalystService,
  ],
})
export class GenerateModule {}
