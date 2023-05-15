import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Status } from '../enums/status.enum';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Cart' })
  orderId: string;

  @Prop()
  total: number;

  @Prop({ default: Status.REGISTERED })
  status: Status;

  @Prop()
  address: string;

  @Prop()
  shippingCost: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
