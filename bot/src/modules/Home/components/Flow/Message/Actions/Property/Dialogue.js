import React, { useState } from "react";
import styles from "../../../../../css/Action.module.css";
import Select from "react-select";

function Dialogue({ dialogues, data, setData }) {
  const options = dialogues.map(function (item, idx) {
    return { label: `Dialogue ${item?.id}`, value: item?.id };
  });

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }
  // console.log("dialogue", selectedOption(options, data?.data?.dialogue_id));

  function changeHandler(option) {
    const temp = { ...data };
    temp.data.data.dialogue_id = option["value"];
    setData(temp);
  }

  return (
    <div className={styles.action_div}>
      <label htmlFor="property_name" className={styles.select}>
        Select Dialogue
      </label>

      <Select
        options={options}
        value={selectedOption(options, data?.data?.data?.dialogue_id)}
        onChange={changeHandler}
      />
    </div>
  );
}

export default Dialogue;
