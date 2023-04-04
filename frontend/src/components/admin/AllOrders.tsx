import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Status } from "../../enums/Status";
import { Order } from "../../types/OrderType";
import ChangeStatus from "./ChangeStatus";

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const getAllOrders = async (): Promise<void> => {
    const response = await axios.get("/order/all-orders");
    setOrders(response.data);
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <h2 style={{ paddingTop: 100 }}>ORDERS</h2>
      <Table striped>
        <thead>
          <tr>
            <th>order ID</th>
            <th className='text-center'>Delivery address</th>
            <th className='text-center'>Total</th>
            <th className='text-center'>Status</th>
            <th className='text-center'>change status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderId}</td>

                <td className='text-center'>{order.address}</td>
                <td className='text-center'>{order.total} kr</td>
                <td className='text-center'>{order.status}</td>
                <td>
                  <ChangeStatus
                    id={order._id}
                    status={order.status as Status}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
