import { Expose } from 'class-transformer';
import { Entity } from './entity';
import { CategoryDTO } from 'src/interface/dataTransfertObject';

export class Category extends Entity {
  @Expose({ name: 'label' })
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

  toDTO(): CategoryDTO {
    return { label: this.label };
  }
}
