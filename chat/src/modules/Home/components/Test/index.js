import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink, useLocation } from "react-router-dom";
import { authorise, get_agent_id } from "../../../../ReactLib/auth";
import { BigHead } from "@bigheads/core";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../App";
import { ChatContext } from "../..";
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
import Timer from "../../../../utils/Timer";

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

function ChatList({
  item,
  setData,
  reloadHandler,
  new_data,
  obj,
  statusClass,
  arr,
  current,
  handleCheckboxChange,
  checkedIds,
  idx,
}) {
  const appContext = useContext(AppContext);
  let chatContext = useContext(ChatContext);
  function handler() {
    setData(item);
    reloadHandler();
  }
  function get_time(time) {
    const now = new Date(time);
    let hours = now.getHours();
    const minutes = now.getMinutes();
    let ampm = "";

    if (hours >= 12) {
      ampm = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    } else {
      ampm = "AM";
      if (hours === 0) {
        hours = 12;
      }
    }

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  function get_name() {
    if (item?.consumer_name) {
      return item?.consumer_name;
    } else {
      return item?.name;
    }
  }
  function get_latest_msg(msg) {
    let updated_msg = "";
    try {
      let data = JSON.parse(msg);
      updated_msg = data?.title;
    } catch (e) {
      updated_msg = msg;
    }
    return updated_msg;
  }
  const [isHovered, setIsHovered] = useState(false);
  const isChecked = checkedIds.includes(item.id);
  let [showCheckbox, setShowCheckbox] = useState(false);

  useEffect(() => {
    arr.map(function (it, index) {
      if (it.value === current.value && it.value === 1) {
        setShowCheckbox(true);
      }
    });
  }, [current.value]);

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

  const [overdue, setOverdue] = useState(false);

  return (
    <div
      className={styles.div_wrapper}
      onClick={handler}
      style={{
        background: overdue
          ? "	rgba(250, 160, 160,0.2)"
          : isChecked
          ? "#e5f2fd"
          : "",
        borderLeft: isChecked ? "4px solid #2c5cc5" : "",
        transition: isChecked || overdue ? "all .1s ease-in-out " : "",
      }}
    >
      <div className={styles.div}>
        <div
          className={styles.checkbox_div}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <b
            className={styles.avatar}
            style={{ cursor: showCheckbox ? "pointer" : "default" }}
          >
            {showCheckbox ? (
              <>
                {isHovered || isChecked ? (
                  <input
                    type="checkbox"
                    checked={checkedIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id, get_name())}
                    className={styles.checkbox}
                  />
                ) : (
                  <BigHead {...getAvatarOptions(idx)} />
                )}
              </>
            ) : (
              <BigHead {...getAvatarOptions(idx)} />
            )}
          </b>
        </div>
        <NavLink
          className={styles.name_div}
          style={{ flex: "3" }}
          to={`/conversation/details/${item.id}`}
        >
          <div className={styles.subdiv}>
            <h4 className={styles.name}>{get_name()}</h4>
            {current.value !== 2 ? (
              <p className={statusClass}>
                {item?.is_due
                  ? "Response Due"
                  : item?.status === "R"
                  ? "Resolved"
                  : current.value !== 2 && "Open"}
              </p>
            ) : (
              <div className={styles.agent_assign_div}>
                {arr.map(function (it, index) {
                  return (
                    <>
                      {it.value === current.value && it.value === 2 ? (
                        <span
                          className={styles.agent_assign}
                          title={appContext?.agentDict[item.agent_id]}
                        >
                          {appContext.showLetter ? (
                            <>
                              {appContext?.agentDict[item.agent_id]?.charAt(0)}
                              <Timer chat={item} setOverdue={setOverdue} />
                            </>
                          ) : (
                            <></>
                          )}
                        </span>
                      ) : it.value === current.value && it.value === 1 ? (
                        <>
                          <Timer chat={item} setOverdue={setOverdue} />
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </div>
            )}
          </div>
          <div className={styles.sub_heading_wrapper}>
            {obj["is_object"] ? (
              <div className={styles.sub_heading}>
                <p className={styles.p}>
                  {new_data?.first_line}&nbsp;{new_data?.second_line}
                </p>
              </div>
            ) : (
              <div className={styles.sub_heading}>
                <p className={styles.p}>{get_latest_msg(item?.latest_msg)}</p>
              </div>
            )}
            <p className={styles.time_div}>{get_time(item.epoch)}</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
function AgentChats({
  filteredChat,
  format_data,
  get_modified_data,
  setData,
  reloadHandler,
  handler,
  next,
  arr,
  current,
  checkedIds,
  setCheckedIds,
  name,
  setName,
}) {
  const resolvedStatusClass = `${styles.status} ${styles.resolvedStatus}`;
  const openStatusClass = `${styles.status} ${styles.openStatus}`;
  const assignedStatusClass = `${styles.status} ${styles.assignedStatus}`;
  const unassignedStatusClass = `${styles.status} ${styles.unassignedStatus}`;
  function getClass(item) {
    let statusClass = openStatusClass;
    if (item?.is_due === true) {
      statusClass = unassignedStatusClass;
    } else {
      if (item?.status === "R") {
        statusClass = resolvedStatusClass;
      } else if (item?.status === "O") {
        statusClass = openStatusClass;
      }
    }
    return statusClass;
  }
  // function handler() {
  //   console.log("next please");
  // }

  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [nameArray, setNameArray] = useState([]);

  const handleCheckboxChange = (itemId, name) => {
    console.log(name);
    if (pathname !== "/conversation/details") {
      navigate("/conversation/details");
    }
    if (checkedIds.includes(itemId)) {
      setCheckedIds(checkedIds.filter((checkedId) => checkedId !== itemId));
      setNameArray((prevNameArray) =>
        prevNameArray.filter((item) => item !== name)
      );
    } else {
      setCheckedIds([...checkedIds, itemId]);
      setNameArray((prevNameArray) => [...prevNameArray, name]);
    }
  };

  return (
    <div id="scrollableDiv" className={styles.scrollable_div}>
      <InfiniteScroll
        dataLength={filteredChat.length}
        next={handler}
        hasMore={next}
        loader={
          <>
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          </>
        }
        scrollableTarget="scrollableDiv"
      >
        {filteredChat.map(function (item, idx) {
          let obj = format_data(item?.latest_msg);
          let new_data = get_modified_data(obj);
          let statusClass = getClass(item);
          return (
            <ChatList
              item={item}
              setData={setData}
              reloadHandler={reloadHandler}
              new_data={new_data}
              obj={obj}
              statusClass={statusClass}
              arr={arr}
              current={current}
              handleCheckboxChange={handleCheckboxChange}
              checkedIds={checkedIds}
              idx={idx}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

function LiveChats({
  arr,
  current,
  setCurrent,
  trigger,
  setTrigger,
  setSidebar,
  setPage,
  metrics,
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.menu_sidebar}>
      <div className={styles.menu_sidebar_body}>
        <div className={styles.tab_container}>
          {arr.map(function (item, idx) {
            return (
              <div
                className={
                  item.value === current.value
                    ? `${styles.active} ${styles.tab}`
                    : `${styles.tab}`
                }
                onClick={function () {
                  setCurrent(item);
                  setTrigger(!trigger);
                  setSidebar(false);
                  setPage(1);
                  navigate(`/conversation/details`);
                }}
              >
                <span>{item.name}</span>
                <span>{metrics?.["ct_dict"]?.[item.value]}</span>
              </div>
            );
          })}
        </div>
        {authorise("Supervisor") && (
          <div className={styles.tab_container}>
            <h4 className={styles.heading}>Agent Conversations</h4>
            {/* <div className={styles.tab}>
            <span>Overall Pending Chats</span>
            <span>1</span>
          </div> */}
            {metrics?.agents?.map(function (item, idx) {
              return (
                <div
                  className={styles.tab}
                  onClick={function () {
                    setCurrent({
                      name: item.label,
                      value: 6,
                      filter: [
                        { type: "key", key: "status", value: "O" },
                        { type: "key", key: "stage", value: 2 },
                        { type: "in", key: "agent_id", value: [item.value] },
                      ],
                      agent_id: get_agent_id(),
                    });
                    setTrigger(!trigger);
                    setSidebar(false);
                    setPage(1);
                    navigate(`/conversation/details`);
                  }}
                >
                  <span>{item?.label}</span>
                  <span>{item?.chat_ct}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
function Test({
  sidebar,
  setSidebar,
  filteredChat,
  format_data,
  get_modified_data,
  setData,
  reloadHandler,
  trigger,
  setTrigger,
  current,
  setCurrent,
  arr,
  handler,
  setPage,
  next,
  metrics,
  count,
  checkedIds,
  setCheckedIds,
  name,
  setName,
}) {
  const chatContext = useContext(ChatContext);
  function handleClick() {
    setSidebar(true);
    setCheckedIds([]);
  }
  return (
    <div className={styles.sidebar_container_hv}>
      <div className={styles.sidebar_wrapper}>
        <button onClick={handleClick} className={styles.sidebar_btn}>
          <span className={styles.selected_txt}>
            <RxHamburgerMenu />
          </span>
          <span className={styles.selected_name}>{current.name}</span>
          {arr.map(function (item, idx) {
            return (
              <>
                {item.value === current.value && (
                  <span>{metrics?.["ct_dict"]?.[item.value]}</span>
                )}
              </>
            );
          })}
          {}
        </button>
      </div>
      {sidebar ? (
        <LiveChats
          arr={arr}
          trigger={trigger}
          setTrigger={setTrigger}
          setSidebar={setSidebar}
          current={current}
          setCurrent={setCurrent}
          setPage={setPage}
          metrics={metrics}
        />
      ) : (
        <AgentChats
          filteredChat={filteredChat}
          format_data={format_data}
          get_modified_data={get_modified_data}
          setData={setData}
          reloadHandler={reloadHandler}
          handler={handler}
          next={next}
          arr={arr}
          current={current}
          checkedIds={checkedIds}
          setCheckedIds={setCheckedIds}
          name={name}
          setName={setName}
        />
      )}
    </div>
  );
}

export default Test;
