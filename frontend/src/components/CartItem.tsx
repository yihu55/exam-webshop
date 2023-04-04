import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useProduct } from "../context/ProductContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Product from "../interfaces/Product";
import { formatCurrency } from "../utilities/formatCurrency";
type ItemProps = {
  productId: string;
  price?: number;
  title?: string;
  quantity: number;
  subTotalPrice?: number;
};

export function CartItem({
  productId,
  price,
  title,
  quantity,
  subTotalPrice,
}: ItemProps) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const { products } = useProduct();

  const getImageUrl = (items: Product[]): string => {
    const result = items.find((product) => product._id === productId);
    let imageUrl;
    if (result) {
      imageUrl = Object.values(result.images)[1].small;
    }

    return imageUrl;
  };
  const imageUrl = getImageUrl(products);

  return (
    <Stack direction='horizontal' gap={3} className='d-flex align-items-center'>
      <div className='me-auto'>
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <div>
          <span style={{ fontSize: "12px" }}>{title}</span>
        </div>
        <div className='text-muted' style={{ fontSize: ".75rem" }}>
          {price && formatCurrency(price)}
        </div>
      </div>
      <div
        className='d-flex align-items-center justify-content-center'
        style={{ gap: ".5rem" }}
      >
        <Button
          variant='outline-primary'
          size='sm'
          onClick={() => decreaseCartQuantity(productId, quantity)}
        >
          -
        </Button>
        <div>
          <span className='fs-6'>{quantity}</span>
        </div>
        <Button
          variant='outline-primary'
          size='sm'
          onClick={() =>
            increaseCartQuantity(
              productId,
              title as string,
              quantity,
              price as number
            )
          }
        >
          +
        </Button>
      </div>
      {subTotalPrice && <div> {formatCurrency(subTotalPrice)}</div>}

      <Button
        variant='outline-danger'
        size='sm'
        onClick={() => removeFromCart(productId)}
      >
        &times;
      </Button>
    </Stack>
  );
}
