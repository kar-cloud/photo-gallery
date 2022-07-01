import React, { useState, useEffect } from "react";
import Caption from "../Caption";
import Dropzone from "../Dropzone";
import { useDispatch } from "react-redux";
import { addToGallery, updateGallery } from "../../redux/actions/photos";

const InputModal = (props) => {
  let editMode = props.editMode;
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [caption, setCaption] = useState("A Beautiful Memory");

  useEffect(() => {
    if (editMode) {
      setFileName(editMode.fileName);
      setCaption(editMode.caption);
    }
  }, [editMode]);

  const userId = localStorage.getItem("id");

  function handleInputFile(event) {
    setFileName(event.target.files[0].name);
    setFile(event.target.files[0]);
  }

  const handleSubmitUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("id", userId);
    data.append("caption", caption);
    data.append("image", file);
    dispatch(addToGallery(data));
  };

  const handleSubmitUpdate = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("id", userId);
    data.append("caption", caption);
    data.append("imageId", editMode.imageId);
    if (file) {
      data.append("image", file);
    }
    dispatch(updateGallery(data));
  };

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
              <h3 style={{ display: "inline-block", marginBottom: "20px" }}>
                {editMode.mode ? "Update Memory" : "Add a Memory"}
              </h3>
              <button
                type="button"
                className="close closeButton"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <form
              encType="multipart/form-data"
              onSubmit={
                editMode.mode
                  ? (event) => {
                      handleSubmitUpdate(event);
                    }
                  : (event) => {
                      handleSubmitUpload(event);
                    }
              }
            >
              <div>
                <input
                  id="inputUpload"
                  type="file"
                  name="image"
                  style={{ display: "none" }}
                  onChange={handleInputFile}
                  accept="image/png, image/jpeg ,image/jpg"
                />
                {!fileName ? (
                  <Dropzone setFileName={setFileName} setFile={setFile} />
                ) : null}
                <label
                  htmlFor="inputUpload"
                  name="image"
                  style={{
                    cursor: "pointer",
                    fontSize: "inherit",
                  }}
                >
                  <span className="selectYourFileText">
                    {fileName ? fileName : "Select Your File"}
                  </span>
                </label>
              </div>
              <Caption setCaption={setCaption} caption={caption} />
              <button
                type="submit"
                className="btn btn-info updateAndUploadModalButton"
                aria-label="Upload"
              >
                {editMode.mode ? "Update" : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
