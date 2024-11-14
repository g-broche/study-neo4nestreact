import { Expose } from 'class-transformer';
import { Genre } from './genre';

export class Game {
  @Expose({ name: 'name' })
  private _name: string;

  @Expose({ name: 'genres' })
  private _genres: Genre[];

  constructor(name: string, genres: Genre[]) {
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
}
