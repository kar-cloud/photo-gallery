import React, { useState } from "react";
import Caption from "../Caption";
import ProgressBar from "../ProgressBar";
import Dropzone from "../Dropzone";

const InputModal = (props) => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [caption, setCaption] = useState("A Beautiful Memory");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  function handleInputFile(event) {
    setFileName(event.target.files[0].name);
    setFile(event.target.files[0]);
    //     setUpdatedFile(event.target.files[0]);
  }

  return (
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
            <div>
              <input
                id="inputUpload"
                type="file"
                style={{ display: "none" }}
                onChange={handleInputFile}
                accept="image/png, image/jpeg ,image/jpg"
              />
              {!fileName ? (
                <Dropzone setFileName={setFileName} setFile={setFile} />
              ) : null}
              <label
                htmlFor="inputUpload"
                style={{
                  cursor: "pointer",
                  fontSize: "inherit",
                }}
              >
                <span className="selectYourFileText">
                  {fileName ? fileName : "Select Your File"}
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
            <Caption setCaption={setCaption} />
            {uploadPercentage ? <ProgressBar /> : null}
            <button
              type="button"
              className="btn btn-info updateAndUploadModalButton"
              // onClick={props.handleSubmit}
              aria-label="Upload"
            >
              Upload
            </button>

            {/* {props.buttonValue === "updateButton" ? (
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
                          handleUpdatedDragFile={props.handleUpdatedDragFile}
                          name={
                            props.posts[updateID].imageURL.split("/uploads/")[1]
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
            null}  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
