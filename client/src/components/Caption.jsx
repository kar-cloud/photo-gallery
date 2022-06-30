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

// function Caption(props) {
//   const [captionRemained, setCaptionRemained] = useState();

//   function handleChange(event) {
//     setCaptionRemained(60 - event.target.value.length);
//     props.handleChangeCaption(event);
//   }

//   if (props.buttonValue === "updateButton") {
//     window.$("#basicModal").on("shown.bs.modal", function () {
//       if (window.$("#messageText")[0] === "undefined") {
//         setCaptionRemained(60 - window.$("#messageText")[0].value.length);
//       }
//     });
//   }

//   return (
//     <div>
//       <label htmlFor="messageText" className="col-form-label labelCaption">
//         {props.buttonValue === "updateButton" ? "New Caption :" : "Caption :"}
//       </label>
//       {props.buttonValue === "updateButton" ? (
//         <div key={props.posts[props.updateID].caption}>
//           <textarea
//             className="form-control"
//             id="messageText"
//             maxLength="60"
//             rows="3"
//             defaultValue={props.posts[props.updateID].caption}
//             onChange={handleChange}
//             placeholder="A Beautiful Memory"
//           />
//           <div className="captionLeft" key={props.updateID}>
//             {props.captionLeft === 60
//               ? 60 - props.posts[props.updateID].caption.length
//               : captionRemained}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <textarea
//             className="form-control"
//             id="message-text"
//             name="fileCaption"
//             rows="3"
//             maxLength="60"
//             onChange={handleChange}
//             placeholder="A Beautiful Memory"
//             style={{ display: "inline" }}
//           />
//           <div
//             className="captionLeft"
//             key={props.updateID}
//             style={{ display: "inline" }}
//           >
//             {props.captionLeft}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default Caption;
