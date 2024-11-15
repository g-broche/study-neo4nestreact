import { Entity } from './entity';
import { TagDTO } from 'src/interface/dataTransfertObject';

export class Tag extends Entity {
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

  toDTO(): TagDTO {
    return { label: this.label };
  }
}
