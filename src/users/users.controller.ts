import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserBody } from './dtos/queries/update-user.body';
import { CreateUserBody } from './dtos/queries/create-user.body';
import { UserRole } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('client')
  async createClient(@Body() body: CreateUserBody) {
    return this.usersService.create({ ...body, role: UserRole.CLIENT });
  }

  @Post('manager')
  async createManager(@Body() body: CreateUserBody) {
    return this.usersService.create({ ...body, role: UserRole.MANAGER });
  }

  @Post('admin')
  async createAdmin(@Body() body: CreateUserBody) {
    return this.usersService.create({ ...body, role: UserRole.ADMIN });
  }

  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUser(id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async updateUser(id: string, @Body() body: UpdateUserBody) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  async deleteUser(id: string) {
    return this.usersService.remove(id);
  }
}
