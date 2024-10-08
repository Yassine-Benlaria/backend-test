import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserBody } from './dtos/queries/update-user.body';
import { CreateUserBody } from './dtos/queries/create-user.body';
import { UserRole } from './user.schema';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('client')
  @ApiOperation({ summary: 'Create a client' })
  async createClient(@Body() body: CreateUserBody) {
    return this.usersService.create({ ...body, role: UserRole.CLIENT });
  }

  @Post('manager')
  @ApiOperation({ summary: 'Create a manager' })
  async createManager(@Body() body: CreateUserBody) {
    return this.usersService.create({ ...body, role: UserRole.MANAGER });
  }

  @Post('admin')
  @ApiOperation({ summary: 'Create an admin' })
  async createAdmin(@Body() body: CreateUserBody) {
    return this.usersService.create({ ...body, role: UserRole.ADMIN });
  }

  @Get()
  @ApiOperation({ summary: 'Get users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  async getUser(id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  async updateUser(id: string, @Body() body: UpdateUserBody) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  async deleteUser(id: string) {
    return this.usersService.remove(id);
  }
}
