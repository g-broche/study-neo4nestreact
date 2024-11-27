import {
  PermissionDTO,
  RoleDTO,
  UserBasicDTO,
  UserDetailedDTO,
} from 'src/interface/dataTransfertObject';

export class User {
  private _id: string;
  private _username: string;
  private _roles: string[];
  private _permissions: string[];

  constructor(
    id: string,
    username: string,
    roles: string[],
    permissions: string[],
  ) {
    this.id = id;
    this.username = username;
    this.roles = roles;
    this.permissions = permissions;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  public get roles(): string[] {
    return this._roles;
  }
  public set roles(value: string[]) {
    this._roles = value;
  }

  public get permissions(): string[] {
    return this._permissions;
  }
  public set permissions(value: string[]) {
    this._permissions = value;
  }

  toDetailedDTO(): UserDetailedDTO {
    const roles: RoleDTO[] = this.roles.map((role) => {
      return { label: role };
    });
    const permissions: PermissionDTO[] = this.permissions.map((permission) => {
      return { right: permission };
    });
    return {
      id: this.id,
      username: this.username,
      roles: roles,
      permissions: permissions,
    };
  }

  toBasicDTO(): UserBasicDTO {
    const roles: RoleDTO[] = this.roles.map((role) => {
      return { label: role };
    });
    return {
      username: this.username,
      roles: roles,
    };
  }
}
