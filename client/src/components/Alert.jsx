import React, { useEffect, useState } from "react";

const Alert = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 4000);
    setVisible(false);
  }, [props.message]);

  return (
    <div className="errorMessageContainer">
      <p className="errorMessageDescription">
        {visible ? props.message : null}
      </p>
    </div>
  );
};

export default Alert;
