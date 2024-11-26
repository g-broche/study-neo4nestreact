
import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/interface/dataTransfertObject';

@Injectable()
export class UsersService {
  async getPasswordForAuth(username: string): Promise<string | undefined> {
    return;
  }
  async findOne(username: string): Promise<UserDTO | undefined> {
    return;
  }
}
