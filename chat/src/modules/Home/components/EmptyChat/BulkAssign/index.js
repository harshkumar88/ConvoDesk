import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import styles from "./style.module.css";
import { AppContext } from "../../../../../App";
import PopUp from "../../../../../utils/Popup";
import { post_data } from "../../../../../React-lib/src/networkhandler";
import { API_URL } from "../../../../../config";
import { ChatContext } from "../../..";

function BulkAssign() {
  const appContext = useContext(AppContext);
  const chatContext = useContext(ChatContext);

  let [close, setClose] = useState(false);
  let [data, setData] = useState({});
  useEffect(
    function () {
      setData({ conversation_ids: chatContext.checkedIds });
      setClose(false);
    },
    [appContext.reload, chatContext.checkedIds]
  );

  function handleSubmit(e) {
    setClose(true);
    e.preventDefault();
    post_data(
      `${API_URL}/neon/conversation/bulk/assign/v1/`,
      data,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setClose(true);
        appContext.setShowLetter(true);
        chatContext.toggleTrigger(data.conversation_id);
        chatContext.setCheckedIds([]);
      }
    });
  }

  return !(
    chatContext.filters &&
    chatContext.filters["group"] &&
    chatContext.filters["group"]["choices"]
  ) ? (
    <></>
  ) : (
    <PopUp
      btnName={"Bulk Assign"}
      btnStyling={styles.popup_btn}
      closeState={close}
    >
      <h1 className={styles.heading}>Assign Chat</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_box}>
          <label className={styles.label}>Select Group</label>
          <Select
            options={chatContext.filters["group"]["choices"]}
            value={chatContext.filters["group"]["choices"].filter(function (
              item,
              idx
            ) {
              return item.value == data.group_id;
            })}
            onChange={function (e) {
              setData((current) => {
                const { agent_id, ...data } = current;
                data["group_id"] = parseInt(e.value);
                return data;
              });
            }}
          />
        </div>
        {data.group_id && (
          <div className={styles.input_box}>
            <label className={styles.label}>Select Agent</label>
            <Select
              options={chatContext.filters["agent"]["choices"].filter(function (
                item,
                idx
              ) {
                return item["groups"].includes(data?.group_id);
              })}
              value={chatContext.filters["agent"]["choices"].map(function (
                item,
                idx
              ) {
                if (data["agent_id"] == item["value"]) {
                  return item;
                }
              })}
              onChange={function (e) {
                setData({ ...data, agent_id: e.value });
              }}
            />
          </div>
        )}

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input type="submit" className={styles.submit_btn} />
        </div>
      </form>
    </PopUp>
  );
}

export default BulkAssign;
