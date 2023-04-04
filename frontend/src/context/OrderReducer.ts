import axios from "axios";
import { Order } from "../types/OrderType";

export type Action = {
  type: string;
  data: {
    orderId: string;
    status: string;
  };
};

// export const getAllOrders = async (): Promise<Order[]> => {
//   const response = await axios.get("/order/all-orders");
//   return response.data;
// };

export const changeStatus = async (id: string) => {
  const response = await axios.patch(`/order/${id}`);
  return response.data;
};
export interface State {
  orders: Order[];
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "changeStatus":
      const updatedOrders = state.orders.map((order: Order) => {
        if (order.orderId === action.data.orderId) {
          return { ...order, status: action.data.status };
        } else {
          return order;
        }
      });
      return { ...state, orders: updatedOrders };
    case "setOrders":
      return { ...state, orders: action.data };
    default:
      return state;
  }
}
