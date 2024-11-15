import { EntityDTO } from 'src/type/entity';

export interface QueryResponse {
  success: boolean;
  items: EntityDTO[];
  message?: string;
}
