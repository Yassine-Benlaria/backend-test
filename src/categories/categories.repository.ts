import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { GetCategoriesQuery } from './dtos/get-categories.dto';
import { PaginatedResponse } from '../shared/utils/pagination';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: SoftDeleteModel<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(dto);
    return await createdCategory.save();
  }

  async find(
    command: GetCategoriesQuery,
  ): Promise<PaginatedResponse<Category>> {
    const filter: any = {};
    if (command.name) filter.name = { $regex: command.name, $options: 'i' };
    if (command.description)
      filter.description = { $regex: command.description, $options: 'i' };

    const categories = await this.categoryModel
      .find(filter)
      .skip(command.skip)
      .limit(command.take)
      .exec();

    const total = await this.categoryModel.countDocuments(filter).exec();

    return {
      data: categories,
      meta: { skip: command.skip, take: command.take, total },
    };
  }

  async update(id: string, dto: CreateCategoryDto) {
    const filter = { _id: id };
    const updatedCategory = await this.categoryModel
      .updateOne(filter, dto)
      .exec();
    return updatedCategory;
  }
  async remove(id: string) {
    const filter = { _id: id };
    return this.categoryModel.softDelete(filter);
  }
}
