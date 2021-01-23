import React from "react";
import { useDropzone } from "react-dropzone";
import Message from "./Message";

function Dropzone(props) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  // acceptedFiles is an array of File values
  // getRootProps – this is the props which will be set based on
  // the parent element of the dropzone area. So this element
  // determines the width and height of the dropzone area
  // getInputProps – this is the props passed to the input element.
  // And this is needed so that we can support click
  // events along with drag events to get the files
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    multiple: true,
  });

  const imageType1 = "image/jpg";
  const imageType2 = "image/png";
  const imageType3 = "image/jpeg";

  acceptedFiles.map((file) => {
    if (
      file.type !== imageType1 &&
      file.type !== imageType2 &&
      file.type !== imageType3
    ) {
      <Message message={file.name} />;
    } else {
      if (props.buttonValue === "updateButton") {
        props.handleUpdatedDragFile(file);
      } else {
        props.handleDragFile(file);
      }
    }
  });

  return (
    <div
      style={{ display: "inline-block" }}
      {...getRootProps({ className: "dropzone" })}
    >
      {/* <input {...getInputProps()} /> */}
      {props.buttonValue === "updateButton" ? (
        <p className="dropZone">{props.name}</p>
      ) : (
        <p className="dropZone barcode">{!isMobile ? "Drag here or " : null}</p>
      )}
    </div>
  );
}

export default Dropzone;
