import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  name?: string;
  description?: string;
}

export class UpdateCategoryBody {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Category name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'Category description',
  })
  @IsString()
  @IsOptional()
  description: string;
}
