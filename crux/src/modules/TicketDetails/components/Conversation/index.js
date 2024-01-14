import React from "react";
import styles from "./style.module.css";
import Message from "./components/Message";

function Conversation({ msg }) {
  return (
    <div className={styles.chat_container}>
      <div
        id="scrollableDiv"
        style={{
          height: "65vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1,
          width: "50%",
        }}
      >
        {msg.map((item, index) => (
          <Message
            side={item.message_type ? "right" : "left"}
            avatar={""}
            messages={[
              {
                type: "txt",
                msg: item.message,
                link: item.link,
                msg_data: item,
                media_type: item.media_type,
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
}

export default Conversation;
