import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { convertRecordToTagDTO } from 'src/utils/nodeToDTOConverters';

@Injectable()
export class TagService {
  constructor(private readonly neo4jService: Neo4jService) {}
  public async getTags() {
    try {
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(`
        MATCH (tag:TAG)
        return tag`);
      const tags = result.records.map((record) =>
        convertRecordToTagDTO(record.get('tag')),
      );
      return {
        success: true,
        items: tags,
      };
    } catch (error) {
      return {
        success: false,
        items: [],
        message: `could not get tags from database query; error : "${error.message}`,
      };
    }
  }
}
