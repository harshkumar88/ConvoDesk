import React from "react";

function Label(props) {
  return (
    <div className={props.className}>
      {props.icon}
      <span>{props.name}</span>
    </div>
  );
}

export default Label;
