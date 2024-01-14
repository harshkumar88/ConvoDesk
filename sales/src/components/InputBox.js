import React from "react";

function InputBox(props) {
  function handleChange(e) {
    props.setInput(e.target.value);
  }
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      disabled={props.disabled}
      value={props.value}
      onChange={handleChange}
      className={props.class}
      required={props.required}
      checked={props.checked}
    />
  );
}

export default InputBox;
