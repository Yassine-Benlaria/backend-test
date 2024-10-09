import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}

export class updateProductBody {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Product description',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The category of the product',
    example: 'Category ID',
  })
  @IsString()
  @IsOptional()
  category: string;

  @ApiProperty({
    description: 'The stock of the product',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  stock: number;
}
