import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { JsonQueryResponse } from 'src/interface/jsonResponse';

@Controller('api/games')
export class ApiGameController {
  constructor(private readonly gameService: GameService) {}
  @Get()
  async findAll(): Promise<JsonQueryResponse> {
    const queryResult = await this.gameService.getGames();
    return { data: queryResult };
  }
}
