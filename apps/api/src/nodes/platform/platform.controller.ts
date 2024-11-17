import { Controller, Get } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { JsonQueryResponse } from 'src/interface/jsonResponse';

@Controller('api/platforms')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}
  @Get()
  async findAll(): Promise<JsonQueryResponse> {
    const queryResult = await this.platformService.getPlatforms();
    return { data: queryResult };
  }
}
