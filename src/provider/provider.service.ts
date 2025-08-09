import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Provider } from 'src/schemas/provider.schema';
import CreateProviderDTO from './dtos/create-provider.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import UpdateUserDTO from './dtos/update-provider.dto';
import UpdateProviderDTO from './dtos/update-provider.dto';
import CreateSlotDTO from './slots/dtos/create-slot.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name) private providerModel: Model<Provider>,
  ) {}

  generateHash = function (password: string) {
    return hashSync(password, genSaltSync(8));
  };

  async create(data: CreateProviderDTO) {
    const createdCat = new this.providerModel({
      ...data,
      password: this.generateHash(data.password),
    });
    return createdCat.save();
  }

  async update(id: string, data: UpdateProviderDTO) {
    return this.providerModel.findByIdAndUpdate(id, data);
  }

  async findOne(id: string) {
    return this.providerModel.findById(id);
  }

  async findOneByEmail(email: string) {
    return this.providerModel.findOne({ email });
  }

  async findAll(): Promise<Provider[]> {
    return this.providerModel.find().exec();
  }
}
