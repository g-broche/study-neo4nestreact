import { EntityDTO, UserDTO } from 'src/type/entity';
import { PermissionDTO, RoleDTO } from './dataTransfertObject';

export interface JsonQueryResponse {
  data: {
    success: boolean;
    items: EntityDTO[] | UserDTO[];
    message?: string;
  };
}

export interface JsonSignInResponse {
  data: {
    token: string;
    username: string;
    roles: RoleDTO[];
    permissions: PermissionDTO[];
  };
}
