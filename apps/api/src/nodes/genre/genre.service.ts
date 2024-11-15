import { Inject, Injectable } from '@nestjs/common';
import { Driver, Node } from 'neo4j-driver';
import { GenreDTO } from 'src/interface/dataTransfertObject';
import { NEO4J_DRIVER } from 'src/neo4j/neo4j-constants';

@Injectable()
export class GenreService {
  constructor(
    @Inject(NEO4J_DRIVER)
    private readonly driver: Driver,
  ) {}
}

export function convertRecordToGenreDTO(node: Node): GenreDTO {
  const genreDTO: GenreDTO = { label: node.properties.label };
  return genreDTO;
}
