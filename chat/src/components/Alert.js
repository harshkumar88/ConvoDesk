import React from "react";

function Alert(props) {
  return <div className={props.className}>{props.response}</div>;
}

export default Alert;
