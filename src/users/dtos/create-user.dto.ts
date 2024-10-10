import { UserRole } from '../user.schema';

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  role: UserRole;
}

export class CreateUserBody {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Wick',
    description: 'The last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'password',
    description:
      'The password of the user (must be at least 8 characters and contain both numbers and letters)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;

  @ApiProperty({
    example: '0666666666',
    description: 'The phone number of the user',
  })
  @Matches(/^[0-9]{10}$/, {
    message: 'Phone number must be 10 digits long',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
