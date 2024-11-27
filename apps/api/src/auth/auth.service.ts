import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { TokenPayloadData } from 'src/interface/token';
import { JwtService } from '@nestjs/jwt';
import { UserDetailedDTO } from 'src/interface/dataTransfertObject';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(inputedUsername: string, inputedPassword: string): Promise<any> {
    const passwordQueryResult =
      await this.usersService.getPasswordForAuth(inputedUsername);
    if (!passwordQueryResult.success || !passwordQueryResult.value) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(
      inputedPassword,
      passwordQueryResult.value,
    );
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const queryResult = await this.usersService.findOne(inputedUsername);
    const validatedUser = queryResult.item! as UserDetailedDTO;
    const payload: TokenPayloadData = {
      sub: validatedUser.id,
      username: validatedUser.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
