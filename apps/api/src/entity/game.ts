import { GameDTO } from 'src/interface/dataTransfertObject';
import { Genre } from './genre';
import { Entity } from './entity';

export class Game extends Entity {
  private _name: string;
  private _genres: Genre[];

  constructor(name: string, genres: Genre[]) {
    super();
    this.name = name;
    this.genres = genres;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get genres(): Genre[] {
    return this._genres;
  }
  public set genres(value: Genre[]) {
    this._genres = value;
  }
  toDTO(): GameDTO {
    const gameDTO: GameDTO = { name: this._name };
    if (this._genres !== undefined) {
      gameDTO.genres = this._genres.map((genre) => genre.toDTO());
    }
    return gameDTO;
  }
}
