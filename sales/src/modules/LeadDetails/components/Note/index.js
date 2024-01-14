import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { delete_data } from "../../../../React-lib/src/networkhandler";
import UpdateNote from "../UpdateNote";
import styles from "./style.module.css";

function Note({ data }) {
  const appContext = useContext(AppContext);
  function deleteNote() {
    delete_data(
      `${API_URL}/crux/sales/notes/v1/?note_id=${data.id}`,
      appContext
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.customer_details}>
        <div className={styles.customer_info}>
          <span className={styles.heading}>
            {/* <b>{data.agent_name}</b> &nbsp;added a note */}
            Note added
          </span>
          <span className={styles.created}>
            {/* Created on &nbsp; */}
            {data.created_at}
          </span>
        </div>

        {data.system_created ? (
          <></>
        ) : (
          <>
            <UpdateNote data={data} />
            <button className={styles.popup_btn} onClick={deleteNote}>
              <MdDelete />
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
