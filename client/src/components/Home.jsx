import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import InputForm from "./InputForm";
import Message from "./Message";
import InputModal from "./modals/InputModal";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";

function FileUpload() {
  const photos = useSelector((state) => state.user);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Select your File");
  const [fileCaption, setFileCaption] = useState("A Beautiful Memory");
  const [captions, setCaptions] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [message, setMessage] = useState("");
  // just a message if file is uploaded properly or not
  const [uploadPercentage, setUploadPercentage] = useState();
  // for progress bar 0-100
  const [captionLeft, setCaptionLeft] = useState(60);
  // for how much caption is left
  const [posts, setPosts] = useState([]);
  // to get the photos from mongodb
  const [updatedCaption, setUpdatedCaption] = useState();
  // to get the caption after updation
  const [updatedFile, setUpdatedFile] = useState();
  // to get the updated file
  const [buttonValue, setButtonValue] = useState("");
  // to check if update button is pressed or not

  if (buttonValue !== "updateButton") {
    window.$("#basicModal").on("hidden.bs.modal", function () {
      setFileName("Select your File");
      setFile();
      setFileCaption("A Beautiful Memory");
      setCaptionLeft(60);
      document.getElementById("text-form").reset();
    });
  }

  useEffect(() => {
    getPhotos();
  }, []);

  function handleButtonValue() {
    setButtonValue("updateButton");
  }

  function handleChangeFile(event) {
    setFileName(event.target.files[0].name);
    setFile(event.target.files[0]);
    setUpdatedFile(event.target.files[0]);
  }

  function handleDrag(fileDrag) {
    setFileName(fileDrag.name);
    setFile(fileDrag);
  }

  function handleChangeCaption(event) {
    setFileCaption(event.target.value);
    setUpdatedCaption(event.target.value);
    setCaptionLeft(60 - event.target.value.length);
  }

  function uploadPercent() {
    setButtonValue();
    setUploadPercentage(0);
  }

  function handleFade() {
    window.$("#message").fadeIn(0); //message id is from message.jsx
    setTimeout(function () {
      window.$("#message").fadeOut(500);
    }, 2000);
  }

  function handleUpdatedDragFile(fileDrag) {
    setFileName(fileDrag.name);
    setFile(fileDrag);
    setUpdatedFile(fileDrag);
  }

  const getPhotos = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        setPosts([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePost = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    try {
      axios.post("/delete", formData);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, index) => {
    const formData = new FormData();
    formData.append("updatedCaption", updatedCaption);
    formData.append("id", id);
    formData.append("updatedFile", updatedFile);
    formData.append("ifCaptionUndefined", posts[index].caption);
    try {
      axios.post("/update", formData);
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    const formData = new FormData();
    // whenever we need to pass data from react to server we use formData
    // console.log(formData);
    // FormData is a special type of object which is not stringifyable
    // can cannot just be printed out using console.log
    formData.append("file", file);
    formData.append("fileCaption", fileCaption);

    try {
      // axios is used to pass HTTP request to server
      // and getting reponse from it
      const res = await axios.post("/upload", formData, {
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round(progressEvent.loaded * 100) / progressEvent.total
            )
          );
        },
      });
      const { fileName, filePath } = res.data;
      setImageFiles((prevImageFile) => {
        return [...prevImageFile, { fileName, filePath }];
      });
      setCaptions((prevCaption) => {
        return [...prevCaption, fileCaption];
      });
      setMessage("File uploaded");
      setFileName("Select your File");
      setFile();
      setFileCaption("A Beautiful Memory");
      setCaptionLeft(60);
      handleFade();
      setTimeout(function () {
        window.location.reload();
      }, 0);
      document.getElementById("text-form").reset();
    } catch (err) {
      if (err.response.status === 500) {
        setMessage(err.response.data.msg500);
        handleFade();
        setUploadPercentage(0);
      } else {
        setMessage(err.response.data.msg);
        handleFade();
        setUploadPercentage(0);
      }
    }
  };

  return (
    <div>
      <h1 className="mainHeader">Your Photo Gallery</h1>
      <hr className="hrHome" />
      <InputModal />
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
              // onClick={props.uploadPercent} //making upload percentage to 0
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
                    // onMouseOver={() => {
                    //   handleHoverOver(index);
                    // }}
                    // onMouseOut={() => {
                    //   handleHoverOut(index);
                    // }}
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
                      {/* <button
                        type="button"
                        className={index}
                        id="updateButton"
                        // onClick={() => {
                        //   handleUpdateID(index);
                        // }}
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
                        // onClick={() => {
                        //   handleDeleteID(index);
                        // }}
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        <DeleteIcon id="butoon" />
                      </button> */}
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {/* <Message message={props.message} /> */}

      {/* <InputForm
        handleChangeFile={handleChangeFile}
        handleChangeCaption={handleChangeCaption}
        fileName={fileName}
        uploadPercentage={uploadPercentage}
        handleSubmit={handleSubmit}
        uploadPercent={uploadPercent}
        imageFiles={imageFiles}
        captions={captions}
        message={message}
        handleDrag={handleDrag}
        captionLeft={captionLeft}
        posts={posts}
        handleDeletePost={handleDeletePost}
        handleUpdate={handleUpdate}
        buttonValue={buttonValue}
        handleButtonValue={handleButtonValue}
        handleUpdatedDragFile={handleUpdatedDragFile}
      /> */}
    </div>
  );
}

export default FileUpload;
