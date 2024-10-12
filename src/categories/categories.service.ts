import { Injectable } from '@nestjs/common';
import { Category } from './category.schema';
import { PaginatedResponse } from '../shared/utils/pagination';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { GetCategoriesQuery } from './dtos/get-categories.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesRepository.create(dto);
  }

  async find(
    command: GetCategoriesQuery,
  ): Promise<PaginatedResponse<Category>> {
    return await this.categoriesRepository.find(command);
  }

  async update(id: string, dto: CreateCategoryDto) {
    return await this.categoriesRepository.update(id, dto);
  }

  async remove(id: string) {
    return await this.categoriesRepository.remove(id);
  }
}
