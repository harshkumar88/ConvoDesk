import React from "react";
import Select from "react-select";

function GoTo({ dialogues, data, setData }) {
  function text(dialogue) {
    switch (dialogue?.type) {
      case "T":
        return (
          `${dialogue.id}) ${
            dialogue && dialogue.text && dialogue.text.content
              ? dialogue.text.content
              : "-"
          }`.substring(0, 50) + ".."
        );
      case "B":
        return (
          `${dialogue.id}) ${
            dialogue && dialogue.button && dialogue.button.content
              ? dialogue.button.content
              : "-"
          }`.substring(0, 50) + ".."
        );
      case "L":
        return (
          `${dialogue.id}) ${
            dialogue && dialogue.list && dialogue.list.content
              ? dialogue.list.content
              : "-"
          }`.substring(0, 50) + ".."
        );
      case "C":
        return `${dialogue.id}) Carousel`;
    }
  }
  const options = dialogues.map(function (item, idx) {
    return {
      label: text(item),
      value: item?.id,
      flow_id: item.flow_id,
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
          flow_id: option["flow_id"],
        });
      }}
    />
  );
}

export default GoTo;
