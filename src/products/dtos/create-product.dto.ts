import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock?: number;
}

export class CreateProductBody {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product name',
  })
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The category of the product',
    example: 'Category ID',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'The stock of the product',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  stock: number;
}
