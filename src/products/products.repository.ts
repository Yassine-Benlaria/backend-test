import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Product } from './product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { GetProductsQuery } from './dtos/get-products.dto';
import { PaginatedResponse } from '../shared/utils/pagination';
import { ProductNotFoundException } from '../shared/exceptions/exceptions';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: SoftDeleteModel<Product>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(dto);
    return await createdProduct.save();
  }

  async find(command: GetProductsQuery): Promise<PaginatedResponse<Product>> {
    const filter: any = {};
    if (command.id) filter._id = command.id;
    if (command.name) filter.name = { $regex: command.name, $options: 'i' };
    if (command.description)
      filter.description = { $regex: command.description, $options: 'i' };
    if (command.category) filter.category = command.category;
    if (command.priceMin)
      filter.price = { ...filter.price, $gte: command.priceMin };
    if (command.priceMax)
      filter.price = { ...filter.price, $lte: command.priceMax };

    const products = await this.productModel
      .find(filter)
      .skip(command.skip)
      .limit(command.take)
      .exec();

    const total = await this.productModel.countDocuments(filter).exec();

    return {
      data: products,
      meta: { skip: command.skip, take: command.take, total },
    };
  }

  async findByIdOrFail(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new ProductNotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, dto: CreateProductDto) {
    const filter = { _id: id };
    const updatedProduct = await this.productModel
      .updateOne(filter, dto)
      .exec();
    return updatedProduct;
  }

  async remove(id: string) {
    const filter = { _id: id };
    return this.productModel.softDelete(filter);
  }
}
