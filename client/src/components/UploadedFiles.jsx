import React from "react";

function UploadedFiles(props) {
  let file = "/build" + props.file;
  return props.file ? (
    <div>
      <div className="fileUpload card cardDisplay" style={{ display: "block" }}>
        <a href={props.file}>
          <img className="card-img" src={file} alt="" />
        </a>
        <div className="card-body">
          <p className="card-text">{props.fileCaption}</p>
        </div>
      </div>
    </div>
  ) : null;
}

export default UploadedFiles;
