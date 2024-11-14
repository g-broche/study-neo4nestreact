import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { ApiGameController } from './api-game.controller';

@Module({
  controllers: [ApiGameController],
  providers: [GameService],
})
export class GameModule {}
