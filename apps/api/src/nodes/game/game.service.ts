import { Injectable } from '@nestjs/common';
import { QueryMultipleEntityResponse } from 'src/interface/queryResponse';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { convertRecordToGameDTO } from 'src/utils/nodeToDTOConverters';

@Injectable()
export class GameService {
  constructor(private readonly neo4jService: Neo4jService) {}

  public async getGames(): Promise<QueryMultipleEntityResponse> {
    try {
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(`
        MATCH (ga:GAME)-[:HAS]->(ge:GENRE)
        return ga, collect(ge) as genres`);
      const games = result.records.map((record) =>
        convertRecordToGameDTO(record.get('ga'), record.get('genres')),
      );
      return {
        success: true,
        items: games,
      };
    } catch (error) {
      return {
        success: false,
        items: [],
        message: `could not get games from database query; error : "${error.message}`,
      };
    }
  }
}
