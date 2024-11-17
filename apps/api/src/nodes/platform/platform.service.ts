import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { convertRecordToPlatformDTO } from 'src/utils/nodeToDTOConverters';

@Injectable()
export class PlatformService {
  constructor(private readonly neo4jService: Neo4jService) {}
  public async getPlatforms() {
    try {
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(`
        MATCH (p:PLATFORM)
        return p`);
      const platforms = result.records.map((record) =>
        convertRecordToPlatformDTO(record.get('p')),
      );
      return {
        success: true,
        items: platforms,
      };
    } catch (error) {
      return {
        success: false,
        items: [],
        message: `could not get platforms from database query; error : "${error.message}`,
      };
    }
  }
}
