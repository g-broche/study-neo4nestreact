import { EntityDTO } from 'src/type/entity';

export interface JsonQueryResponse {
  success: boolean;
  items: EntityDTO[];
  message?: string;
}
