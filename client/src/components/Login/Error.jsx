import React from "react";

const Error = (props) => {
  let error = props.error ? props.error : null;
  if (error) {
    return (
      <div className="errorMessageContainer">
        <p className="errorMessageDescription">{error}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Error;
