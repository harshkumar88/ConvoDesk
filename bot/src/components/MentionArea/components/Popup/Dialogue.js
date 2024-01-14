import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { get_data } from "../../../../networkHandler";
import { API_URL } from "../../../../config";
import { AppContext } from "../../../../App";
import styles from "../../css/popup.module.css";
function Dialogue({ data, setData, handler, flows }) {
  function text(dialogue) {
    switch (dialogue?.type) {
      case "T":
        return (
          `${dialogue.id} ${
            dialogue && dialogue.text && dialogue.text.content
              ? dialogue.text.content
              : "-"
          }`.substring(0, 20) + ".."
        );
      case "B":
        return (
          `${dialogue.id} ${
            dialogue && dialogue.button && dialogue.button.content
              ? dialogue.button.content
              : "-"
          }`.substring(0, 20) + ".."
        );
      case "L":
        return (
          `${dialogue.id} ${
            dialogue && dialogue.list && dialogue.list.content
              ? dialogue.list.content
              : "-"
          }`.substring(0, 20) + ".."
        );
      case "C":
        return `${dialogue.id} Carousel`;
    }
  }
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
          return { label: text(item), value: item?.id };
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
      <div className={styles.popup_subdiv}>
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
        <div className={styles.popup_subdiv}>
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
