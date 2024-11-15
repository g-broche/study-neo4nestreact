import { Injectable } from '@nestjs/common';
import { Node } from 'neo4j-driver';
import { QueryResponse } from 'src/interface/queryResponse';
import { convertRecordToGenreDTO } from '../genre/genre.service';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { GameDTO, GenreDTO } from 'src/interface/dataTransfertObject';

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

export function convertRecordToGameDTO(
  gameNode: Node,
  genreNodes?: Node[],
): GameDTO {
  const gameDTO: GameDTO = { name: gameNode.properties.name };
  if (genreNodes !== undefined) {
    const genresDTO: GenreDTO[] = genreNodes.map((genreNode: Node) =>
      convertRecordToGenreDTO(genreNode),
    );
    gameDTO.genres = genresDTO;
  }
  return gameDTO;
}
