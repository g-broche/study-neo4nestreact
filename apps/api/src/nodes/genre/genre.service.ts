import { Inject, Injectable } from '@nestjs/common';
import { Driver, Node } from 'neo4j-driver';
import { Genre } from 'src/entity/genre';
import { NEO4J_DRIVER } from 'src/neo4j/neo4j-constants';

@Injectable()
export class GenreService {
  constructor(
    @Inject(NEO4J_DRIVER)
    private readonly driver: Driver,
  ) {}
}

export function convertRecordToGenre(node: Node): Genre {
  const name: string = node.properties.label;
  return new Genre(name);
}
