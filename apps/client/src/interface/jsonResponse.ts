import { EntityDTO } from '../type/entity';

export interface JsonResponse {
  data: {
    success: boolean;
    items: EntityDTO[];
    message?: string;
  };
}
