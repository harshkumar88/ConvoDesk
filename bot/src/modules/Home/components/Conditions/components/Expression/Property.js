import React, { useState } from "react";
import Select from "react-select";

function Property({ properties, data, setData }) {
  let [options, setOptions] = useState(
    properties.map(function (item, idx) {
      return {
        label: item.name,
        value: item.id,
      };
    })
  );

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  return (
    <Select
      options={options}
      value={selectedOption(options, data?.property_id)}
      onChange={function (option) {
        setData({
          ...data,
          key: option["label"],
          property_id: option["value"],
        });
      }}
    />
  );
}

export default Property;
