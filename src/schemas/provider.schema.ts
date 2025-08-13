import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Slot } from './slot';

export type ProviderDocument = HydratedDocument<Provider>;

@Schema()
export class Provider {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  specialty: string;
  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
  @Prop({
    type: [Slot],
  })
  slots: Slot[];
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
