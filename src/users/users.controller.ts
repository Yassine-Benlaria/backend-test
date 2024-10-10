import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './user.schema';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetUsersQuery } from './dtos/get-users.dto';
import { CreateUserBody } from './dtos/create-user.dto';
import { UpdateUserBody } from './dtos/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { SetAllowedRoles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@SetAllowedRoles(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('client')
  @ApiBody({ type: CreateUserBody })
  @ApiOperation({ summary: 'Create a client' })
  async createClient(@Body() body: CreateUserBody) {
    return this.usersService.create({ ...body, role: UserRole.CLIENT });
  }

  @Post('manager')
  @ApiBody({ type: CreateUserBody })
  @ApiOperation({ summary: 'Create a manager' })
  async createManager(@Body() body: CreateUserBody) {
    return this.usersService.create({ ...body, role: UserRole.MANAGER });
  }

  @Post('admin')
  @ApiOperation({ summary: 'Create an admin' })
  @ApiBody({ type: CreateUserBody })
  async createAdmin(@Body() body: CreateUserBody) {
    return this.usersService.create({ ...body, role: UserRole.ADMIN });
  }

  @Get()
  @ApiQuery({ type: GetUsersQuery })
  @ApiOperation({ summary: 'Get users' })
  async getUsers(@Query() query: GetUsersQuery) {
    return this.usersService.find(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  async getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserBody })
  @ApiOperation({ summary: 'Update a user by id' })
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserBody) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  async deleteUser(id: string) {
    return this.usersService.remove(id);
  }
}
