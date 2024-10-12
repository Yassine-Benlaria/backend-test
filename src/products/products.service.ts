import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { GetProductsQuery } from './dtos/get-products.dto';
import { PaginatedResponse } from '../shared/utils/pagination';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.create(dto);
  }

  async find(command: GetProductsQuery): Promise<PaginatedResponse<Product>> {
    return await this.productsRepository.find(command);
  }

  async findOne(id: string): Promise<Product> {
    return await this.productsRepository.findByIdOrFail(id);
  }

  async update(id: string, dto: CreateProductDto) {
    return await this.productsRepository.update(id, dto);
  }

  async remove(id: string) {
    return await this.productsRepository.remove(id);
  }
}
