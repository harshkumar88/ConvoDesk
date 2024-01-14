import React from "react";
import styles from "./style.module.css";
import ImageContainer from "../../../../../../components/Image";
function Message({ avatar, messages, side }) {
  function get_data(msg) {
    let data = "";
    try {
      data = JSON.parse(msg);
    } catch (e) {
      data = msg;
    }
    return { data: data, is_object: typeof data == "object" };
  }
  function get_time(item) {
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    if (item.created_at) {
      return item.created_at;
    } else {
      return currentTime;
    }
  }
  return (
    <div className={`${styles.chat} ${styles[side]}`}>
      <div className={styles.avatar}>
        <div className={styles.icon}>
          <svg
            className={styles.a}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </div>
      </div>
      <div className={styles.messages}>
        {messages.map(function (item, idx) {
          let obj = get_data(item?.msg);
          const messageClasses = `${styles.msg} ${
            item?.is_private && styles.private
          }`;
          if (item.media_type === 3 || item?.msg_data?.chat_type === "image") {
            return (
              <>
                <p className={styles.name}>{item?.msg_data?.name}</p>
                <span className={messageClasses} key={idx}>
                  <ImageContainer
                    src={item.link}
                    className={styles.img}
                    alt="image"
                  />
                  {item?.msg_data?.message}
                  <p className={styles.time}>
                    {/* {item?.msg_data?.created_at?.split(",")[1]} */}
                    {item?.msg_data?.created_at?.split(",")[1]?.length > 1
                      ? item?.msg_data?.created_at?.split(",")[1]
                      : item?.msg_data?.created_at}
                  </p>
                </span>
              </>
            );
          }
          if (item.media_type === 4 || item?.msg_data?.chat_type === "video") {
            return (
              <>
                <p className={styles.name}>{item?.msg_data?.name}</p>
                <span
                  className={messageClasses}
                  key={idx}
                  style={{ width: "25vw" }}
                >
                  <video width="100%" height="210" controls>
                    <source src={item.link} type="video/mp4"></source>
                  </video>
                  {item?.msg_data?.message}
                  <p className={styles.time}>
                    {item?.msg_data?.created_at?.split(",")[1]?.length > 1
                      ? item?.msg_data?.created_at?.split(",")[1]
                      : item?.msg_data?.created_at}{" "}
                  </p>
                </span>
              </>
            );
          }
          if (!obj.is_object) {
            return (
              <>
                <p className={styles.name}>{item?.msg_data?.name}</p>
                <span className={messageClasses} key={idx}>
                  {item.msg}
                  <p className={styles.time}>
                    {item?.msg_data?.created_at?.split(",")[1]?.length > 1
                      ? item?.msg_data?.created_at?.split(",")[1]
                      : item?.msg_data?.created_at}{" "}
                  </p>
                </span>
              </>
            );
          } else {
            if (obj["data"]["type"] == "button") {
              return (
                <>
                  <p className={styles.name}>{item?.msg_data?.name}</p>
                  <div className={messageClasses}>
                    {obj?.data?.header?.text && (
                      <h3>{obj?.data?.header?.text}</h3>
                    )}
                    <p className={styles.p}>{obj["data"]["body"]["text"]}</p>
                    <div className={styles.msg_options}>
                      {obj["data"]["action"]["buttons"].map(function (
                        e,
                        index
                      ) {
                        return <span>{e["reply"]["title"]}</span>;
                      })}
                    </div>
                    <p className={styles.time}>
                      {item?.msg_data?.created_at?.split(",")[1]?.length > 1
                        ? item?.msg_data?.created_at?.split(",")[1]
                        : item?.msg_data?.created_at}{" "}
                    </p>
                  </div>
                </>
              );
            } else if (obj["data"]["type"] == "list") {
              return (
                <>
                  <p className={styles.name}>{item?.msg_data?.name}</p>
                  <div className={messageClasses}>
                    {obj?.data?.header?.text && (
                      <h3>{obj?.data?.header?.text}</h3>
                    )}
                    <p className={styles.p}>{obj["data"]["body"]["text"]}</p>
                    <div className={styles.msg_options}>
                      {obj["data"]["action"]["sections"][0]["rows"].map(
                        (e, index) => (
                          <span>{e["title"]}</span>
                        )
                      )}
                    </div>
                    <p className={styles.time}>
                      {item?.msg_data?.created_at?.split(",")[1]?.length > 1
                        ? item?.msg_data?.created_at?.split(",")[1]
                        : item?.msg_data?.created_at}{" "}
                    </p>
                  </div>
                </>
              );
            }
          }
        })}
      </div>
    </div>
  );
}

export default Message;
