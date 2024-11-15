import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { convertRecordToGenreDTO } from 'src/utils/nodeToDTOConverters';

@Injectable()
export class GenreService {
  constructor(private readonly neo4jService: Neo4jService) {}
  public async getGenres() {
    try {
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(`
        MATCH (ge:GENRE)
        return ge`);
      const genres = result.records.map((record) =>
        convertRecordToGenreDTO(record.get('ge')),
      );
      return {
        success: true,
        items: genres,
      };
    } catch (error) {
      return {
        success: false,
        items: [],
        message: `could not get genres from database query; error : "${error.message}`,
      };
    }
  }
}
