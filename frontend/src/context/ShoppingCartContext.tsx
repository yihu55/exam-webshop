import axios from "axios";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { getCurrentUserId } from "../components/GetCurrentUserId";
import ShoppingCart from "../components/ShoppingCart";
import { Cart } from "../types/CartType";
import { CartItem } from "../types/ItemType";
import { Order } from "../types/OrderType";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  fetchCart: () => void;
  getItemQuantity: (id: string) => number;
  getTotalQuantity: () => number;
  increaseCartQuantity: (
    _id: string,
    title: string,
    quantity: number,
    price: number
  ) => void;
  decreaseCartQuantity: (_id: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  cart: Cart | undefined;
  setCartItems: any;
  setCart: any;
  fetchOrders: () => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<Cart | undefined>();
  const [userId, setUserId] = useState<string>();
  const token = localStorage.getItem("webshop");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const headers = {
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    getCurrentUserId().then((data) => {
      setUserId(data.data._id);
      return userId;
    });
  }, []);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const fetchCart = async (): Promise<void> => {
    try {
      const response = await axios.get<Cart>(`/cart`, headers);
      const cart = response.data;
      setCart(cart);
      setCartItems(cart?.items || []);
      // return cart;
    } catch (err) {
      console.log("error");
    }
  };

  function getItemQuantity(id: string) {
    const quantity =
      cartItems.find((item) => item.productId === id)?.quantity || 0;

    return quantity;
  }

  const getTotalQuantity = () => {
    const totalQuantity = cartItems.reduce((acc, { quantity }) => {
      return acc + quantity;
    }, 0);
    return totalQuantity;
  };

  const increaseCartQuantity = async (
    _id: string,
    title: string,
    quantity: number,
    price: number
  ): Promise<void> => {
    const cartItem: CartItem = {
      productId: _id,
      title: title,
      quantity: (quantity = 1),
      price: price,
    };
    try {
      await axios.post("/cart/add", cartItem);
      fetchCart();
    } catch (err) {
      throw new Error();
    }
  };

  useEffect(() => {
    fetchCart();
    console.log("cart is refreshing");
    // eslint-disable-next-line
  }, []);

  const decreaseCartQuantity = async (
    _id: string,
    quantity: number
  ): Promise<void> => {
    const cartItem: CartItem = {
      productId: _id,
      quantity: (quantity = 1),
    };
    try {
      await axios.delete("/cart/delete-one", {
        // headers: headers.headers,
        data: cartItem,
      });
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromCart = async (_id: string): Promise<void> => {
    try {
      await axios.delete("/cart/delete", {
        // headers: headers.headers,
        data: { productId: _id },
      });
    } catch (err) {
      console.log(err);
    }

    fetchCart();
  };

  const fetchOrders = async (): Promise<void> => {
    try {
      const response = await axios.get(
        "/order/all-currentusers-orders",
        headers
      );
      setOrders(response.data);
    } catch (err) {
      throw new Error();
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        fetchCart,
        getItemQuantity,
        getTotalQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cart,
        cartItems,
        fetchOrders,
        setCartItems,
        setCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
