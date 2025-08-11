import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from '../schemas/client.schema';
import { Model } from 'mongoose';
import CreateUserDTO from './dtos/create-user.dto';
import { genSaltSync, hashSync } from 'bcrypt';

class UpdateUserDT0 {}

@Injectable()
export class UserService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  generateHash = function (password: string) {
    return hashSync(password, genSaltSync(8));
  };

  async create(data: CreateUserDTO) {
    const createdCat = new this.clientModel({
      ...data,
      password: this.generateHash(data.password),
    });
    return createdCat.save();
  }

  async findOneByEmail(email: string) {
    return this.clientModel.findOne({ email });
  }

  async findById(id: Client | undefined) {
    return this.clientModel.findById({ id }).exec();
  }

  async findEmailById(id: Client | undefined) {
    return this.clientModel.findById(id, { email: 1 }).exec();
  }

  async update(id: string, data: UpdateUserDT0) {
    return this.clientModel.findByIdAndUpdate(id, data);
  }
}
