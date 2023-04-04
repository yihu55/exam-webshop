import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes } from 'mongoose';
import { Status } from '../enums/status.enum';

// import { Cart } from '../../cart/schemas/cart.schema';

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
