import { Game } from 'src/entity/game';
import { Genre } from 'src/entity/genre';
import { Type } from 'src/entity/type';
import {
  CategoryDTO,
  GameDTO,
  GenreDTO,
  PlatformDTO,
  TagDTO,
  TypeDTO,
  VideoDTO,
} from 'src/interface/dataTransfertObject';

export type Entity = Genre | Game | Type;
export type EntityDTO =
  | GenreDTO
  | GameDTO
  | TypeDTO
  | CategoryDTO
  | TagDTO
  | VideoDTO
  | PlatformDTO;
