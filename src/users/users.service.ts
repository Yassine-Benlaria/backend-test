import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { GetUsersQuery } from './dtos/get-users.dto';
import { PaginatedResponse } from '../shared/utils/pagination';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(dto);
  }

  async find(query: GetUsersQuery): Promise<PaginatedResponse<User>> {
    return await this.usersRepository.find(query);
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findByIdOrFail(id);
  }

  async update(id: string, dto: UpdateUserDto) {
    return await this.usersRepository.update(id, dto);
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return await this.usersRepository.updateRefreshToken(id, refreshToken);
  }

  async removeRefreshToken(id: string) {
    return await this.removeRefreshToken(id);
  }

  async findByRefreshToken(refreshToken: string) {
    return this.usersRepository.findByRefreshToken(refreshToken);
  }

  async remove(id: string) {
    return await this.usersRepository.remove(id);
  }
}
