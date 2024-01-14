import React, { useContext, useEffect, useState } from "react";
import styles from "../../../css/Main.module.css";
import { IoMdAdd } from "react-icons/io";
import { IoSave } from "react-icons/io5";
import Text from "./Text";
import Button from "./Button";
import List from "./List";
import Action from "./Actions";
import Carousel from "./Carousel";
import Image from "./Image";
import Select, { NonceProvider } from "react-select";
import { TbBrandStackshare } from "react-icons/tb";
import { post_data, put_data } from "../../../../../networkHandler";
import { API_URL } from "../../../../../config";
import { AppContext } from "../../../../../App";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Element, scroller } from "react-scroll";
import TabBar from "../../../../../components/TabBar";

function Message({
  item,
  setActive,
  dialogues,
  setConditions,
  webhooks,
  properties,
  groups,
  setActiveDialogue,
  activeFlow,
}) {
  const appContext = useContext(AppContext);
  const options = [
    { label: "Text", value: "T" },
    { label: "Button", value: "B" },
    { label: "List", value: "L" },
    { label: "Carousel", value: "C" },
    { label: "Image", value: "F" },
  ];
  let [data, setData] = useState({});
  const [actions, setActions] = useState([]);
  let [contentType, setContentType] = useState("content");
  useEffect(
    function () {
      let payload = item;
      if (item.type == "C") {
        payload.carousel.value = payload.carousel.value.map(function (
          element,
          idx
        ) {
          if (element.btn_hindi_title) {
            return { ...element, idx: idx };
          } else {
            return { ...element, idx: idx, btn_hindi_title: "" };
          }
        });
      } else if (item.type == "B") {
        let payload = item;
        payload.button.value = payload.button.value.map(function (
          element,
          idx
        ) {
          if (element.hindi_title) {
            return { ...element, idx: idx };
          } else {
            return { ...element, idx: idx, hindi_title: "" };
          }
        });
      } else if (item.type == "L") {
        let payload = item;
        payload.list.value = payload.list.value.map(function (element, idx) {
          if (element.hindi_title) {
            return { ...element, idx: idx };
          } else {
            return { ...element, idx: idx, hindi_title: "" };
          }
        });
      }
      setData(payload);
    },
    [item]
  );
  useEffect(
    function () {
      if (!Object.keys(data).length) {
        return;
      }
      setActions(
        data.actions.map(function (item, idx) {
          return { ...item, idx: idx };
        })
      );
    },
    [data]
  );
  function selectedOption(type) {
    const id = options.findIndex((item) => item.value === type);
    return options[id];
  }

  function conditionHandler() {
    console.log(
      "updating conditions",
      data.conditions.map(function (item, idx) {
        return { ...item, idx: idx };
      })
    );
    setActive(true);
    setConditions(
      data.conditions.map(function (item, idx) {
        return { ...item, idx: idx };
      })
    );
    setActiveDialogue(data);
  }
  function renderMessage() {
    switch (data?.type) {
      case "T":
        return (
          <Text
            data={data}
            setData={setData}
            setActive={setActive}
            conditionHandler={conditionHandler}
            contentType={contentType}
          />
        );
      case "F":
        return (
          <Image
            data={data}
            setData={setData}
            setActive={setActive}
            conditionHandler={conditionHandler}
            contentType={contentType}
          />
        );
      case "B":
        return (
          <Button
            data={data}
            setData={setData}
            setActive={setActive}
            conditionHandler={conditionHandler}
            contentType={contentType}
          />
        );
      case "L":
        return (
          <List
            data={data}
            setData={setData}
            setActive={setActive}
            conditionHandler={conditionHandler}
            contentType={contentType}
          />
        );
      case "C":
        return (
          <Carousel
            data={data}
            setData={setData}
            setActive={setActive}
            conditionHandler={conditionHandler}
            contentType={contentType}
          />
        );
    }
  }
  function changeHandler(option) {
    let payload = {
      ...data,
      type: option["value"],
      text: null,
      list: null,
      carousel: null,
      button: null,
      file: null,
    };
    let type = option["value"];
    if (type == "B") {
      payload["button"] = {
        content: "",
        hindi_content: "",
        value: [{ title: "", value: "", idx: 0 }],
      };
    } else if (type == "T") {
      payload["text"] = { content: "", hindi_content: "" };
    } else if (type == "F") {
      payload["file"] = { content: "", hindi_content: "" };
    } else if (type == "L") {
      payload["list"] = {
        content: "",
        hindi_content: "",
        btn_name: "",
        value: [{ title: "", value: "", idx: 0 }],
      };
    } else if (type == "C") {
      payload["carousel"] = {
        value: [
          {
            content: "",
            hindi_content: "",
            btn_title: "",
            btn_value: "",
            idx: 0,
          },
        ],
      };
    }
    setData(payload);
  }
  function saveDialogue() {
    let payload = data;

    payload["actions"] = actions;
    console.log("saving dialogue", payload);
    payload["flow_id"] = activeFlow.id;
    if (payload["is_new"]) {
      delete payload["is_new"];
      post_data(`${API_URL}/neon/dialogue/v1/`, payload, appContext, true);
      console.log("post", payload, activeFlow.id);
    } else {
      let body = { dialogue_id: payload["id"], data: payload };
      console.log(body);
      put_data(`${API_URL}/neon/dialogue/v1/`, body, appContext, true);

      console.log("put", payload, activeFlow.id);
    }
  }
  function toggle() {
    setData({ ...data, is_private: !data.is_private });
  }
  return (
    <Element key={`bot_${item.id}`} name={`bot_${item.id}`}>
      <div className={styles.main_wrapper}>
        <div>
          <p className={styles.id_container}>{item?.id}</p>
        </div>
        <div className={styles.container}>
          <div className={styles.main_container_wrapper}>
            {data?.is_private && (
              <span className={styles.private}>Private</span>
            )}
            <div className={styles.select_wrapper}>
              <div className={styles.select_div}>
                <Select
                  options={options}
                  value={selectedOption(data?.type)}
                  onChange={changeHandler}
                />
              </div>
              <span
                onClick={conditionHandler}
                title="Condition"
                className={styles.condition_btn}
              >
                <TbBrandStackshare />
              </span>
            </div>
            <TabBar
              tabs={[
                {
                  title: "English",
                  execute: { func: setContentType, value: "content" },
                },
                {
                  title: "Hindi",
                  execute: { func: setContentType, value: "hindi_content" },
                },
              ]}
              styles={styles}
            />
            {renderMessage()}
          </div>
          <div className={styles.dialogue_actions_wrapper}>
            <div className={styles.dialogue_actions}>
              {actions.length ? (
                <>
                  {actions?.map(function (ele, idx) {
                    return (
                      <Action
                        item={ele}
                        key={idx}
                        webhooks={webhooks}
                        properties={properties}
                        dialogues={dialogues}
                        groups={groups}
                        actions={actions}
                        setActions={setActions}
                      />
                    );
                  })}
                  {/* <button onClick={saveActions}>Save Actions</button> */}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className={styles.message_btn}>
            <div className={styles.btn_container}>
              <button
                // onBlur={closeBtnHandler}
                className={styles.btn_circle}
                onClick={function () {
                  let lastIdx = -1;
                  if (actions.length) {
                    lastIdx = actions[actions.length - 1]["idx"];
                  }
                  const arr = [
                    ...actions,
                    { type: "", data: {}, idx: lastIdx + 1 },
                  ];
                  setActions(arr);
                }}
                title="New Action"
              >
                <IoMdAdd />
              </button>
              <button
                onClick={saveDialogue}
                className={styles.btn_circle}
                title="Save"
              >
                <IoSave />
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={toggle}
            title="Private"
            className={styles.private_button}
          >
            {data?.is_private ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
      </div>
    </Element>
  );
}

export default Message;
