import axios from "axios";
import React, { useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Order } from "../types/OrderType";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, cart, setCartItems, setCart } =
    useShoppingCart();
  let shippingCost: number = 10;
  const [address, setAddress] = useState<string>("");

  const makeOrder = async (
    _id: string,
    address: string,
    shippingCost: number
  ): Promise<void> => {
    const order: Order = {
      orderId: _id,
      address: address,
      shippingCost: shippingCost,
      status: "ordered",
    };
    await axios.post("/order", order);
    await axios.delete("/cart/delete-cart", { data: { _id: _id } });
    setCartItems([]);
    setCart();
  };
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.productId} {...item} />
          ))}
          {cart && (
            <>
              <div className='ms-auto fw-bold fs-5'>
                Total: {formatCurrency(cart.totalPrice)}
              </div>
              <input
                type='text'
                placeholder='address'
                onChange={(e) => setAddress(e.target.value)}
              />
              {cart.totalPrice < 500 ? (
                <p>shippingCost {shippingCost} kr</p>
              ) : (
                <>
                  {/* {(shippingCost = 0)} */}
                  shipping cost {(shippingCost = 0)} kr
                </>
              )}

              <Button
                onClick={() => {
                  if (cart._id) {
                    makeOrder(cart?._id, address, shippingCost);
                  }
                }}
              >
                order
              </Button>
            </>
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
