import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { convertVideoAndRelationsToVideoDTO } from 'src/utils/nodeToDTOConverters';

@Injectable()
export class VideoService {
  constructor(private readonly neo4jService: Neo4jService) {}
  public async getVideos() {
    try {
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(`
        MATCH (video:VIDEO)
        OPTIONAL MATCH (video)-[r_has:HAS]->(tag:TAG)
        OPTIONAL MATCH (video)-[r_isOf:IS_OF]->(type:TYPE)
        OPTIONAL MATCH (video)-[r_belongsTo:BELONGS_TO]->(category:CATEGORY)
        OPTIONAL MATCH (video)-[r_features:FEATURES]->(game:GAME)
        OPTIONAL MATCH (video)-[r_isHostedOn:IS_HOSTED_ON]->(platform:PLATFORM)
        RETURN 
          video,
          COLLECT(DISTINCT tag) AS tags,
          type,
          COLLECT(DISTINCT category) AS categories,
          COLLECT(DISTINCT game) AS games,
          COLLECT(DISTINCT {platform: platform, details: r_isHostedOn}) AS platforms;`);
      const videos = result.records.map((record) =>
        convertVideoAndRelationsToVideoDTO(record),
      );
      return {
        success: true,
        items: videos,
      };
    } catch (error) {
      return {
        success: false,
        items: [],
        message: `could not get categories from database query; error : "${error.message}`,
      };
    }
  }
}
