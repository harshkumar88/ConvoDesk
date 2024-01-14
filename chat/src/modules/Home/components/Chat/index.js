import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "./style.module.css";
import { FiSend } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "./components/Message";
import MentionArea from "../../../../components/MentionArea";
import { get_data } from "../../../../React-lib/src/networkhandler";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import Assign from "./components/Assign";
import {
  get_access_token,
  get_agent_name,
} from "../../../../React-lib/src/auth";
import Resolve from "./components/Resolve";
import Reopen from "./components/Reopen";
import { ReactComponent as Whatsapp } from "../../../../assets/Whatsapp.svg";
import Timer from "../../../Timer";

import {
  theme,
  eyesMap,
  eyebrowsMap,
  mouthsMap,
  hairMap,
  facialHairMap,
  clothingMap,
  accessoryMap,
  graphicsMap,
  hatMap,
  bodyMap,
} from "@bigheads/core";
import Toggle from "../../../../components/Toggle";
import { useNavigate } from "react-router-dom";

const avatarMap = new Map();

function selectRandomKey(object) {
  return Object.keys(object)[
    Math.floor(Math.random() * Object.keys(object).length)
  ];
}

export function getRandomOptions() {
  const skinTone = selectRandomKey(theme.colors.skin);
  const eyes = selectRandomKey(eyesMap);
  const eyebrows = selectRandomKey(eyebrowsMap);
  const mouth = selectRandomKey(mouthsMap);
  const hair = selectRandomKey(hairMap);
  const facialHair = selectRandomKey(facialHairMap);
  const clothing = selectRandomKey(clothingMap);
  const accessory = selectRandomKey(accessoryMap);
  const graphic = selectRandomKey(graphicsMap);
  const hat = selectRandomKey(hatMap);
  const body = selectRandomKey(bodyMap);

  const hairColor = selectRandomKey(theme.colors.hair);
  const clothingColor = selectRandomKey(theme.colors.clothing);
  const circleColor = selectRandomKey(theme.colors.bgColors);
  const lipColor = selectRandomKey(theme.colors.lipColors);
  const hatColor = selectRandomKey(theme.colors.clothing);
  const faceMaskColor = selectRandomKey(theme.colors.clothing);

  const mask = true;
  const faceMask = false;
  const lashes = Math.random() > 0.5;

  return {
    skinTone,
    eyes,
    eyebrows,
    mouth,
    hair,
    facialHair,
    clothing,
    accessory,
    graphic,
    hat,
    body,
    hairColor,
    clothingColor,
    circleColor,
    lipColor,
    hatColor,
    faceMaskColor,
    mask,
    faceMask,
    lashes,
  };
}

