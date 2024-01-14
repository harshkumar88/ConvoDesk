import React, { useState } from "react";
import Select from "react-select";
import styles from "../../../../css/Action.module.css";

function Assign({ data, setData, groups }) {
  const [options, setOptions] = useState(
    groups.map(function (item, idx) {
      return { label: item?.name, value: item?.id };
    })
  );
  function selectedOption(id) {
    const index = options.findIndex((item) => item.value === id);
    return options[index];
  }
  function handleAssign(option) {
    let temp = { ...data };
    temp.data.group_id = option["value"];
    setData(temp);
  }

  return (
    <div>
      <label className={styles.select}>Select Group</label>
      {console.log(data)}
      <Select
        options={options}
        value={selectedOption(data?.data?.group_id)}
        onChange={handleAssign}
        className={styles.select}
      />
    </div>
  );
}

export default Assign;
