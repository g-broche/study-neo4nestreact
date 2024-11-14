import { Injectable } from '@nestjs/common';
import { Node } from 'neo4j-driver';
import { Game } from 'src/entity/game';
import { Genre } from 'src/entity/genre';
import { QueryResponse } from 'src/interface/queryResponse';
import { convertRecordToGenre } from '../genre/genre.service';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Injectable()
export class GameService {
  constructor(private readonly neo4jService: Neo4jService) {}

  public async getGames(): Promise<QueryResponse> {
    try {
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(`
        MATCH (ga:GAME)-[:HAS]->(ge:GENRE)
        return ga, collect(ge) as genres`);
      const games = result.records.map((record) =>
        convertRecordToGame(record.get('ga'), record.get('genres')),
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

export function convertRecordToGame(gameNode: Node, genreNodes: Node[]): Game {
  const name: string = gameNode.properties.name;
  const genres: Genre[] = genreNodes.map((genreNode: Node) =>
    convertRecordToGenre(genreNode),
  );
  return new Game(name, genres);
}
