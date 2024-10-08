import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateUserDto) {
    const filter = { _id: id };
    const updatedUser = await this.userModel.updateOne(filter, dto).exec();
    if (updatedUser.modifiedCount === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string) {
    const filter = { _id: id };
    const deleted = await this.userModel.deleteOne(filter).exec();
    if (deleted.deletedCount === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return deleted;
  }
}
