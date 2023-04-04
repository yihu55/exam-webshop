import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Product from "../interfaces/Product";
import { formatCurrency } from "../utilities/formatCurrency";
import { formatWeight } from "../utilities/formatWeight";

export default function ProductPage() {
  const [product, setProduct] = useState<Product>();
  const { increaseCartQuantity, decreaseCartQuantity, getItemQuantity } =
    useShoppingCart();
  const params = useParams();
  let quantity: number = 0;
  if (product && product._id !== undefined) {
    quantity = getItemQuantity(product._id);
  }

  const getProduct = async (): Promise<Product> => {
    const response = await axios.get<Product>(`/product/${params.id}`);
    return response.data;
  };

  useEffect(() => {
    getProduct().then(setProduct);

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {product && (
        <Row>
          <Col
            style={{ height: 300 }}
            className='d-flex justify-content-center align-items-center'
          >
            <img
              src={Object.values(product?.images)[1].large}
              alt={product?.title}
            />
          </Col>
          <Col
            md={6}
            xs={10}
            className='d-flex flex-column justify-content-center'
          >
            <h3 className='fs-4 fw-bold text-uppercase mt-5 text-center'>
              {product?.title}
            </h3>
            <p className='fs-6 mt-5'>
              <span className='fw-bold text-uppercase'>Price: </span>
              {formatCurrency(product?.price)}
            </p>
            <p className='fs-6'>
              <span className='fw-bold text-uppercase'>Description:</span>
              {product?.description}
            </p>
            <p className='fs-6'>
              <span className='fw-bold text-uppercase'>Weight: </span>
              {formatWeight(product?.weight)}
            </p>
            <p className='fs-6'>
              <span className='fw-bold text-uppercase'>Manufacturer: </span>
              {product?.manufacturer}
            </p>
            <p>
              <span className='fw-bold text-uppercase'>Categories: </span>
              {product?.category}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                variant='outline-primary'
                size='sm'
                onClick={() =>
                  product._id !== undefined &&
                  decreaseCartQuantity(product._id, quantity)
                }
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
                  product._id !== undefined &&
                  increaseCartQuantity(
                    product._id,
                    product.title as string,
                    quantity,
                    product.price as number
                  )
                }
              >
                +
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}
