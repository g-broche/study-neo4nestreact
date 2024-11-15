import { Node } from 'neo4j-driver';
import { GameDTO, GenreDTO } from 'src/interface/dataTransfertObject';

export function convertRecordToGenreDTO(node: Node): GenreDTO {
  const genreDTO: GenreDTO = { label: node.properties.label };
  return genreDTO;
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
