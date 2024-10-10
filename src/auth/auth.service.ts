import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundException } from './contants/exceptions';
import { JwtPayload } from './jwt-payload.interface';

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
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
