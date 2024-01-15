import React, { useEffect, useState } from "react";
import Select from "react-select";
import { patch_data } from "../../../../ReactLib/networkhandler";
import { API_URL } from "../../../../config";
function Agent({ data, options, appContext }) {
  let [value, setValue] = useState("");
  useEffect(
    function () {
      options.map(function (item) {
        if (item.value === data.break_id) {
          setValue(item.label);
        }
      });
    },
    [data.break_id]
  );

  function handleChange(e) {
    patch_data(
      `${API_URL}/crux/users/break/v1/`,
      {
        break_id: e.value,
        agent_id: data.agent_id,
      },
      appContext,
      true
    );
  }
  return (
    <div className="item-row">
      <div className="item-col">
        <span className="item-heading">Agent</span>
        <span className="item-value">{data.name}</span>
      </div>
      <div className="item-col">
        <span className="item-heading">Status</span>
        <span className="item-value">
          <Select
            options={options}
            value={options.filter((item) => {
              return item.label == value;
            })}
            className="status_select"
            onChange={handleChange}
          />
        </span>
      </div>
      <div className="item-col">
        <span className="item-heading">Time</span>
        <span className="item-value">{data.elapsed_time}</span>
      </div>
    </div>
  );
}

export default Agent;
