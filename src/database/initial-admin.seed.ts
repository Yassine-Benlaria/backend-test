import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from '../users/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class InitialAdminSeed {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async seed() {
    const adminCount = await this.userModel.countDocuments({
      role: UserRole.ADMIN,
    });

    if (adminCount == 0) {
      const admin: CreateUserDto = {
        email: 'admin@admin.admin',
        firstName: 'admin',
        lastName: 'admin',
        phone: '0777777777',
        password: 'admin',
        role: UserRole.ADMIN,
      };

      const createdAdmin = new this.userModel(admin);
      await createdAdmin.save();
      console.log('Initial Admin Created');
    }
  }
}
