import React, { useState } from "react";
import Caption from "./Caption";
import ProgressBar from "./ProgressBar";
import Message from "./Message";
import Dropzone from "./Dropzone";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";

function InputForm(props) {
  const [deleteID, setDeleteID] = useState();
  const [updateID, setUpdateID] = useState();

  function handleDeleteID(i) {
    setDeleteID(i);
  }

  function handleDragFile(File) {
    props.handleDrag(File);
  }

  function handleUpdateID(index) {
    setUpdateID(index);
    props.handleButtonValue();
  }

  //this code will check if span button is clicked it will close the modal
  window.$("#modalClose").click(function () {
    window.$("#basicModal").modal("hide");
  });

  return (
    <div>
      {/* <form id="text-form"> */}
      {/* <div className="row"> */}

      {props.posts.map((image, index) => {
        return <div></div>;
      })}
      {/* </div> */}

      {/* </form> */}
    </div>
  );
}

export default InputForm;
