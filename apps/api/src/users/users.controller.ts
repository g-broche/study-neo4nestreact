import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { JsonQueryResponse } from 'src/interface/jsonResponse';
import { UserBasicDTO } from 'src/interface/dataTransfertObject';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('users/createinitialadmin')
  async createInitialAdmin(): Promise<JsonQueryResponse> {
    const queryResponse = await this.usersService.createInitialAdmin();
    return {
      data: {
        success: queryResponse.success,
        items: queryResponse.item ? [queryResponse.item as UserBasicDTO] : [],
        message: queryResponse.message,
      },
    };
  }
}
