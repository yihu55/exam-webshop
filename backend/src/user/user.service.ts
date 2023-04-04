import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel.create(createUserDTO);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return newUser.save();
  }

  async findUser(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username: username });
    return user;
  }
  async findUserById(_id: string): Promise<User> {
    const user = await this.userModel.findById({ _id });
    return user;
  }
  async updateUserProfile(_id: string, updateUserDTO: UpdateUserDTO) {
    const filter = { _id: _id };
    await this.userModel.findOneAndUpdate(filter, updateUserDTO, {
      new: true,
    });
    const user = await this.userModel.findById(_id);
    return user;
  }
  async getAllUsers() {
    const users = await this.userModel.find({}).exec();
    return users;
  }
}
