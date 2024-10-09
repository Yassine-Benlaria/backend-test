import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.schema';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserBody {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'Wick',
    description: 'The last name of the user',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    example: '0666666666',
    description: 'The phone number of the user',
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
