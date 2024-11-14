import { Expose } from 'class-transformer';

export class Genre {
  @Expose({ name: 'name' })
  private _name: string;

  constructor(name: string) {
    this.name = name;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
}
