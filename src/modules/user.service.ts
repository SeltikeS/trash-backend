import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: UserDto): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      return await newUser.save();
    } catch (error) {
      throw new ForbiddenException('User already exist');
    }
  }

  async login(user: UserDto): Promise<User> {
    const userDB = await this.userModel.findOne({ username: user.username });

    const isCorrectPassword = user.password === userDB.password;
    if (!isCorrectPassword) {
      throw new ForbiddenException('Wrong password');
    }
    return userDB;
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async deleteUserById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
