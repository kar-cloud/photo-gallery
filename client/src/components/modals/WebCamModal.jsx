import React from "react";
import Modal from "react-bootstrap/Modal";

const Capture = (props) => {
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
        // backdrop="static"
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
          {/* <div className="embed-responsive embed-responsive-16by9">
            <iframe
              id="cartoonVideo"
              className="embed-responsive-item"
              width="560"
              height="315"
              src={props.video}
              allowFullScreen
            ></iframe>
          </div> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Capture;
