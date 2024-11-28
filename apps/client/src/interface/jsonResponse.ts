import { EntityDTO } from '../type/entity';
import { RoleDTO } from './dataTransfertObject';

export interface JsonResponse {
  data: {
    success: boolean;
    items: EntityDTO[];
    message?: string;
  };
}

export interface JsonSignInResponse {
  data: {
    token: string;
    username: string;
    roles: RoleDTO[];
  };
}
