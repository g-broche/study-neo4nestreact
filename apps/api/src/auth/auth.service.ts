
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(inputedUsername: string, inputedPassword: string): Promise<any> {
    const passwordInDB =
      await this.usersService.getPasswordForAuth(inputedUsername);
    if (!passwordInDB) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(inputedPassword, passwordInDB);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const validatedUser = this.usersService.findOne(inputedUsername);
    // TODO: Generate a JWT and return it here
    return;
  }
}
