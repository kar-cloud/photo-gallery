import React from "react";
import Modal from "react-bootstrap/Modal";

const WebCamModal = (props) => {
  const handleClose = () => {
    props.handleShow();
    props.handleFile();
  };

  return (
    <div>
      <Modal
        size="lg"
        show={props.show}
        onHide={handleClose}
        keyboard={false}
        style={{
          background: "rgba(0,0,0,0.23)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.fileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            className="embed-responsive-item"
            src={props.fileURL}
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WebCamModal;
