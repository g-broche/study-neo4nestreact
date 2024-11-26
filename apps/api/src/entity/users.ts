import { Entity } from './entity';
import {
  PermissionDTO,
  RoleDTO,
  UserDTO,
} from 'src/interface/dataTransfertObject';

export class User extends Entity {
  private _username: string;
  private _roles: string[];
  private _permissions: string[];

  constructor(username: string, roles: string[], permissions: string[]) {
    super();
    this.username = username;
    this.roles = roles;
    this.permissions = permissions;
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

  toDTO(): UserDTO {
    const roles: RoleDTO[] = this.roles.map((role) => {
      return { name: role };
    });
    const permissions: PermissionDTO[] = this.permissions.map((permission) => {
      return { access: permission };
    });
    return {
      username: this.username,
      roles: roles,
      permissions: permissions,
    };
  }
}
