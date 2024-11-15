import { EntityDTO } from 'src/type/entity';

export abstract class Entity {
  abstract toDTO(): EntityDTO;
}
