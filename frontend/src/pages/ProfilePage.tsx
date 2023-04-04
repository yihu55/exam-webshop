import React, { useState } from "react";
import avatar from "../images/avatar.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useUser } from "../context/UserContext";
import GetAllOrders from "../components/GetAllOrders";

// import OrderComponent from "../components/OrderComponent";
// import AdminComponent from "../components/AdminComponent";

export default function UserPage() {
  // const [userId, setUserId] = useState<string>("");
  const { profile, logout } = useUser();
  const [userFirstName, setUserFirstName] = useState<string | undefined>(
    profile?.firstName
  );
  const [userLastName, setUserLastName] = useState<string | undefined>(
    profile?.lastName
  );
  const [userEmail, setUserEmail] = useState<string | undefined>(
    profile?.email
  );
  const [userPhoneNumber, setUserPhoneNumber] = useState<string | undefined>(
    profile?.phoneNumber
  );
  const [userDeliveryAddress, setUserDeliveryAddress] = useState<
    string | undefined
  >(profile?.deliveryAddress);

  const handleOnUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(`/auth/update`, {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        deliveryAddress: userDeliveryAddress,
        phoneNumber: userPhoneNumber,
      });
    } catch (error) {
      console.log(error);
    }

    alert("Data is successful saved!");
  };

  return (
    <>
      <Button onClick={logout} variant='danger'>
        log out
      </Button>
      <h1 className='text-center'>User profile</h1>
      <Row>
        <Col sm={5} className='text-center'>
          <img src={avatar} alt='profile avatar' height={250} width={250} />
        </Col>
        <Col sm={7}>
          <Form className='mt-5' onSubmit={handleOnUpdate}>
            <Form.Group className='mb-3' controlId='formBasicFirstName'>
              <Form.Label>First name:</Form.Label>
              <Form.Control
                type='text'
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicLastName'>
              <Form.Label>Last name:</Form.Label>
              <Form.Control
                type='text'
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPhone'>
              <Form.Label>Phone number:</Form.Label>
              <Form.Control
                type='text'
                value={userPhoneNumber}
                onChange={(e) => setUserPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicAddress'>
              <Form.Label>Delivery address:</Form.Label>
              <Form.Control
                type='text'
                value={userDeliveryAddress}
                onChange={(e) => setUserDeliveryAddress(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Update
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className='mt-5 mb-5'>
        <GetAllOrders />
      </Row>
    </>
  );
}
