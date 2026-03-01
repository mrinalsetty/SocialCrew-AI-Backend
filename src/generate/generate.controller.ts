import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { GenerateService, GenerateResponse } from './generate.service';

@Controller('generate')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}

  @Post()
  async generate(@Body() body: { topic?: string }): Promise<GenerateResponse> {
    const topic = body?.topic?.trim();

    if (!topic) {
      throw new BadRequestException('Topic is required');
    }

    return this.generateService.generateFromTopic(topic);
  }
}
