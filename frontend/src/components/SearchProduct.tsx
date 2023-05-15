import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../interfaces/Product";
import { formatCurrency } from "../utilities/formatCurrency";
import { formatWeight } from "../utilities/formatWeight";

interface FilterProductDTO {
  search: string;
  category: string;
}

export default function Search() {
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  async function handleSearch() {
    const filter: FilterProductDTO = {
      search: searchText,
      category: category,
    };
    console.log("searchText", searchText, "filter", filter);
    const response = await axios.get(`/product/filter`, { params: filter });

    setFilteredProducts(response.data);
  }
  return (
    <>
      <Col md={{ span: 4, offset: 4 }} className='mb-5'>
        <Form className='d-flex'>
          <Form.Control
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='search by title'
          />

          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>All</option>
            <option value='cake'>cake</option>
            <option value='candy'>candy</option>
            <option value='cupcake'>cupcake</option>
          </Form.Select>
          <Button
            variant='outline-success'
            onClick={() => {
              handleSearch();
              handleShow();
            }}
          >
            search
          </Button>
        </Form>
      </Col>
      <Modal show={show} onHide={handleClose}>
        {filteredProducts.length !== 0 ? (
          filteredProducts.map((product) => {
            return (
              <li key={product._id} style={{ listStyle: "none" }}>
                <Modal.Header>
                  <h5>{product.title}</h5>
                </Modal.Header>

                <Modal.Body>
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={Object.values(product?.images)[1].small}
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      alt={product.title}
                    />
                  </Link>
                </Modal.Body>
                <Modal.Footer>
                  <p>price: {formatCurrency(product.price)}</p>
                  <p>weight: {formatWeight(product.weight)}</p>
                </Modal.Footer>
              </li>
            );
          })
        ) : (
          <Modal.Body>sorry, no product founded!</Modal.Body>
        )}
      </Modal>
    </>
  );
}
