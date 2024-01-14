import React, { useState } from "react";
import Select from "react-select";

function Dialogue({ dialogues, data, setData }) {
  const options = dialogues.map(function (item, idx) {
    return {
      label: `Dialogue ${item?.id}`,
      value: item?.id,
    };
  });

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  return (
    <Select
      options={options}
      value={selectedOption(options, data?.dialogue_id)}
      onChange={function (option) {
        setData({
          ...data,
          dialogue_id: option["value"],
        });
      }}
    />
  );
}

export default Dialogue;
