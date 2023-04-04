import { IsMongoId } from 'class-validator';
import { Status } from '../enums/status.enum';

export class CreateOrderDTO {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  orderId: string;

  shippingCost: number;
  total: number;
  address: string;
  status: Status;
}
