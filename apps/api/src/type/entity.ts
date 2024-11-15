import { Game } from 'src/entity/game';
import { Genre } from 'src/entity/genre';
import { GameDTO, GenreDTO } from 'src/interface/dataTransfertObject';

export type Entity = Genre | Game;
export type EntityDTO = GenreDTO | GameDTO;
