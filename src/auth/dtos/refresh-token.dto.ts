import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenBody {
  @IsString()
  @ApiProperty({
    description: 'The refresh token',
  })
  refreshToken: string;
}
