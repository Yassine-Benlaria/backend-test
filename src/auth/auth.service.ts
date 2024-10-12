import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserNotFoundException } from '../shared/exceptions/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const { data } = await this.usersService.find({ email });
    const user = data[0];
    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload: JwtPayload = {
      email: user.email,
      role: user.role,
      id: user.id,
    };

    const { accessToken, refreshToken } = await this.generateTokens(payload);

    await this.updateUserRefreshToken(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async generateTokens(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '6h',
      secret: process.env.JWT_SECRET,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_SECRET,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const user = await this.usersService.findByRefreshToken(refreshToken);
    if (!user) {
      throw new UserNotFoundException();
    }

    const payload: JwtPayload = {
      email: user.email,
      role: user.role,
      id: user.id,
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(payload);

    await this.updateUserRefreshToken(user.id, newRefreshToken);
    return {
      access_token: accessToken,
      refresh_token: newRefreshToken,
    };
  }

  async updateUserRefreshToken(userId: string, refreshToken: string) {
    return this.usersService.updateRefreshToken(userId, refreshToken);
  }

  async logout(userId: string) {
    return this.usersService.removeRefreshToken(userId);
  }
}
