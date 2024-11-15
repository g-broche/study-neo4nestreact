import { Test, TestingModule } from '@nestjs/testing';
import { ApiGenreController } from './api-genre.controller';

describe('GenreController', () => {
  let controller: ApiGenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiGenreController],
    }).compile();

    controller = module.get<ApiGenreController>(ApiGenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
