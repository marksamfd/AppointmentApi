import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Client } from './client.schema';

export type SlotDocument = HydratedDocument<Slot>;

@Schema({ versionKey: false })
export class Slot {
  // @Prop({ type: mongoose.Schema.ObjectId, required: true })
  // _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  dateTime: Date;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true, default: false })
  isDone: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  bookedBy: Client;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
