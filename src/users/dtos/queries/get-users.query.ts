import { UserRole } from '../../user.schema';
import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetUsersQuery {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: '12345' })
  id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'test@example.com' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'John' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'Wick' })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: '0666666666' })
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  @ApiProperty({ required: false, enum: UserRole, example: UserRole.ADMIN })
  role?: UserRole;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 0 })
  skip: number = 0;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 10 })
  take: number = 10;
}
