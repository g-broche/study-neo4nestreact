import { Module } from '@nestjs/common';
import { ApiGenreController } from './api-genre.controller';
import { GenreService } from './genre.service';

@Module({
  controllers: [ApiGenreController],
  providers: [GenreService],
})
export class GenreModule {}
