import React from "react";

function Label(props) {
  return (
    <div className={props.className}>
      {props.icon}
      <h3>{props.name}</h3>
    </div>
  );
}

export default Label;
