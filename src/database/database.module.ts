import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.schema';
import { InitialAdminSeed } from './initial-admin.seed';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [InitialAdminSeed],
  exports: [InitialAdminSeed],
})
export class DatabaseModule {}
