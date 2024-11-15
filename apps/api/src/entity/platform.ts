import { Entity } from './entity';
import { PlatformDTO } from 'src/interface/dataTransfertObject';

export class Platform extends Entity {
  private _name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  toDTO(): PlatformDTO {
    return { name: this.name };
  }
}
