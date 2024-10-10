import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginBody } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ description: 'login using email and password' })
  @ApiBody({ type: LoginBody })
  async loginWithEmail(@Body() body: LoginBody) {
    return this.authService.login(body.email, body.password);
  }
}
