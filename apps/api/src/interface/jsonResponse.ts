import { EntityDTO, UserDTO } from 'src/type/entity';

export interface JsonQueryResponse {
  data: {
    success: boolean;
    items: EntityDTO[] | UserDTO[];
    message?: string;
  };
}
