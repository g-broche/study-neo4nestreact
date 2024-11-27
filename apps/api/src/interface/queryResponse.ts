import { EntityDTO } from 'src/type/entity';

export interface QueryMultipleEntityResponse {
  success: boolean;
  items: EntityDTO[];
  message?: string;
}
export interface QuerySingleEntityResponse {
  success: boolean;
  item: EntityDTO | undefined;
  message?: string;
}
export interface QueryStringResponse {
  success: boolean;
  value: string | undefined;
  message?: string;
}
