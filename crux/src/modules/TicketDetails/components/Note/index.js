import React, { useContext, useState } from "react";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { delete_data } from "../../../../ReactLib/networkhandler";
import UpdateNote from "../UpdateNote";
import styles from "./style.module.css";

function Note({ data, cannedResponses }) {
  const appContext = useContext(AppContext);
  function deleteNote() {
    delete_data(
      `${API_URL}/crux/ticket/notes/v1/?note_id=${data.id}`,
      appContext
    );
  }
  return (
    <div
      className={styles.container}
      style={{ background: data.is_private && "rgb(254, 241, 225)" }}
    >
      <div className={styles.customer_details}>
        <div className={styles.customer_info}>
          <span className={styles.heading}>
            <b>{data.agent_name}</b> &nbsp;added a
            {data.is_private ? " Private " : " Public "}
            note
          </span>
          <span className={styles.created}>
            Created on &nbsp;{data.created_at}
          </span>
        </div>

        {data.system_created ? (
          <></>
        ) : (
          <>
            <UpdateNote data={data} cannedResponses={cannedResponses} />
            <button className={styles.popup_btn} onClick={deleteNote}>
              Delete Note
            </button>
          </>
        )}
      </div>
      <div className={`${styles.customer_info} ${styles.note_info}`}>
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>
    </div>
  );
}

export default Note;
