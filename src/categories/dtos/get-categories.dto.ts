import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCategoriesQuery {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Category name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'Category description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The number of items to skip',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  skip?: number = 1;

  @ApiProperty({
    description: 'The number of items to take',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  take?: number = 10;
}
