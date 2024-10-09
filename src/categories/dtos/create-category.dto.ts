import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  name: string;
  description?: string;
}

export class CreateCategoryBody {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Category name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'Category description',
  })
  @IsString()
  @IsOptional()
  description: string;
}
