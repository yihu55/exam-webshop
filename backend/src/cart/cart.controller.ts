import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  NotFoundException,
  Param,
  Get,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetCurrentUsersId } from 'src/utils/get-user-id.decorator';
import { CartService } from './cart.service';
import { ItemDTO } from './dtos/item.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getCart(@GetCurrentUsersId() userId: string) {
    const cart = await this.cartService.getCart(userId);

    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addItemToCart(
    @GetCurrentUsersId() userId: string,
    @Body() itemDTO: ItemDTO,
  ) {
    const cart = await this.cartService.addItemToCart(userId, itemDTO);
    return cart;
  }

  // delete products with same productid
  @UseGuards(JwtAuthGuard)
  //, RolesGuard)
  // @Roles(Role.User)
  @Delete('/delete')
  async removeItemFromCart(
    @GetCurrentUsersId() userId: string,
    @Body() { productId }, // @Param('productId') productId: string,
  ) {
    const cart = await this.cartService.removeItemFromCart(userId, productId);
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
  }

  // delete a single item from cart
  @UseGuards(JwtAuthGuard)
  //, RolesGuard)
  // @Roles(Role.User)
  @Delete('/delete-one')
  async removeOneItem(
    @GetCurrentUsersId() userId: string,
    @Body() itemDTO: ItemDTO,
  ) {
    try {
      const cart = await this.cartService.removeOneItem(userId, itemDTO);
      return cart;
    } catch (error) {
      throw new NotFoundException('Item does not exist');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete-cart')
  async deleteCart(@Body() { _id }) {
    const deleteCart = await this.cartService.deleteCart(_id);
    return deleteCart;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.User)
  // @Delete('/:id')
  // async deleteCart(@Param('id') userId: string) {
  //   const cart = await this.cartService.deleteCart(userId);
  //   if (!cart) throw new NotFoundException('Cart does not exist');
  //   return cart;
  // }
}
