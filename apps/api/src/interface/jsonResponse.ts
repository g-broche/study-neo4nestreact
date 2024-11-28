import { EntityDTO, UserDTO } from 'src/type/entity';

export interface JsonQueryResponse {
  data: {
    success: boolean;
    items: EntityDTO[] | UserDTO[];
    message?: string;
  };
}

export interface JsonSignInResponse {
  data: {
    success: boolean;
    token: string;
    message?: string;
  };
}
