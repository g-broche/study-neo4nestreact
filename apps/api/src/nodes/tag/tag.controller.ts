import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { JsonQueryResponse } from 'src/interface/jsonResponse';

@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  async findAll(): Promise<JsonQueryResponse> {
    const queryResult = await this.tagService.getTags();
    return { data: queryResult };
  }
}
