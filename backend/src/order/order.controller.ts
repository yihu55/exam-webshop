import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetCurrentUsersId } from 'src/utils/get-user-id.decorator';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/all-orders')
  async getAllOrders() {
    const orders = await this.orderService.getAllOrders();
    return orders;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all-currentusers-orders')
  async getAllCurrentUsersOrders(@GetCurrentUsersId() userId: string) {
    const orders = await this.orderService.getAllCurrenUserOrders(userId);
    return orders;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @GetCurrentUsersId() userId: string,
    @Body() createOrderDTO: CreateOrderDTO,
  ) {
    const order = await this.orderService.create(userId, createOrderDTO);
    return { message: 'order created', order };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch('/:id/status')
  async updateStatus(
    @Param('id') _id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ) {
    const order = await this.orderService.updateStatus(_id, updateOrderDTO);
    return { message: 'order status changed', order };
  }
}
