import { useState } from "react";
import axios from "axios";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

interface Props {
  id: string;
}

function DeleteProductPopover({ id }: Props) {
  const [showPopover, setShowPopover] = useState(false);

  const handleDelete = async () => {
    await axios.delete(`/product/${id}`);
    setShowPopover(false);
    window.location.reload();
  };

  const popover = (
    <Popover id={`delete-product-${id}-popover`}>
      <Popover.Header as='h3'>Confirm Deletion</Popover.Header>
      <Popover.Body>
        Are you sure you want to delete this product?
        <div className='d-flex justify-content-end mt-2'>
          <button
            type='button'
            className='btn btn-secondary me-2'
            onClick={() => setShowPopover(false)}
          >
            Cancel
          </button>
          <button
            type='button'
            className='btn btn-danger'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger='click'
      show={showPopover}
      placement='right'
      overlay={popover}
      onToggle={(nextShow: boolean) => setShowPopover(nextShow)}
    >
      <Button
        variant='outline-danger'
        size='sm'
        onClick={() => {
          setShowPopover(true);
        }}
      >
        &times;
      </Button>
    </OverlayTrigger>
  );
}

export default DeleteProductPopover;
