import { Controller, Get } from '@nestjs/common';
import { TypeService } from './type.service';
import { JsonQueryResponse } from 'src/interface/jsonResponse';

@Controller('api/types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}
  @Get()
  async findAll(): Promise<JsonQueryResponse> {
    const queryResult = await this.typeService.getTypes();
    return { data: queryResult };
  }
}
