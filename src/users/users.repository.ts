import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserAlreadyExistsException } from './constants/exceptions';
import { PaginatedResponse } from '../shared/utils/pagination';
import { GetUsersQuery } from './dtos/get-users.dto';
import { UserNotFoundException } from '../auth/contants/exceptions';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(dto);
    return await createdUser.save().catch((error) => {
      if (error.code === 11000) {
        throw new UserAlreadyExistsException();
      }
      console.log(error.code);
      throw error;
    });
  }

  async find(query: GetUsersQuery): Promise<PaginatedResponse<User>> {
    const { id, email, firstName, lastName, phone, role, skip, take } = query;
    const filter: any = {};

    if (id) filter._id = id;
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (firstName) filter.firstName = { $regex: firstName, $options: 'i' };
    if (lastName) filter.lastName = { $regex: lastName, $options: 'i' };
    if (phone) filter.phone = { $regex: phone, $options: 'i' };
    if (role) filter.role = role;

    const users = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(take)
      .exec();

    const total = await this.userModel.countDocuments(filter).exec();
    return { data: users, meta: { skip, take, total } };
  }

  async findByIdOrFail(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const filter = { _id: id };
    const updatedUser = await this.userModel.updateOne(filter, dto).exec();
    if (updatedUser.modifiedCount === 0) {
      throw new UserNotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const filter = { _id: id };
    const updatedUser = await this.userModel
      .updateOne(filter, { refreshToken })
      .exec();
    if (updatedUser.modifiedCount === 0) {
      throw new UserNotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async removeRefreshToken(id: string) {
    const filter = { _id: id };

    const updatedUser = await this.userModel

      .updateOne(filter, { refreshToken: null })
      .exec();
    if (updatedUser.modifiedCount === 0) {
      throw new UserNotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async findByRefreshToken(refreshToken: string) {
    const user = await this.userModel.findOne({
      refreshToken,
    });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async remove(id: string) {
    const filter = { _id: id };
    const deleted = await this.userModel.deleteOne(filter).exec();
    if (deleted.deletedCount === 0) {
      throw new UserNotFoundException(`User with id ${id} not found`);
    }
    return deleted;
  }
}
