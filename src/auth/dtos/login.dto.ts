import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginBody {
  @ApiProperty({ description: 'Login Email Address' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Login Password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
