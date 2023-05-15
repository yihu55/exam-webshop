import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Product from "../../interfaces/Product";
// import { v4 as uuidv4 } from "uuid";
type addProductProps = {
  show: boolean;
  handleClose: () => void;
};

// function generateId() {
//   return uuidv4().toString();
// }

export default function AddProduct({ show, handleClose }: addProductProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const addProductSubmit = async () => {
    const newProduct: Product = {
      title: title,
      description: description,
      price: price,
      manufacturer: manufacturer,
      images: {
        alt: title,
        src: { large: `${imageUrl}&w=388`, small: `${imageUrl}&w=188` },
      },
      category: category,
      weight: weight,
    };
    await axios.post("/product", newProduct);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <div>AddProduct</div>
      <Form>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='string'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='string'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Form.Label>Weight</Form.Label>
          <Form.Control
            type='number'
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
          />
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Form.Label>Manufacturer</Form.Label>
          <Form.Control
            type='text'
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <Form.Label>ImageUrl</Form.Label>
          <Form.Control
            type='string'
            placeholder='product image'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Group>
        <Button
          onClick={() => {
            addProductSubmit();
          }}
        >
          add product
        </Button>
      </Form>
    </Modal>
  );
}
