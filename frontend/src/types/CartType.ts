import { CartItem } from "./ItemType";

export type Cart = {
  _id?: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: string;
};
