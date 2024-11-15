import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { JsonQueryResponse } from 'src/interface/jsonResponse';

@Controller('api/genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}
  @Get()
  async findAll(): Promise<JsonQueryResponse> {
    const queryResult = await this.genreService.getGenres();
    return { data: queryResult };
  }
}
