import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const [isSaveClicked, setIsSaveClicked] = useState(false);

function DefaultPopup(message: string) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setIsSaveClicked(false);
  };

  const handleShow = () => setShow(true);

  const handleSaveChanges = () => {
    setIsSaveClicked(true);
    handleClose(); // Close the modal after processing the button click
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* You can use the isSaveClicked state elsewhere in your component or application */}
      {isSaveClicked && <div>Save button clicked!</div>}
    </>
  );
}

export default DefaultPopup;