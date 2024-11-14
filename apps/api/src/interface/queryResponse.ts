import { Entity } from 'src/type/entity';

export interface QueryResponse {
  success: boolean;
  items: Entity[];
  message?: string;
}
