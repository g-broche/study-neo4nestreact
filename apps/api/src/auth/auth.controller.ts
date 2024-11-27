import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from 'src/interface/dataTransfertObject';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginData: loginDTO) {
    return this.authService.signIn(loginData.username, loginData.password);
  }
}
