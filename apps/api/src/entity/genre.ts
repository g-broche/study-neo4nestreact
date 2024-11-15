import { Entity } from './entity';
import { GenreDTO } from 'src/interface/dataTransfertObject';

export class Genre extends Entity {
  private _label: string;

  constructor(label: string) {
    super();
    this.label = label;
  }

  public get label(): string {
    return this._label;
  }
  public set label(value: string) {
    this._label = value;
  }

  toDTO(): GenreDTO {
    return { label: this.label };
  }
}
