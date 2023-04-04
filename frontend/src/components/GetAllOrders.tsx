import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Order } from "../types/OrderType";

export default function GetAllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const getAllOrders = async (): Promise<Order[]> => {
    const res = await axios.get<Order[]>("/order/all-currentusers-orders");
    setOrders(res.data);
    return orders;
  };
  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <hr />
      <h1 className='text-center'>Your orders:</h1>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th className='text-center'>Delivery address</th>
            <th className='text-center'>Total</th>
            <th className='text-center'>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td className='text-center'>{order.address}</td>
                <td className='text-center'>{order.total} kr</td>
                <td className='text-center'>{order.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
