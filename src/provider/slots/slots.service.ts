import { ConflictException, Injectable } from '@nestjs/common';
import CreateSlotDTO from './dtos/create-slot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Provider } from '../../schemas/provider.schema';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { Slot } from '../../schemas/slot';
import UpdateSlotDto from './dtos/update-slot.dto';

@Injectable()
export class SlotsService {
  constructor(
    @InjectModel(Provider.name) private providerModel: Model<Provider>,
  ) {}

  async addNewSlot(providerId: string, slot: CreateSlotDTO) {
    const slotStart = slot.dateTime;
    const slotEnd = new Date(
      slotStart.getTime() + Number(slot.duration) * 60 * 1000,
    );

    const overlapExists = await this.providerModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(providerId) } },
      {
        $project: {
          overlap: {
            $gt: [
              {
                $size: {
                  $filter: {
                    input: '$slots',
                    as: 'slot',
                    cond: {
                      $and: [
                        { $lt: ['$$slot.dateTime', slotEnd] },
                        {
                          $gt: [
                            {
                              $add: [
                                '$$slot.dateTime',
                                { $multiply: ['$$slot.duration', 60000] },
                              ],
                            },
                            slotStart,
                          ],
                        },
                      ],
                    },
                  },
                },
              },
              0,
            ],
          },
        },
      },
    ]);
    console.log({ overlapExists });
    if (!overlapExists[0]?.overlap) {
      return this.providerModel
        .updateOne(
          { _id: new mongoose.Types.ObjectId(providerId) },
          { $push: { slots: { ...slot } } },
        )
        .exec();
    }
    throw new ConflictException('Slot already exists');
  }

  getSlotsByProviderId(providerId: string) {
    return this.providerModel.findById(providerId, { slots: true, _id: 0 });
  }

  getAvailableSlotsByProviderId(providerId: string) {
    return this.providerModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(providerId),
        },
      },
      {
        $project: {
          slots: {
            $filter: {
              input: '$slots',
              as: 'slot',
              cond: {
                $and: [
                  { $not: ['$$slot.bookedBy'] },
                  { $gt: ['$$slot.dateTime', new Date()] },
                ],
              },
            },
          },
          _id: 0, // remove provider _id if you don't want it
        },
      },
    ]);
  }

  reserveSlot(providerId: string, slotId: string, clientId: string) {
    return this.providerModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(providerId),
          'slots._id': new Types.ObjectId(slotId),
        },
        {
          $set: { 'slots.$.bookedBy': clientId },
        },
        { new: true },
      )
      .exec();
  }

  cancelReserveSlot(providerId: string, slotId: string, clientId: string) {
    return this.providerModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(providerId),
          'slots._id': new Types.ObjectId(slotId),
          'slots.bookedBy': new Types.ObjectId(clientId),
        },
        {
          $unset: { 'slots.$.bookedBy': '' },
        },
        { new: true },
      )
      .exec();
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
    return this.providerModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(owner_id),
        'slots._id': new Types.ObjectId(slot_id),
        'slots.bookedBy': { $exists: false },
      },
      {
        $pull: { slots: { _id: new Types.ObjectId(slot_id) } },
      },
    );
  }

  markAsDone() {
    this.providerModel.updateMany(
      { 'slots.dateTime': { $lt: new Date() } },
      { $set: { 'slots.$[slot].isDone': true } },
    );
  }

  getSlotsBefore30Minutes() {
    return this.providerModel
      .find(
        {
          'slots.dateTime': {
            $lt: new Date(new Date().setMinutes(new Date().getMinutes() - 30)),
          },
          'slots.bookedBy': { $exists: true },
        },
        { 'slots.$': 1 },
      )
      .exec()
      .then((document) => {
        const allSlots: Slot[] = [];
        document.forEach((doc) => {
          allSlots.push(...doc.slots);
        });
        return allSlots;
      });
  }
}
