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
import { CategoriesService } from './categories.service';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateCategoryBody } from './dtos/create-category.dto';
import { GetCategoriesQuery } from './dtos/get-categories.dto';
import { UpdateCategoryBody } from './dtos/update-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/user.schema';
import { SetAllowedRoles } from '../auth/decorators/roles.decorator';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a category' })
  @ApiBody({ type: CreateCategoryBody })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetAllowedRoles(UserRole.ADMIN, UserRole.MANAGER)
  @Post()
  async createCategory(@Body() body: CreateCategoryBody) {
    return this.categoriesService.create(body);
  }

  @ApiOperation({ summary: 'Get categories with filters' })
  @ApiQuery({ type: GetCategoriesQuery })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCategories(@Query() query: GetCategoriesQuery) {
    return this.categoriesService.find(query);
  }

  @ApiOperation({ summary: 'Update a category by id' })
  @ApiBody({ type: UpdateCategoryBody })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetAllowedRoles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryBody,
  ) {
    return this.categoriesService.update(id, body);
  }

  @ApiOperation({ summary: 'Remove a category by id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetAllowedRoles(UserRole.ADMIN)
  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
