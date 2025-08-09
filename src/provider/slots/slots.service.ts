import { Injectable } from '@nestjs/common';
import CreateSlotDTO from './dtos/create-slot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Provider } from '../../schemas/provider.schema';
import { Model, ObjectId } from 'mongoose';
import { Slot } from '../../schemas/slot';
import UpdateSlotDto from './dtos/update-slot.dto';

@Injectable()
export class SlotsService {
  constructor(
    @InjectModel(Provider.name) private providerModel: Model<Provider>,
  ) {}

  addNewSlot(providerId: string, slot: CreateSlotDTO) {
    return this.providerModel.updateOne(
      { _id: providerId },
      { $push: { slots: { ...slot } } },
    );
  }

  getSlotsByProviderId(providerId: string) {
    return this.providerModel
      .findById(providerId)
      .exec()
      .then((e) => {
        return e?.slots;
      });
  }

  getAvailableSlotsByProviderId(providerId: string) {
    return this.providerModel.find({
      _id: providerId,
      'slots.bookedBy': { $exists: false },
    });
  }

  reserveSlot(providerId: string, slotId: string, clientId: string) {
    return this.providerModel.findByIdAndUpdate(
      { _id: providerId, 'slots._id': slotId },
      {
        $set: { 'slots.$.bookedBy': clientId },
      },
      { new: true },
    );
  }

  editSlot(owner_id, slot_id, slot: UpdateSlotDto) {
    return this.providerModel.findByIdAndUpdate(
      {
        _id: owner_id,
        'slots._id': slot_id,
        'slots.bookedBy': { $exists: false },
      },
      { ...slot },
    );
  }

  removeSlot(owner_id, slot_id: string) {
    return this.providerModel.findOneAndDelete({
      _id: owner_id,
      'slots._id': slot_id,
      'slots.bookedBy': { $exists: false },
    });
  }
}
