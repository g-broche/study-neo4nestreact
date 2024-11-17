import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { convertRecordToCategoryDTO } from 'src/utils/nodeToDTOConverters';

@Injectable()
export class CategoryService {
  constructor(private readonly neo4jService: Neo4jService) {}
  public async getCategories() {
    try {
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(`
        MATCH (ca:CATEGORY)
        return ca`);
      const categories = result.records.map((record) =>
        convertRecordToCategoryDTO(record.get('ca')),
      );
      return {
        success: true,
        items: categories,
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
