import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  deliveryAddress: string;

  @Prop()
  phoneNumber: string;

  @Prop({ default: 'user' })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
