export type Order = {
  _id?: string;
  userId?: string;
  orderId: string;
  total?: number;
  shippingCost: number;
  address: string;
  status: string;
};
