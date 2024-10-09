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
import { ProductsService } from './products.service';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateProductBody } from './dtos/create-product.dto';
import { GetProductsQuery } from './dtos/get-products.query';
import { updateProductBody } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({ type: CreateProductBody })
  @Post()
  async createProduct(@Body() body: CreateProductBody) {
    return this.productsService.create(body);
  }

  @ApiOperation({ summary: 'Get products with filters' })
  @ApiQuery({ type: GetProductsQuery })
  @Get()
  async getProducts(@Query() query: GetProductsQuery) {
    return this.productsService.find(query);
  }

  @ApiOperation({ summary: 'Get a product by id' })
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a product by id' })
  @ApiBody({ type: updateProductBody })
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: updateProductBody,
  ) {
    return this.productsService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete a product by id' })
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
