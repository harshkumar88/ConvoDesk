import React, { useEffect, useState } from "react";
import styles from "../../../../css/Action.module.css";
import Webhook from "./Webhook";
import Property from "./Property/index";
import Assign from "./Assign";
import Select from "react-select";
import { AiOutlineThunderbolt, AiOutlineClose } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const options = [
  { label: "Set Property", value: "property" },
  { label: "Trigger Api", value: "webhook" },
  { label: "Resolve Conversation", value: "resolve" },
  { label: "Assign Group", value: "assign" },
];
const dict = {
  property: "Set Property",
  webhook: "Trigger Api",
  resolve: "Resolve Conversation",
  assign: "Assign Group",
};

function Action({
  item,
  actions,
  setActions,
  webhooks,
  properties,
  groups,
  dialogues,
}) {
  let [data, setData] = useState("");

  let [trigger, setTrigger] = useState(true);
  let [display, setDisplay] = useState(item.type ? false : true);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const deleteButtonStyle = {
    display: isHovered ? "block" : "none",
  };

  useEffect(
    function () {
      if (data == item) {
        return;
      }
      let payload = actions.map(function (item, idx) {
        if (item.idx == data.idx) {
          return { ...data };
        } else {
          return { ...item };
        }
      });
      setActions(payload);
    },
    [data]
  );
  useEffect(
    function () {
      setData(item);
    },
    [trigger]
  );

  function selectedOption(type) {
    const id = options.findIndex((item) => item.value === type);
    return options[id];
  }
  function toggle() {
    setDisplay(!display);
  }
  function close() {
    if (!data.type) {
      setActions(
        actions.filter(function (item, idx) {
          if (item.idx == data.idx && !data.type) {
            return false;
          } else {
            return true;
          }
        })
      );
    }
    setDisplay(false);
  }
  function renderActions() {
    switch (data?.type) {
      case "webhook":
        return <Webhook webhooks={webhooks} data={data} setData={setData} />;
      case "property":
        return (
          <Property
            properties={properties}
            webhooks={webhooks}
            dialogues={dialogues}
            data={data}
            setData={setData}
          />
        );
      case "resolve":
        return <></>;
      case "assign":
        return <Assign groups={groups} data={data} setData={setData} />;
    }
  }
  function changeHandler(option) {
    let payload = { idx: data.idx, data: {}, type: option["value"] };
    setData(payload);
  }

  function deleteAction() {
    setActions(
      actions.filter(function (element, idx) {
        return element.idx != data.idx;
      })
    );
    setTrigger(!trigger);
  }

  return (
    <>
      <div
        className={styles.containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.action_container}>
          {display ? (
            <>
              <div className={styles.action_type}>
                <button onClick={close} className={styles.action_close_btn}>
                  <AiOutlineClose />
                </button>
                <div className={styles.action_div}>
                  <label htmlFor="action_type" className={styles.select}>
                    Action type
                  </label>
                  <Select
                    id="action_type"
                    options={options}
                    value={selectedOption(data?.type)}
                    onChange={changeHandler}
                    className={styles.select}
                  />
                </div>
              </div>
              <div className={styles.action}>{renderActions()}</div>
            </>
          ) : (
            <>
              <div onClick={toggle} className={styles.action_icon_div}>
                <AiOutlineThunderbolt className={styles.action_icon} />
                {dict[data.type]}
              </div>
              {isHovered && (
                <div
                  onClick={deleteAction}
                  style={deleteButtonStyle}
                  title="Delete"
                  className={styles.delete_icon}
                >
                  <div className={styles.delete_icon_subdiv}>
                    <MdDelete className={styles.icon} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Action;
