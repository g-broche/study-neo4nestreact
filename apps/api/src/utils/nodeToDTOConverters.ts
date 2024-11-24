import { Node, Record } from 'neo4j-driver';
import {
  CategoryDTO,
  GameDTO,
  GenreDTO,
  PlatformDTO,
  TagDTO,
  TypeDTO,
  VideoDTO,
} from 'src/interface/dataTransfertObject';

export function convertRecordToGenreDTO(node: Node): GenreDTO {
  const genreDTO: GenreDTO = { label: node.properties.label };
  return genreDTO;
}

export function convertRecordToTypeDTO(node: Node): TypeDTO {
  const typeDTO: TypeDTO = { label: node.properties.label };
  return typeDTO;
}

export function convertRecordToCategoryDTO(node: Node): CategoryDTO {
  const categoryDTO: CategoryDTO = { label: node.properties.label };
  return categoryDTO;
}

export function convertRecordToTagDTO(node: Node): TagDTO {
  const tagDTO: TagDTO = { label: node.properties.label };
  return tagDTO;
}

export function convertRecordToPlatformDTO(node: Node): PlatformDTO {
  const platformDTO: PlatformDTO = { name: node.properties.name };
  return platformDTO;
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

export function convertVideoAndRelationsToVideoDTO(record: Record): VideoDTO {
  const videoNode: Node = record.get('video');
  const videoDTO: VideoDTO = {
    id: videoNode.properties.id.toNumber(),
    title: videoNode.properties.title,
    description: videoNode.properties.description,
  };
  if (record.keys.includes('games')) {
    const gamesNode = record.get('games');
    videoDTO.games = gamesNode.map((gameNode: Node) => {
      return { name: gameNode.properties.name };
    });
  }
  if (record.keys.includes('tags')) {
    const tagsNode = record.get('tags');
    videoDTO.tags = tagsNode.map((tagNode: Node) => {
      return { label: tagNode.properties.label };
    });
  }
  if (record.keys.includes('categories')) {
    const categoriesNode = record.get('categories');
    videoDTO.categories = categoriesNode.map((categoryNode: Node) => {
      return { label: categoryNode.properties.label };
    });
  }
  if (record.keys.includes('type')) {
    const typeNode = record.get('type');
    videoDTO.type = { label: typeNode.properties.label };
  }
  if (record.keys.includes('platforms')) {
    const platformNode = record.get('platforms');
    videoDTO.hosts = platformNode.map((platformNode: any) => {
      return {
        name: platformNode.platform.properties.name,
        date: platformNode.details.properties.date.toString(),
        url: platformNode.details.properties.url,
        thumbnail: platformNode.details.properties.thumbnail,
      };
    });
  }
  return videoDTO;
}
