import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ type: Object })
  images: {
    alt: string;
    src: {
      small: string;
      large: string;
    };
  };
  @Prop()
  category: string;

  @Prop()
  weight: number;

  @Prop()
  manufacturer: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
