import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.schema';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

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
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '0666666666',
    description: 'The phone number of the user',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
