import React, { useContext, useEffect } from "react";
import { ChatContext } from "../..";
import styles from "../../css/style.module.css";
import BulkAssign from "./BulkAssign";
function EmptyChat(props) {
  let chatContext = useContext(ChatContext);

  return (
    <div className={`${styles.chat} ${styles.empty_chat}`}>
      <div className={styles.select_chat}>
        {chatContext.checkedIds.length > 0 ? (
          <div className={styles.context_div}>
            <h2>{chatContext.checkedIds.length} conversations selected</h2>
            <p>Resolve, set properties or a bulk reply to all in a shot</p>
            <BulkAssign />
          </div>
        ) : (
          <>
            <img src={"https://img.crofarm.com/chat.svg"} />
            <p style={{ marginTop: "20px" }}>Please select a chat</p>
          </>
        )}
      </div>
    </div>
  );
}

export default EmptyChat;
