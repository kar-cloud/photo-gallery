import React from "react";

function ProgressBar(props) {
  return (
    <div className="progress">
      <div
        className="progress-bar progressBar"
        role="progressbar"
        style={{ width: `${props.uploadPercentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
