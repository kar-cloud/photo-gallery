import React, { useState } from "react";
import { useEffect } from "react";

const Caption = (props) => {
  const [captionLeft, setCaptionLeft] = useState(60);

  useEffect(() => {
    if (props.caption) {
      setCaptionLeft(60 - props.caption.length);
    } else {
      setCaptionLeft(60);
    }
  }, [props.caption]);

  const handleChange = (event) => {
    props.setCaption(event.target.value);
    setCaptionLeft(60 - event.target.value.length);
  };

  return (
    <div>
      <label htmlFor="messageText" className="col-form-label labelCaption">
        Caption
      </label>
      <textarea
        id="messageText"
        maxLength="60"
        rows="3"
        value={props.caption}
        onChange={handleChange}
        placeholder="A Beautiful Memory"
      ></textarea>
      <div className="captionLeft">{captionLeft}</div>
    </div>
  );
};

export default Caption;
