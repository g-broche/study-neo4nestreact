import { Injectable } from '@nestjs/common';
import { Roles } from 'src/enum/roles';
import { UserDTO } from 'src/interface/dataTransfertObject';
import {
  QuerySingleEntityResponse,
  QueryStringResponse,
} from 'src/interface/queryResponse';

@Injectable()
export class UsersService {
  async getPasswordForAuth(username: string): Promise<QueryStringResponse> {
    try {
      return {
        success: true,
        value: undefined,
      };
    } catch (error) {
      return {
        success: false,
        value: undefined,
        message: 'error occured while getting password',
      };
    }
  }
  async findOne(username: string): Promise<QuerySingleEntityResponse> {
    try {
      return {
        success: true,
        item: undefined,
      };
    } catch (error) {
      return {
        success: false,
        item: undefined,
        message: 'error occured while finding user',
      };
    }
  }

  async createNewUser(
    username: string,
    password: string,
    roles: Roles[],
  ): Promise<QuerySingleEntityResponse> {
    try {
      return {
        success: true,
        item: undefined,
      };
    } catch (error) {
      return {
        success: false,
        item: undefined,
        message: 'error occured while creating user',
      };
    }
  }
}