function Chat({ chatContext, setChatTrigger, exceptionalRefundData }) {
  let { filters, conversationDetails, active, setActive } = chatContext;
  const appContext = useContext(AppContext);
  let navigate = useNavigate();

  const placeholderDict = {
    true: "Private notes are not visible to you and your team. Press Shift + Enter to add a newline",
    false: "Press Shift + Enter to add a newline",
  };
  let [msg, setMsg] = useState([]);
  let [input, setInput] = useState("");
  let [next, setNext] = useState(true);
  let [conversationId, setConversationId] = useState(conversationDetails.id); //FOR PAGINATION
  let [isPrivate, setPrivate] = useState(false);
  let [loader, setLoader] = useState(false);
  let [trigger, setTrigger] = useState(true);
  const inputRef = useRef();
  const ws = useRef(null);
  const timelineRef = useRef();
  const [formattedTime, setFormattedTime] = useState("");
  let [viewTicket, setViewTicket] = useState(false);
  let [ticketId, setTicketId] = useState("");

  useEffect(() => {
    convertEpochToTime(conversationDetails.agent_assign_time);
    if (conversationDetails.id) {
      setViewTicket(false);
      handleViewTicket();
    }
  }, [conversationDetails.id, conversationDetails.agent_assign_time]);

  function handleViewTicket() {
    get_data(
      `${API_URL}/crux/conversation/v1/?conversation_id=${conversationDetails.id}`,
      appContext
    ).then(function (data) {
      if (data) {
        if (data?.data) {
          setViewTicket(true);
          setTicketId(data?.data?.id);
        } else {
          setViewTicket(false);
        }
      }
    });
  }
  const convertEpochToTime = (agent_time) => {
    if (agent_time === 0) {
      setFormattedTime("---");
    } else {
      const dateObj = new Date(agent_time * 1000);
      const formatted = dateObj.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setFormattedTime(formatted);
    }
  };
  useEffect(
    function () {
      if (conversationDetails && conversationDetails.id) {
        setConversationId(conversationDetails.id);
        getMsgFromDB(conversationDetails.id);
        // setInput("");
      }
    },
    [conversationDetails]
  );

  const handler = () => {
    setTimeout(() => {
      getMsgFromDB();
    }, 10);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTrigger(!trigger);
    }, 30000);

    return () => clearInterval(interval);
  }, [trigger]);
  useEffect(
    function () {
      if (conversationDetails && conversationDetails.phone) {
        if (ws && ws.current) {
          ws.current.close();
        }
        ws.current = new WebSocket(
          `wss://ws.crofarm.com/chatsocket?phone=${conversationDetails.phone}`
        );
        ws.current.onopen = () => {
          console.log("WebSocket Client Connected");
        };
        ws.current.onmessage = (message) => {
          const dataFromServer = JSON.parse(message.data);
          if (
            dataFromServer["chat_type"] == "assign" ||
            dataFromServer["chat_type"] == "resolve"
          ) {
            setChatTrigger(Math.round(Math.random() * 1100000));
          } else {
            setMsg((prevState) => [dataFromServer, ...prevState]);
          }
        };
      }
    },
    [trigger]
  );
  useEffect(
    function () {
      if (conversationDetails && conversationDetails.phone) {
        setMsg([]);
        if (ws && ws.current) {
          ws.current.close();
        }
        ws.current = new WebSocket(
          `wss://ws.crofarm.com/chatsocket?phone=${conversationDetails.phone}`
        );
        ws.current.onopen = () => {
          console.log("WebSocket Client Connected");
        };
        ws.current.onmessage = (message) => {
          const dataFromServer = JSON.parse(message.data);
          if (
            dataFromServer["chat_type"] == "assign" ||
            dataFromServer["chat_type"] == "resolve"
          ) {
            setChatTrigger(Math.round(Math.random() * 1100000));
          } else {
            setMsg((prevState) => [dataFromServer, ...prevState]);
          }
        };
      }
    },
    [conversationDetails]
  );

  useEffect(() => {
    if (input != "") {
      let inputData = sessionStorage.getItem("conversations");
      if (inputData) {
        inputData = JSON.parse(inputData);
        sessionStorage.setItem(
          "conversations",
          JSON.stringify({
            ...inputData,
            [`chat_${conversationDetails.id}`]: input,
          })
        );
      } else {
        sessionStorage.setItem(
          "conversations",
          JSON.stringify({
            [`chat_${conversationDetails.id}`]: input,
          })
        );
      }
    }
  }, [input]);

  useEffect(() => {
    setInput((curr) => "");
    let inputData = sessionStorage.getItem("conversations");
    if (inputData) {
      inputData = JSON.parse(inputData);
      if (inputData[`chat_${conversationDetails.id}`]) {
        setInput(inputData[`chat_${conversationDetails.id}`]);
      }
    }
  }, [conversationDetails.id]);

  function getGroup() {
    let group_name = "-";
    filters?.group?.choices?.map(function (item, idx) {
      if (item.value == conversationDetails?.group_id) {
        group_name = item.label;
      }
    });
    return group_name;
  }
  function getAgent() {
    let agent_name = "-";
    filters?.agent?.choices?.map(function (item, idx) {
      if (item.value == conversationDetails?.agent_id) {
        agent_name = item.label;
      }
    });
    return agent_name;
  }

  function isDisabled() {
    return conversationDetails.stage == 1 || conversationDetails.status == "R";
  }
  async function getMsgFromDB(conversation_id = null) {
    let finalConversationId = conversationId;

    if (conversation_id) {
      finalConversationId = conversation_id;
    }
    get_data(
      `${API_URL}/chat/v1/?conversation_id=${finalConversationId}&phone=${conversationDetails.phone}`,
      appContext
    ).then(function (data) {
      if (data) {
        if (conversation_id) {
          setMsg(groupConversations(data.data));
        } else {
          setMsg(msg.concat(groupConversations(data.data)));
        }
        setNext(data.has_next);
        setConversationId(data.conversation_id);
        setLoader(false);
      }
    });
  }
  function groupConversations(conversations) {
    let message_type = -1;
    let agent_id = -1;
    let finalConversations = conversations.reverse().map(function (item, idx) {
      if (
        item["message_type"] == message_type &&
        item["agent_id"] == agent_id
      ) {
        item["show_label"] = false;
      } else {
        item["show_label"] = true;
      }
      message_type = item["message_type"];
      agent_id = item["agent_id"];
      return item;
    });
    return finalConversations.reverse();
  }

  function handleImg(e, file) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("file", file);
    if (file.size > 1000000) {
      appContext.setAlert("Provide small image !!", "alert_error");
      return;
    }
    fd.append("image_type", 0);
    fetch(`${API_URL}/hook/image/upload/v1/`, {
      method: "post",
      body: fd,
      headers: new Headers({
        "access-token": get_access_token(),
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.error) {
          throw new Error(data.error.message);
        }
        sendImg(data.url);
      })
      .catch(function (error) {
        console.log("Errror", error);
      });
  }

  function submit() {
    if (ws && ws.current) {
      setInput("");
      let inputData = sessionStorage.getItem("conversations");

      if (inputData) {
        inputData = JSON.parse(inputData);
        const {
          [`chat_${conversationDetails.id}`]: specificChatData,
          ...restData
        } = inputData;
        sessionStorage.setItem("conversations", JSON.stringify(restData));
      }

      const message = input.endsWith("\n") ? input : input + "\n";
      if (input === "") {
        appContext.setAlert("Please enter a valid text.", "alert_error");
        return;
      }
      ws.current.send(
        JSON.stringify({
          ...conversationDetails,
          conversation_id: conversationDetails["id"],
          message: input,
          message_type: true,
          is_private: isPrivate,
          name: get_agent_name(),
        })
      );
    }
  }
  function sendImg(imglink) {
    if (ws && ws.current) {
      setInput("");
      ws.current.send(
        JSON.stringify({
          ...conversationDetails,
          conversation_id: conversationDetails["id"],
          message: input,
          link: imglink,
          message_type: true,
          is_image: true,
          media_type: 3,
          name: get_agent_name(),
        })
      );
    }
  }
  const getAvatarOptions = (index) => {
    if (avatarMap.has(index)) {
      // If avatar options already exist in the map, return them
      return avatarMap.get(index);
    } else {
      // If avatar options don't exist, generate new options and store them in the map
      const options = getRandomOptions();
      avatarMap.set(index, options);
      return options;
    }
  };

  let [flag, setFlag] = useState(false);
  function handleFlag(e) {
    setFlag(!flag);
    setPrivate(!isPrivate);
  }
  function handleNavigate() {
    window.open(
      `https://crux.crofarm.com/ticket/details/${ticketId}`,
      "_blank"
    );
  }

  return (
    <div className={styles.chat_container}>
      <div className={styles.chat_box}>
        {loader ? (
          <div className="loader_container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <div className={styles.chat_container_header_wrapper}>
              <div className={styles.chat_container_header}>
                <div className={styles.subheader_div}>
                  <div className={styles.name_div}>
                    <h4 className={styles.name_heading}>
                      {conversationDetails.name}
                    </h4>
                    <div className={styles.chat_subdiv}>
                      <p>{getGroup() !== "-" && getGroup()}</p>
                      <p>{getAgent() !== "-" && <>/{getAgent()}</>}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.dropdown_box}>
                  <div className={styles.dropdown_container}>
                    {conversationDetails?.status != "R" && (
                      <Assign chatContext={chatContext} />
                    )}
                    {conversationDetails?.status == "O" ? (
                      <Resolve chatContext={chatContext} />
                    ) : (
                      <Reopen chatContext={chatContext} />
                    )}
                    {viewTicket && (
                      <button
                        className={`${styles.ticket_btn}`}
                        onClick={handleNavigate}
                      >
                        View Ticket
                      </button>
                    )}

                    <button
                      onClick={function () {
                        setActive(active == "details" ? "tickets" : "details");
                      }}
                      className={styles.resolve_btn}
                    >
                      {active == "details" ? "Create Ticket" : "User Details"}
                    </button>
                  </div>
                </div>
              </div>

              <>
                {formattedTime !== "---" ? (
                  <hr className={styles.hr} />
                ) : exceptionalRefundData?.exceptional_refund ? (
                  <hr className={styles.hr} />
                ) : (
                  <></>
                )}
                <div className={styles.header_row_2}>
                  <div className={styles.chat_subdiv}>
                    {formattedTime !== "---" && (
                      <p>Chat Assign Time: {formattedTime}</p>
                    )}
                  </div>

                  {exceptionalRefundData?.exceptional_refund ? (
                    <div className={styles.exceptional_refund_div}>
                      Exceptional refund: Given{" "}
                      {exceptionalRefundData.exceptional_refund}
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    className={`${styles.timer_container} ${styles.timer_end}`}
                  >
                    {conversationDetails.status == "O" &&
                    conversationDetails?.sla?.show_sla ? (
                      <Timer data={conversationDetails.sla} />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </>
            </div>

            <div className={styles.scrollable_wrapper}>
              <div
                id="scrollableDiv_chat"
                className={styles.scrollable_div}
                ref={timelineRef}
              >
                <InfiniteScroll
                  dataLength={msg.length}
                  next={handler}
                  style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
                  inverse={true}
                  hasMore={next}
                  loader={
                    <>
                      <div className="loader_container">
                        <div className="loader"></div>
                      </div>
                    </>
                  }
                  scrollableTarget="scrollableDiv_chat"
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
                          created_at: item.created_at,
                          is_private: item?.is_private,
                          name: item?.name,
                        },
                      ]}
                      showLabel={item?.show_label}
                      getAvatarOptions={getAvatarOptions}
                      index={index}
                      messageType={item?.message_type}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          </>
        )}
        <div className={styles.input_box}>
          <div
            className={styles.bottom_tabbar}
            style={isDisabled() ? { opacity: "0.3" } : {}}
          >
            {/* <div
              className={`${
                !isPrivate ? styles.bottom_tab_active : styles.bottom_tab
              } ${isDisabled() ? styles.disabled_tab : ""}`}
              onClick={function () {
                setPrivate(false);
              }}
            >
              Reply
            </div>

            <div
              className={`${
                isPrivate ? styles.bottom_tab_active : styles.bottom_tab
              } ${isDisabled() ? styles.disabled_tab : ""}`}
              onClick={function () {
                setPrivate(true);
              }}
            >
              Private Note
            </div> */}

            <Toggle flag={flag} handleSubmit={handleFlag} />
            <div className={styles.upload_btn}>
              <div className={`${styles.btn_input} ${styles.btn_input_div}`}>
                <input
                  type="file"
                  id="test"
                  ref={inputRef}
                  style={{ display: "none" }}
                  onChange={function (e) {
                    e.preventDefault();
                    handleImg(e, e.target.files[0]);
                  }}
                />
                <button
                  type="submit"
                  className={styles.upload_btn}
                  onClick={(e) => {
                    e.preventDefault();
                    inputRef.current.value = null;
                    inputRef.current.click();
                  }}
                >
                  <svg
                    className={styles.svg}
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="rgb(140, 163, 186)"
                  >
                    <path d="M6,7A2,2,0,1,1,8,9,2,2,0,0,1,6,7Zm15.8,9.73-6-8a.76.76,0,0,0-1.2,0l-4,5.17a.5.5,0,0,1-.78,0L7.63,11.24a.75.75,0,0,0-1.17,0L2.21,16.73a1,1,0,0,0-.21.61v.91a.76.76,0,0,0,.75.75h18.5a.76.76,0,0,0,.75-.75v-.92A1,1,0,0,0,21.8,16.73Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              isPrivate ? styles.private_wrapper : styles.input_wrapper
            }
          >
            <div className={styles.input_subdiv}>
              <div
                className={`${styles.custom_div} ${
                  isDisabled() ? `${styles.input_disabled_div}` : ""
                }`}
              >
                <MentionArea
                  text={input}
                  setText={setInput}
                  submit={submit}
                  placeholder={placeholderDict[isPrivate]}
                  style={{
                    background: isPrivate ? "#FEF1E1" : "",
                  }}
                  disabled={isDisabled()}
                />
              </div>
              <div
                className={styles.send_msg_div}
                style={{
                  background: isPrivate ? "#FEF1E1" : "",
                }}
              >
                <button
                  className={`${styles.send_msg_btn} ${
                    isDisabled() ? `${styles.btn_disabled}` : ""
                  }`}
                  onClick={submit}
                  disabled={isDisabled()}
                >
                  <svg
                    className={styles.send_svg}
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="SendIcon"
                  >
                    <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
