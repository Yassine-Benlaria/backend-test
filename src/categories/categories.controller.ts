import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateCategoryBody } from './dtos/create-category.dto';
import { GetCategoriesQuery } from './dtos/get-categories.dto';
import { UpdateCategoryBody } from './dtos/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a category' })
  @ApiBody({ type: CreateCategoryBody })
  @Post()
  async createCategory(@Body() body: CreateCategoryBody) {
    return this.categoriesService.create(body);
  }

  @ApiOperation({ summary: 'Get categories with filters' })
  @ApiQuery({ type: GetCategoriesQuery })
  @Get()
  async getCategories(@Query() query: GetCategoriesQuery) {
    return this.categoriesService.find(query);
  }

  @ApiOperation({ summary: 'Update a category by id' })
  @Patch(':id')
  @ApiBody({ type: UpdateCategoryBody })
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryBody,
  ) {
    return this.categoriesService.update(id, body);
  }

  @ApiOperation({ summary: 'Remove a category by id' })
  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
