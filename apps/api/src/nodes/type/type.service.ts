import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { convertRecordToTypeDTO } from 'src/utils/nodeToDTOConverters';

@Injectable()
export class TypeService {
  constructor(private readonly neo4jService: Neo4jService) {}
  public async getTypes() {
    try {
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(`
        MATCH (ty:TYPE)
        return ty`);
      const types = result.records.map((record) =>
        convertRecordToTypeDTO(record.get('ty')),
      );
      return {
        success: true,
        items: types,
      };
    } catch (error) {
      return {
        success: false,
        items: [],
        message: `could not get types from database query; error : "${error.message}`,
      };
    }
  }
}
