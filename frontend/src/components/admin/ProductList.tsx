import React, { useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";

import { useProduct } from "../../context/ProductContext";
import AddProduct from "./AddProduct";
import DeleteProductPopover from "./DeleteProductPopover";

export default function ProductList() {
  const { products } = useProduct();
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      {" "}
      <Row style={{ paddingTop: 100 }}>
        <Col md={4}>
          <h2>PRODUCT LIST</h2>
        </Col>
        <Col md={{ span: 2, offset: 6 }}>
          <Button
            onClick={() => {
              handleShow();
            }}
          >
            add product
          </Button>
        </Col>
      </Row>
      <AddProduct show={show} handleClose={handleClose} />
      <Table striped>
        <thead>
          <tr>
            <th>product ID</th>
            <th>image</th>
            <th className='text-center'>Title</th>
            <th className='text-center'>Weight</th>
            <th className='text-center'>Price</th>
            <th className='text-center'>Category</th>
            <th className='text-center'>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => (
              <tr key={index}>
                <td>{product._id}</td>
                <td>
                  <img
                    src={Object.values(product.images)[1].small}
                    alt={product.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{product.title}</td>
                <td className='text-center'>{product.weight}</td>
                <td className='text-center'>{product.price} kr</td>
                <td className='text-center'>{product.category}</td>
                <td className='text-center'>{product.manufacturer}</td>
                <td>
                  {product._id !== undefined && (
                    <DeleteProductPopover id={product._id} />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
