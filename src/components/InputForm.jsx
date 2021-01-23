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
      <h1 className="mainHeader">The Photo Gallery</h1>
      <hr className="hrHome" />
      <Message message={props.message} />
      <form id="text-form">
        <div className="row">
          <div
            className="card fileUpload"
            style={
              props.imageFiles.length === 0
                ? {
                    marginTop: "30px",
                    border: "3.5px dashed lightgray",
                    backgroundColor: "white",
                  }
                : { border: "3.5px dashed lightgray", backgroundColor: "white" }
            }
          >
            <div className="card-body">
              <button
                className="addMemoryButton"
                type="button"
                data-toggle="modal"
                data-target="#basicModal"
                onClick={props.uploadPercent} //making upload percentage to 0
              >
                +
              </button>
              <p className="memoryLine">Add a Memory</p>
            </div>
          </div>
          {props.posts.map((image, index) => {
            return (
              <div>
                {image.imageURL ? (
                  <div>
                    <div
                      className="upAndDel"
                      onMouseOver={() => {
                        handleHoverOver(index);
                      }}
                      onMouseOut={() => {
                        handleHoverOut(index);
                      }}
                    >
                      <div className="fileUpload card cardDisplay actualUpAndDel">
                        <a href={image.imageURL}>
                          <img
                            className="card-img"
                            src={image.imageURL}
                            alt=""
                          />
                        </a>
                        <div className="card-body">
                          <p className="card-text">{image.caption}</p>
                        </div>
                        <button
                          type="button"
                          className={index}
                          id="updateButton"
                          onClick={() => {
                            handleUpdateID(index);
                          }}
                          data-toggle="modal"
                          data-target="#basicModal"
                        >
                          <UpdateIcon id="butoon" />
                        </button>
                        <button
                          type="button"
                          id="deleteButton"
                          className={index + "a"}
                          value={index}
                          onClick={() => {
                            handleDeleteID(index);
                          }}
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          <DeleteIcon id="butoon" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
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
        </div>
        <div
          className="modal fade"
          id="basicModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="basicModal"
          aria-hidden="true"
        >
          <div className="modal-dialog " role="document">
            <div className="modal-content">
              <div className="modal-body modalBodyUpdate">
                {props.buttonValue === "updateButton" ? (
                  <div>
                    <input
                      id="inputUpload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={props.handleChangeFile}
                      accept="image/png, image/jpeg ,image/jpg"
                    />
                    <label
                      htmlFor="inputUpload"
                      style={{
                        cursor: "pointer",
                        fontSize: "inherit",
                      }}
                    >
                      <span className="selectYourFileText">
                        {props.fileName === "Select your File" ? (
                          <span>
                            <Dropzone
                              handleDragFile={handleDragFile}
                              buttonValue={props.buttonValue}
                              handleUpdatedDragFile={
                                props.handleUpdatedDragFile
                              }
                              name={
                                props.posts[updateID].imageURL.split(
                                  "/uploads/"
                                )[1]
                              }
                            />
                          </span>
                        ) : (
                          props.fileName
                        )}
                      </span>
                    </label>
                    <button
                      type="button"
                      className="close closeButton"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      id="inputUpload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={props.handleChangeFile}
                      accept="image/png, image/jpeg ,image/jpg"
                    />
                    {props.fileName === "Select your File" ? (
                      <Dropzone handleDragFile={handleDragFile} />
                    ) : null}
                    <label
                      htmlFor="inputUpload"
                      style={{
                        cursor: "pointer",
                        fontSize: "inherit",
                      }}
                    >
                      <span
                        className={
                          props.fileName === "Select your File"
                            ? "selectYourFileText"
                            : null
                        }
                      >
                        {props.fileName}
                      </span>
                    </label>
                    <button
                      type="button"
                      className="close closeButton"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                )}
                {updateID !== "undefined" && (
                  <Caption
                    handleChangeCaption={props.handleChangeCaption}
                    captionLeft={props.captionLeft}
                    buttonValue={props.buttonValue}
                    uploadPercent={props.uploadPercent}
                    updateID={updateID}
                    posts={props.posts}
                    key={updateID}
                  />
                )}
                {props.buttonValue !== "updateButton" ? (
                  props.uploadPercentage !== 0 ? (
                    <ProgressBar uploadPercentage={props.uploadPercentage} />
                  ) : null
                ) : null}
                {props.buttonValue === "updateButton" ? (
                  <button
                    type="button"
                    className="btn btn btn-info updateAndUploadModalButton"
                    onClick={() => {
                      props.handleUpdate(props.posts[updateID]._id, updateID);
                    }}
                    aria-label="Update"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-info updateAndUploadModalButton"
                    onClick={props.handleSubmit}
                    aria-label="Upload"
                  >
                    Upload
                  </button>
                )}
                <span id="modalClose" data-dismiss="modal" hidden></span>
                {props.uploadPercentage === 100
                  ? document.getElementById("modalClose").click()
                  : // click the span button to close the modal
                    null}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InputForm;
