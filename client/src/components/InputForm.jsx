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

  function handleHoverOver(index) {
    window.$(`.${index}`).css({
      transition: "0.7s",
      margin: "0 0 16% 18%",
      top: "110%",
    });

    window.$(`.${index + "a"}`).css({
      transition: "0.7s",
      margin: "0 0 16% 58%",
      top: "110%",
    });
  }

  function handleHoverOut(index) {
    window.$(`.${index}`).css({
      transition: "1.8s",
      marginLeft: "32%",
      top: "10%",
    });

    window.$(`.${index + "a"}`).css({
      transition: "1.8s",
      marginLeft: "40%",
      top: "10%",
    });
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
        return (
          <div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog " role="document">
                <div className="modal-content ">
                  {deleteID !== "undefined" && (
                    <div className="modal-body deleteModalBody">
                      <div className="modalText">
                        Are you sure you wanna delete this post ??
                      </div>
                      <button
                        type="button"
                        class="btn btn-primary deleteAndCloseModalButton"
                        data-dismiss="modal"
                      >
                        Nopes
                      </button>
                      <button
                        onClick={() => {
                          props.handleDeletePost(props.posts[deleteID]._id);
                        }}
                        type="button"
                        className="btn btn-primary deleteAndCloseModalButton"
                      >
                        Yes, Sure !!
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* </div> */}

      {/* </form> */}
    </div>
  );
}

export default InputForm;
