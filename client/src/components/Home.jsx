import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputModal from "./modals/InputModal";
import DeleteModal from "./modals/DeleteModal";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";

function FileUpload() {
  const photos = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState({
    mode: false,
    fileName: "",
    caption: "",
    imageId: "",
  });
  const [deleteMode, setDeleteMode] = useState({
    userId: "",
    imageId: "",
  });

  const changeModes = () => {
    setEditMode((state) => ({
      ...state,
      mode: false,
      fileName: "",
      caption: "",
      imageId: "",
    }));
    setDeleteMode((state) => ({
      ...state,
      imageId: "",
      userId: "",
    }));
  };

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

  return (
    <div>
      <h1 className="mainHeader">Your Photo Gallery</h1>
      <hr className="hrHome" />
      <InputModal editMode={editMode} />
      <DeleteModal deleteMode={deleteMode} />
      <div className="row">
        <div
          className="card fileUpload"
          style={{
            marginTop: "30px",
            border: "3.5px dashed lightgray",
            backgroundColor: "white",
          }}
        >
          <div className="card-body">
            <button
              className="addMemoryButton"
              type="button"
              data-toggle="modal"
              data-target="#basicModal"
              onClick={changeModes}
            >
              +
            </button>
            <p className="memoryLine">Add any Memory</p>
          </div>
        </div>
        {photos
          ? photos.map((image, index) => {
              return (
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
                      <a
                        href={image.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="card-img"
                          src={image.imageUrl}
                          alt="Error"
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
                          setEditMode((state) => ({
                            ...state,
                            mode: true,
                            fileName: image.fileName,
                            caption: image.caption,
                            imageId: image._id,
                          }));
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
                          setDeleteMode((state) => ({
                            ...state,
                            userId: localStorage.getItem("id"),
                            imageId: image._id,
                          }));
                        }}
                        data-toggle="modal"
                        data-target="#deleteModal"
                      >
                        <DeleteIcon id="butoon" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default FileUpload;
