import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "../../../../css/Action.module.css";

function Webhook({ actions, setActions, webhooks, data, setData }) {
  const [options, setOptions] = useState([]);

  useEffect(
    function () {
      let arr = [];
      webhooks.map(function (item, idx) {
        arr.push({ label: item?.name, value: item?.id });
      });
      setOptions(arr);
    },
    [webhooks]
  );

  function selectedOption(id) {
    const index = options.findIndex((item) => item.value === id);
    return options[index];
  }

  function changeHandler(option) {
    const temp = { ...data };
    temp.data.webhook_id = option["value"];
    setData(temp);
  }

  return (
    <div className={styles.action_div}>
      <label className={styles.select}>Select Api</label>
      <Select
        options={options}
        value={selectedOption(data?.data?.webhook_id)}
        onChange={changeHandler}
        className={styles.select}
      />
    </div>
  );
}

export default Webhook;
