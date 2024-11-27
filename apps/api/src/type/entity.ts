import { Category } from 'src/entity/category';
import { Game } from 'src/entity/game';
import { Genre } from 'src/entity/genre';
import { Platform } from 'src/entity/platform';
import { Tag } from 'src/entity/tag';
import { Type } from 'src/entity/type';
import { Video } from 'src/entity/video';
import {
  CategoryDTO,
  GameDTO,
  GenreDTO,
  PlatformDTO,
  TagDTO,
  TypeDTO,
  UserBasicDTO,
  UserDetailedDTO,
  VideoDTO,
} from 'src/interface/dataTransfertObject';

export type Entity = Genre | Game | Type | Category | Tag | Platform | Video;
export type EntityDTO =
  | GenreDTO
  | GameDTO
  | TypeDTO
  | CategoryDTO
  | TagDTO
  | VideoDTO
  | PlatformDTO;
export type UserDTO = UserBasicDTO | UserDetailedDTO;
