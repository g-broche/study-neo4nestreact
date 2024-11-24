import { HostDTO, VideoDTO } from 'src/interface/dataTransfertObject';
import { Entity } from './entity';
import { Type } from './type';
import { Category } from './category';
import { Tag } from './tag';
import { Platform } from './platform';
import { Game } from './game';

interface VideoConstructorParams {
  id?: number;
  title: string;
  description: string;
  type: Type;
  categories: Category[];
  games?: Game[];
  tags?: Tag[];
  hosts: {
    platform: Platform;
    date: Date;
    url: string;
    thumbnail: string;
  }[];
}

export class Video extends Entity {
  private _id: number | null;
  private _title: string;
  private _description: string;
  private _games?: Game[] | undefined;
  private _type: Type;
  private _categories: Category[];
  private _tags?: Tag[] | undefined;
  private _hosts: {
    platform: Platform;
    date: Date;
    url: string;
    thumbnail: string;
  }[];

  constructor({
    id,
    title,
    description,
    type,
    categories,
    games,
    tags,
    hosts,
  }: VideoConstructorParams) {
    super();
    this.id = id ? id : null;
    this.title = title;
    this.description = description;
    this.games = games;
    this.type = type;
    this.categories = categories;
    this.tags = tags;
    this.hosts = hosts;
  }

  // Getters and setters

  public get id(): number | null {
    return this._id;
  }
  public set id(value: number | null) {
    this._id = value;
  }

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

  public get games(): Game[] | undefined {
    return this._games;
  }
  public set games(value: Game[] | undefined) {
    this._games = value;
  }

  public get type(): Type {
    return this._type;
  }
  public set type(value: Type) {
    this._type = value;
  }

  public get categories(): Category[] {
    return this._categories;
  }
  public set categories(value: Category[]) {
    this._categories = value;
  }

  public get tags(): Tag[] | undefined {
    return this._tags;
  }
  public set tags(value: Tag[] | undefined) {
    this._tags = value;
  }

  public get hosts(): {
    platform: Platform;
    date: Date;
    url: string;
    thumbnail: string;
  }[] {
    return this._hosts;
  }
  public set hosts(
    value: {
      platform: Platform;
      date: Date;
      url: string;
      thumbnail: string;
    }[],
  ) {
    this._hosts = value;
  }

  // converter to DTO

  toDTO(): VideoDTO {
    const videoDTO: VideoDTO = {
      id: this.id || 0,
      title: this.title,
      description: this.description,
      type: this.type,
    };
    if (this.categories !== undefined) {
      videoDTO.categories = this.categories.map((category) => category.toDTO());
    }
    if (this.tags !== undefined) {
      videoDTO.tags = this.tags.map((tag) => tag.toDTO());
    }
    if (this.games !== undefined) {
      videoDTO.games = this.games.map((game) => game.toDTO());
    }
    if (this.hosts !== undefined) {
      videoDTO.hosts = this.hosts.map((host) =>
        this.convertHostDataToHostDTO(host),
      );
    }
    return videoDTO;
  }

  convertHostDataToHostDTO(host: {
    platform: Platform;
    date: Date;
    url: string;
    thumbnail: string;
  }): HostDTO {
    return {
      name: host.platform.name,
      date: host.date,
      url: host.url,
      thumbnail: host.thumbnail,
    };
  }
}
