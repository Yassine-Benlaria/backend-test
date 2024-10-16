import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginBody } from './dtos/login.dto';
import { RefreshTokenBody } from './dtos/refresh-token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthUser } from './decorators/get-user.decorator';
import { User } from '../users/user.schema';
import { RefreshTokenGuard } from './refresh-token.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'login using email and password' })
  @ApiBody({ type: LoginBody })
  async loginWithEmail(@Body() body: LoginBody) {
    return this.authService.login(body.email, body.password);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'refresh access token' })
  @ApiBody({ type: RefreshTokenBody })
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Body() body: RefreshTokenBody) {
    return this.authService.refreshToken(body.refreshToken);
  }

  @Post('logout')
  @ApiOperation({ summary: 'logout' })
  @UseGuards(JwtAuthGuard)
  async logout(@AuthUser() user: User) {
    return this.authService.logout(user.id);
  }
}
