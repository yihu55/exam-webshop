import { Row, Col } from "react-bootstrap";
import Product from "../interfaces/Product";
import ProductItem from "./ProductItem";

export default function ProductList(props: { products: Product[] }) {
  return (
    <>
      <Row xs={1} md={2} lg={3}>
        {props.products.map((product) => (
          <Col key={product._id}>
            {" "}
            <ProductItem {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
}
