import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Status } from "../../enums/Status";

type changeStatusProps = {
  id: string | undefined;
  status: Status;
};

export default function ChangeStatus(props: changeStatusProps) {
  const { id, status } = props;
  const [currentStatus, setCurrentStatus] = useState<Status>(status);

  const changeStatus = async (id: string, status: Status) => {
    await axios.patch(`/order/${id}/status`, {
      status: status,
    });
    window.location.reload();
  };

  return (
    <Form.Select
      size='sm'
      value={currentStatus}
      onChange={(e) => {
        const status = e.target.value as Status;
        id !== undefined && changeStatus(id, status);
        setCurrentStatus(status);
      }}
    >
      <option value={Status.REGISTERED}>registered</option>
      <option value={Status.PENDING}>pending</option>
      <option value={Status.PAYED}>payed</option>
      <option value={Status.ORDERED}>ordered</option>
      <option value={Status.SHIPPING}>shipping</option>
      <option value={Status.DELIVERED}>delivered</option>
    </Form.Select>
  );
}
