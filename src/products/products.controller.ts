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
import { ProductsService } from './products.service';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateProductBody } from './dtos/create-product.dto';
import { GetProductsQuery } from './dtos/get-products.dto';
import { updateProductBody } from './dtos/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SetAllowedRoles } from '../auth/decorators/roles.decorator';
import { User, UserRole } from '../users/user.schema';
import { RolesGuard } from '../auth/roles.guard';
import { AuthUser } from '../auth/decorators/get-user.decorator';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({ type: CreateProductBody })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetAllowedRoles(UserRole.ADMIN, UserRole.MANAGER)
  @Post()
  async createProduct(@Body() body: CreateProductBody) {
    return this.productsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetAllowedRoles(UserRole.ADMIN, UserRole.CLIENT, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get products with filters' })
  @ApiQuery({ type: GetProductsQuery })
  @Get()
  async getProducts(@Query() query: GetProductsQuery) {
    return this.productsService.find(query);
  }

  @ApiOperation({ summary: 'Get a product by id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetAllowedRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CLIENT)
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a product by id' })
  @ApiBody({ type: updateProductBody })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetAllowedRoles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: updateProductBody,
  ) {
    return this.productsService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete a product by id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetAllowedRoles(UserRole.ADMIN)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
