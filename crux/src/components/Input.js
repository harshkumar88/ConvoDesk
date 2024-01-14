import React from "react";

function Input(props) {
  return (
    <div className={props.className}>
      <label>{props.label}</label>
      <input
        type={props.type}
        //placeholder={props.value}
        disabled={props.disabled}
        value={props.value}
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
      />
    </div>
  );
}

export default Input;
