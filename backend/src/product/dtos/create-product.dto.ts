import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateProductDTO {
  _id?: string;

  @IsString()
  @IsNotEmpty()
  title: string;
  images: object;
  description: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  price: number;
  manufacturer: string;
  category: string;
}
