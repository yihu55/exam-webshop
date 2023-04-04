import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
type ProductItemProps = {
  _id?: string;
  images: object;
  title: string;
  price: number;
};
export default function ProductItem({
  _id,
  images,
  title,
  price,
}: ProductItemProps) {
  const {
    fetchCart,
    getItemQuantity,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  let quantity: number = 0;
  if (_id !== undefined) {
    quantity = getItemQuantity(_id);
  }

  return (
    <Card className='h-100'>
      <Link to={`/product/${_id}`}>
        <Card.Img
          variant='top'
          src={Object.values(images)[1].large}
          height='200px'
          style={{ objectFit: "cover" }}
        />
      </Link>
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-5'>{title}</span>
          <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
        </Card.Title>
        <div className='mt-auto'>
          {quantity === 0 ? (
            <Button
              className='w-100'
              onClick={() => {
                _id !== undefined &&
                  increaseCartQuantity(_id, title, quantity, price);
                fetchCart();
              }}
            >
              + add to cart
            </Button>
          ) : (
            <div
              className='d-flex align-items-center flex-column'
              style={{ gap: ".5rem" }}
            >
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ gap: ".5rem" }}
              >
                <Button
                  onClick={() =>
                    _id !== undefined && decreaseCartQuantity(_id, quantity)
                  }
                >
                  -
                </Button>
                <div>
                  <span className='fs-3'>{quantity}</span> in cart
                </div>
                <Button
                  onClick={() =>
                    _id !== undefined &&
                    increaseCartQuantity(_id, title, quantity, price)
                  }
                >
                  +
                </Button>
              </div>
              <Button
                onClick={() => _id !== undefined && removeFromCart(_id)}
                variant='danger'
                size='sm'
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
