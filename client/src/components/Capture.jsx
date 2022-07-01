import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Caption from "./Caption";
import { addToGallery } from "../redux/actions/photos";
import Sidebar from "./Sidebar";

const Capture = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("temp");
  const [caption, setCaption] = useState();

  const dispatch = useDispatch();
  const userId = localStorage.getItem("id");

  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 500, height: 400 },
        audio: false,
      })
      .then((stream) => {
        if (videoRef.current) {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  const dataURLToBlob = (dataURL) => {
    let array, binary, i, len;
    binary = atob(dataURL.split(",")[1]);
    array = [];
    i = 0;
    len = binary.length;
    while (i < len) {
      array.push(binary.charCodeAt(i));
      i++;
    }
    return new Blob([new Uint8Array(array)], {
      type: "image/png",
    });
  };

  const takePhoto = () => {
    const width = 500;
    const height = 400;
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    var dataURL = photo.toDataURL();
    // // console.log(dataURL);
    const fileNa = dataURLToBlob(dataURL);
    console.log(fileNa);
    setFile(fileNa);
  };

  const savePicture = () => {
    const data = new FormData();
    data.append("id", userId);
    data.append("fileName", fileName);
    data.append("caption", caption);
    data.append("image", file);
    dispatch(addToGallery(data));
  };

  return (
    <div id="outer-container">
      <Sidebar pageWrapId={"page-wrap"} outerContainerId="outer-container" />
      <div id="page-wrap">
        <div className="leftSide">
          <video id="video" ref={videoRef}></video>
          <button
            type="submit"
            className="btn btn-info updateAndUploadModalButton"
            aria-label="Upload"
            onClick={takePhoto}
          >
            Take Picture
          </button>
        </div>
        <div className="rightSide">
          <canvas ref={photoRef}></canvas>
          <input
            placeholder="Set FileName"
            onChange={(event) => {
              setFileName(event.target.value);
            }}
          />
          <Caption setCaption={setCaption} caption={caption} />
          <button
            type="submit"
            className="btn btn-info updateAndUploadModalButton"
            aria-label="Upload"
            onClick={savePicture}
          >
            Save Picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default Capture;
