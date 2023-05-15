import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/cart/schemas/cart.schema';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { Status } from './enums/status.enum';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {}
  private readonly logger = new Logger(OrderService.name);

  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.orderModel.find({}).exec();
      return orders;
    } catch (error) {
      throw new Error();
    }
  }
  async getAllCurrenUserOrders(userId: string): Promise<Order[]> {
    try {
      const orders = await this.orderModel.find({ userId }).exec();
      return orders;
    } catch (error) {
      throw new Error();
    }
  }

  async create(userId: string, createOrderDTO: CreateOrderDTO): Promise<Order> {
    const cart = await this.cartModel.findById(createOrderDTO.orderId).exec();
    const total = cart.totalPrice + createOrderDTO.shippingCost;

    if (cart) {
      const createOrder = new this.orderModel({
        userId: userId,
        orderId: createOrderDTO.orderId,
        address: createOrderDTO.address,
        shippingCost: createOrderDTO.shippingCost,
        total: total,
        status: createOrderDTO.status,
      });

      return createOrder.save();
    }
  }

  async updateStatus(
    id: string,
    updateOrderDTO: UpdateOrderDTO,
  ): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (
      updateOrderDTO.status &&
      !Object.values(Status).includes(updateOrderDTO.status)
    ) {
      throw new BadRequestException('Invalid status');
    }
    if (order) {
      order.status = updateOrderDTO.status;
    } else {
      throw new NotFoundException('order not found');
    }
    return order.save();
  }
}
