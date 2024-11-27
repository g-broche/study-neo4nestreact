import { EntityDTO, UserDTO } from 'src/type/entity';

export interface QueryMultipleEntityResponse {
  success: boolean;
  items: EntityDTO[] | UserDTO[];
  message?: string;
}
export interface QuerySingleEntityResponse {
  success: boolean;
  item: EntityDTO | UserDTO | undefined;
  message?: string;
}
export interface QueryStringResponse {
  success: boolean;
  value: string | undefined;
  message?: string;
}
