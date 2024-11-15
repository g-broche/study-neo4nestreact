import { Entity } from './entity';
import { TypeDTO } from 'src/interface/dataTransfertObject';

export class Type extends Entity {
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

  toDTO(): TypeDTO {
    return { label: this.label };
  }
}
