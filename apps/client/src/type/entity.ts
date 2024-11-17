import { CategoryDTO, GameDTO, GenreDTO, PlatformDTO, TagDTO, TypeDTO, VideoDTO } from "../interface/dataTransfertObject";

export type EntityDTO =
  | GenreDTO
  | GameDTO
  | TypeDTO
  | CategoryDTO
  | TagDTO
  | VideoDTO
  | PlatformDTO;
