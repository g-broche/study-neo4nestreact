import { Controller, Get } from '@nestjs/common';
import { VideoService } from './video.service';
// import { JsonQueryResponse } from 'src/interface/jsonResponse';

@Controller('api/videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  @Get()
  async findAll(): Promise<object> {
    const queryResult = await this.videoService.getVideos();
    return { data: queryResult };
  }
}
