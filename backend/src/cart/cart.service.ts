import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDTO } from './dtos/item.dto';
import { ItemDocument } from './schemas/item.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
    @InjectModel('Item') private readonly itemModel: Model<ItemDocument>,
  ) {}
  private readonly logger = new Logger(CartService.name);

  async createCart(
    userId: string,
    itemDTO: ItemDTO,
    subTotalPrice: number,
    totalPrice: number,
  ): Promise<Cart> {
    const newCart = await this.cartModel.create({
      userId,
      items: [{ ...itemDTO, subTotalPrice }],
      totalPrice,
    });
    return newCart;
  }

  async getCart(userId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId });
    return cart;
  }
  async getCartById(_id: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ _id });
    return cart;
  }

  async deleteCart(_id: string): Promise<Cart> {
    const deletedCart = await this.cartModel.findOneAndRemove({ _id });
    return deletedCart;
  }

  async deleteItem(productId: string): Promise<Cart> {
    const deletedCart = await this.cartModel.findOneAndDelete({ productId });
    return deletedCart;
  }

  private recalculateCart(cart: CartDocument) {
    cart.totalPrice = 0;
    cart.items.forEach((item) => {
      cart.totalPrice += item.quantity * item.price;
    });
  }

  async addItemToCart(userId: string, itemDTO: ItemDTO): Promise<Cart> {
    const { productId, quantity, price } = itemDTO;
    const subTotalPrice = quantity * price;
    const totalPrice = subTotalPrice;

    const cart = await this.getCart(userId);

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId,
      );

      if (itemIndex > -1) {
        const item = cart.items[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        item.subTotalPrice = item.quantity * item.price;

        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        return cart.save();
      } else {
        cart.items.push({ ...itemDTO, subTotalPrice });
        this.recalculateCart(cart);
        return cart.save();
      }
    } else if (!cart) {
      const newCart = await this.createCart(
        userId,
        itemDTO,
        subTotalPrice,
        totalPrice,
      );

      return newCart;
    }
  }

  async removeOneItem(userId: string, itemDTO: ItemDTO): Promise<Cart> {
    const { productId, quantity } = itemDTO;
    // const subTotalPrice = quantity * price;

    try {
      const cart = await this.getCart(userId);

      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId,
      );
      const itemQuantity = cart.items[itemIndex].quantity;

      if (itemQuantity > 1) {
        const item = cart.items[itemIndex];
        item.quantity = Number(item.quantity) - Number(quantity);
        item.subTotalPrice = item.quantity * item.price;
        cart.items[itemIndex] = item;
      } else if (itemQuantity === 1) {
        cart.items.splice(itemIndex, 1);
      }
      this.recalculateCart(cart);
      return cart.save();
    } catch (error) {
      this.logger.log('error');
    }
  }

  async removeItemFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.getCart(userId);
    try {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId,
      );

      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
      }
    } catch (err) {
      throw new Error();
    }

    this.recalculateCart(cart);

    return cart.save();
  }
}
