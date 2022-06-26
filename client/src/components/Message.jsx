import React from "react";

function Message(props) {
  return props.message ? (
    <div
      id="message"
      className={
        props.message === "File uploaded"
          ? "alert alert-info alert-dismissible fade show"
          : "alert alert-danger alert-dismissible fade show"
      }
      role="alert"
    >
      {props.message}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        style={{ outline: "none" }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  ) : null;
}

export default Message;
