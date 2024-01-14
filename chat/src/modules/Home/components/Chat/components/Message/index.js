import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import ImageContainer from "../../../../../../components/Image";
import { ReactComponent as File } from "../../../../../../assets/File.svg";
import { AppContext } from "../../../../../../App";
import { IoMdCopy } from "react-icons/io";
import { BigHead } from "@bigheads/core";

function Message({
  avatar,
  messages,
  side,
  showLabel,
  getAvatarOptions,
  index,
  messageType,
}) {
  let [detail, setDetail] = useState(false);
  const appContext = useContext(AppContext);
  useEffect(
    function () {
      messages.map(function (item, idx) {
        return item.media_type === 7 ? setDetail(true) : setDetail(false);
      });
    },
    [messages]
  );
  function get_data(msg) {
    let data = "";
    try {
      data = JSON.parse(msg);
    } catch (e) {
      data = msg;
    }
    return { data: data, is_object: typeof data == "object" };
  }
  function handleImgClick(src) {
    navigator.clipboard.writeText(src);
    appContext.setAlert("Image link copied successfully", "alert_success");
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
    <div
      className={`${styles.chat} ${styles[side]}`}
      style={{ justifyContent: detail ? "center" : "" }}
    >
      {detail ? (
        <></>
      ) : showLabel ? (
        <div className={styles.avatar}>
          <div className={styles.icon}>
            <BigHead {...getAvatarOptions(messageType)} />
          </div>
        </div>
      ) : (
        <div className={styles.avatar} style={{ visibility: "hidden" }}>
          <div className={styles.icon}>
            <svg
              className="a"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
          </div>
        </div>
      )}

      <div className={styles.messages}>
        {messages.map(function (item, idx) {
          let obj = get_data(item?.msg);
          const messageClasses = `${styles.msg} ${
            item?.is_private && styles.private
          }`;
          if (item.media_type === 7) {
            return (
              <>
                <div className={styles.text_changes}>
                  <p>{item?.msg_data?.message}</p>
                  <p className={styles.center_time}>{item.created_at}</p>
                </div>
              </>
            );
          }
          if (item.media_type === 3 || item?.msg_data?.chat_type === "image") {
            return (
              <>
                {showLabel ? (
                  <p className={styles.name}>{item?.msg_data?.name}</p>
                ) : (
                  <></>
                )}
                <span className={messageClasses} key={idx}>
                  <ImageContainer
                    src={item.link}
                    className={styles.img}
                    alt="image"
                  />
                  <p className={styles.caption}>{item?.msg_data?.message}</p>
                  <p
                    onClick={() => handleImgClick(item.link)}
                    className={styles.copy_icon}
                    title="Click to copy image url"
                  >
                    <IoMdCopy />
                  </p>
                </span>
                <p className={styles.time} title={get_time(item)}>
                  {get_time(item)?.split(",")[1]?.length > 1
                    ? get_time(item)?.split(",")[1]
                    : get_time(item)}
                </p>
              </>
            );
          }
          if (item.media_type === 4 || item?.msg_data?.chat_type === "video") {
            return (
              <>
                {showLabel ? (
                  <p className={styles.name}>{item?.msg_data?.name}</p>
                ) : (
                  <></>
                )}
                <span
                  className={messageClasses}
                  key={idx}
                  style={{ width: "25vw" }}
                >
                  <video width="100%" height="210" controls>
                    <source src={item.link} type="video/mp4"></source>
                  </video>
                  <p className={styles.caption}>{item?.msg_data?.message}</p>
                </span>
                <p className={styles.time} title={get_time(item)}>
                  {get_time(item)?.split(",")[1]?.length > 1
                    ? get_time(item)?.split(",")[1]
                    : get_time(item)}
                </p>
              </>
            );
          }
          if (
            item.media_type === 5 ||
            item?.msg_data?.chat_type === "document"
          ) {
            return (
              <>
                {showLabel ? (
                  <p className={styles.name}>{item?.msg_data?.name}</p>
                ) : (
                  <></>
                )}{" "}
                <span className={messageClasses} key={idx}>
                  <a
                    href={item?.msg_data?.link}
                    target="_blank"
                    className={styles.file_wrapper}
                  >
                    <File />
                    <p className={styles.file}>File attachment.PDF</p>
                  </a>
                  {item?.msg_data?.message}
                </span>
                <p className={styles.time} title={get_time(item)}>
                  {get_time(item)?.split(",")[1]?.length > 1
                    ? get_time(item)?.split(",")[1]
                    : get_time(item)}
                </p>
              </>
            );
          }
          if (!obj.is_object) {
            return (
              <>
                {showLabel ? (
                  <p className={styles.name}>{item?.msg_data?.name}</p>
                ) : (
                  <></>
                )}{" "}
                <span className={messageClasses} key={idx}>
                  {item.msg}
                </span>
                <p className={styles.time} title={get_time(item)}>
                  {get_time(item)?.split(",")[1]?.length > 1
                    ? get_time(item)?.split(",")[1]
                    : get_time(item)}
                </p>
              </>
            );
          } else {
            if (obj["data"]["type"] == "button") {
              return (
                <>
                  {showLabel ? (
                    <p className={styles.name}>{item?.msg_data?.name}</p>
                  ) : (
                    <></>
                  )}{" "}
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
                  </div>
                  <p className={styles.time} title={get_time(item)}>
                    {get_time(item)?.split(",")[1]?.length > 1
                      ? get_time(item)?.split(",")[1]
                      : get_time(item)}
                  </p>
                </>
              );
            } else if (obj["data"]["type"] == "list") {
              return (
                <>
                  {showLabel ? (
                    <p className={styles.name}>{item?.msg_data?.name}</p>
                  ) : (
                    <></>
                  )}{" "}
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
                  </div>
                  <p className={styles.time} title={get_time(item)}>
                    {get_time(item)?.split(",")[1]?.length > 1
                      ? get_time(item)?.split(",")[1]
                      : get_time(item)}
                  </p>
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
