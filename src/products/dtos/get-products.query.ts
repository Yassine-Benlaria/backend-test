import { Product } from '../product.schema';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetProductsQuery {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  category?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: false })
  priceMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: false })
  priceMax?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: false })
  skip?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: false })
  take?: number = 10;
}
