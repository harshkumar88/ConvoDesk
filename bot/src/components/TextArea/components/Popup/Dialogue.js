import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { get_data } from "../../../../networkHandler";
import { API_URL } from "../../../../config";
import { AppContext } from "../../../../App";

function Dialogue({ data, setData, handler, flows }) {
  const appContext = useContext(AppContext);
  const flowOptions = flows.map(function (item, idx) {
    return { label: item.name, value: item.id };
  });

  let [dialogues, setDialogues] = useState([]);
  let [activeFlow, setActiveFlow] = useState(0);
  useEffect(
    function () {
      if (activeFlow && activeFlow != undefined) {
        get_dialogues();
      }
    },
    [activeFlow]
  );
  function get_dialogues() {
    get_data(
      `${API_URL}/neon/dialogue/v1/?flow_id=${activeFlow}`,
      appContext
    ).then(function (data) {
      setDialogues(
        data.data.map(function (item, idx) {
          return { label: `Dialogue ${item?.id}`, value: item?.id };
        })
      );
    });
  }

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  return (
    <>
      <div>
        <label htmlFor="property_name">Select Flow</label>
        {console.log("flow options", flowOptions)}
        <Select
          options={flowOptions}
          value={selectedOption(flowOptions, data?.flow_id)}
          onChange={function (option) {
            setActiveFlow(option["value"]);
          }}
        />
      </div>
      {activeFlow ? (
        <div>
          <label htmlFor="property_name">Select Dialogue</label>
          <Select
            options={dialogues}
            value={selectedOption(dialogues, data?.flow_id)}
            onChange={function (option) {
              setData({
                ...data,
                dialogue_id: option["value"],
              });
              handler(`dialogue_${option["value"]}`);
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Dialogue;
