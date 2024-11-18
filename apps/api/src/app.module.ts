import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from './neo4j/neo4j.module';
import { GameModule } from './nodes/game/game.module';
import { GenreModule } from './nodes/genre/genre.module';
import { TypeModule } from './nodes/type/type.module';
import { CategoryModule } from './nodes/category/category.module';
import { TagModule } from './nodes/tag/tag.module';
import { PlatformModule } from './nodes/platform/platform.module';
import { VideoModule } from './nodes/video/video.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'media'),
      serveRoot: '/media',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    Neo4jModule.forRootAsync(),
    GameModule,
    GenreModule,
    TypeModule,
    CategoryModule,
    TagModule,
    PlatformModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
