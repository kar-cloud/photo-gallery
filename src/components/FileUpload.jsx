import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import InputForm from "./InputForm";

function FileUpload() {
  const [file, setFile] = useState();
  // to save the current file that user choosed choosed
  const [fileName, setFileName] = useState("Select your File");
  // to save the current file choosed name
  const [fileCaption, setFileCaption] = useState("A Beautiful Memory");
  // to save the caption of the choosed file
  const [captions, setCaptions] = useState([]);
  // array to store all the captions in accordance with file chosen
  const [imageFiles, setImageFiles] = useState([]);
  // arrys to store the files being uploaded
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
      // to reset the form so that the caption that user previously added
      // should disappear from the caption box
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
    <Fragment>
      <InputForm
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
      />
    </Fragment>
  );
}

export default FileUpload;
