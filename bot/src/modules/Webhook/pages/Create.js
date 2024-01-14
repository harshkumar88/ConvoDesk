import React, { useContext } from "react";
import { useState } from "react";
import Child from "../components/Child";
import styles from "../css/update.module.css";
import Select from "react-select";
import MentionArea from "../../../components/MentionArea";
import JSONView from "../components/JsonViewer";
import { API_URL } from "../../../config";
import { AppContext } from "../../../App";
import { get_data, post_data } from "../../../React-lib/src/networkhandler";
import { IoMdAdd } from "react-icons/io";

function Create(props) {
  let [headers, setHeaders] = useState([]);
  let [url, setUrl] = useState("");
  let [name, setName] = useState("");
  let [payload, setPayload] = useState([]);
  let [expectedKeys, setExpectedKeys] = useState([]);
  let [method, setMethod] = useState("GET");
  const [response, setResponse] = useState({});
  const [expectedArray, setExpectedArray] = useState(null);
  const options = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
  ];
  const appContext = useContext(AppContext);
  function convertJson(data) {
    let res = {};
    try {
      res = JSON.parse(data);
    } catch {}
    return res;
  }
  function handleExpectedKeys(expectedKeys) {
    console.log("create", expectedKeys);
    const uniqueKeys = expectedKeys.filter((item, index, self) => {
      const firstIndex = self.findIndex((i) => i.key === item.key);
      return index === firstIndex;
    });
    setExpectedArray(uniqueKeys);
  }
  const renderedData = [];
  const encounteredKeys = [];
  if (expectedArray) {
    expectedArray.forEach((item) => {
      const { type, key } = item;
      const combinedKey = `${key}`;

      if (!encounteredKeys.includes(combinedKey)) {
        renderedData.push(<div key={combinedKey}>{key}</div>);
        encounteredKeys.push(combinedKey);
      } else {
        console.error(`Duplicate key: ${combinedKey}`);
      }
    });
  }
  const renderedOutput = renderedData.map((element, index) => (
    <React.Fragment key={element.key}>
      {element}
      {index < renderedData.length - 1 && ", "}&nbsp;
    </React.Fragment>
  ));
  function addHeader() {
    console.log("entering");
    let arr = headers;
    let lastIdx = -1;
    if (arr.length) {
      lastIdx = arr[arr.length - 1]["idx"];
    }
    let temp = { key: "", value: "", idx: lastIdx + 1 };
    setHeaders([...headers, temp]);
  }

  function addPayload() {
    let arr = payload;
    let lastIdx = -1;
    if (arr.length) {
      lastIdx = arr[arr.length - 1]["idx"];
    }
    let temp = { key: "", value: "", idx: lastIdx + 1 };
    setPayload([...payload, temp]);
  }

  const handleButtonClick = async (e) => {
    console.log("payload", payload);
    console.log("headers", headers);
    e.preventDefault();
    let header_obj = {};
    headers.map(function (item, idx) {
      header_obj[item["key"]] = item["value"];
    });
    let payload_obj = {};
    payload.map(function (item, idx) {
      payload_obj[item["key"]] = item["value"];
    });
    try {
      let requestBody = {
        method: method,
        headers: {
          ...header_obj,
          "Content-Type": "application/json",
        },
      };
      if (method === "POST" || method === "PUT") {
        console.log("---------", payload, payload_obj);
        // requestBody.body = JSON.stringify(JSON.parse(payload_obj));
        requestBody["body"] = JSON.stringify(payload_obj);
      }
      console.log("body", requestBody);
      const response = await fetch(url, requestBody);
      const data = await response.json();
      console.log("hi");
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.log(error);
      setResponse(error.message);
    }
  };

  function clear() {
    setName("");
    setMethod("");
    setUrl("");
    setHeaders([]);
    setPayload([]);
    setResponse({});
    setExpectedArray(null);
  }

  function save(e) {
    e.preventDefault();
    console.log("headers -->", headers);
    let header_obj = {};
    headers.map(function (item, idx) {
      header_obj[item["key"]] = item["value"];
    });
    console.log("header obj", header_obj);
    let payload_obj = {};
    payload.map(function (item, idx) {
      payload_obj[item["key"]] = item["value"];
    });

    console.log("payload-->", payload);
    console.log("payload obj", payload_obj);
    console.log("exp", expectedArray);
    console.log("method", method);
    console.log("url", url);
    if (name === "" || method === "" || url === "") {
      appContext.setAlert(
        "Please fill all the details correctly",
        "alert_error"
      );
      return;
    }

    let body = {
      name: name,
      url: url,
      bot_id: 1,
      method: method,
      headers: header_obj,
      expected_keys: expectedArray,
    };
    if (method == "POST" || method == "PUT") {
      body["payload"] = payload_obj;
    }
    post_data(`${API_URL}/neon/webhook/v1/`, body, appContext, true)
      .then(function (data) {
        if (data.error) {
          throw new Error(data.error.message);
        }
        console.log("success", data.message);
        window.location.href = "/webhook";
      })
      .catch(function (error) {
        console.log("error", error.message);
        window.location.href = "/webhook";
      });
  }
  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
      <h1 className={styles.heading}>New API</h1>
      <div className={styles.input_box}>
        <label className={styles.label}>API name</label>
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={function (e) {
            setName(e.target.value);
          }}
          placeholder="Enter API Name"
          required
        />
      </div>
      <div className={styles.input_box}>
        <label className={styles.label}>Method</label>
        <Select
          options={options}
          placeholder={"Select the Method"}
          value={selectedOption(options, method)}
          onChange={function (option) {
            setMethod(option["value"]);
          }}
        />
      </div>
      <div className={styles.input_box}>
        <label className={styles.label}>API URL</label>
        <MentionArea
          text={url}
          setText={setUrl}
          placeholder="Api Url"
          isCondition={true}
          className={styles.input}
        />
      </div>
      <div className={`${styles.input_box} ${styles.sub_input_box}`}>
        <label className={styles.label}>Headers</label>
        <button onClick={addHeader} title="Add Headers" className={styles.icon}>
          <IoMdAdd />
        </button>
      </div>
      <div className={styles.input_box_1}>
        {headers.map(function (item, idx) {
          return <Child item={item} data={headers} setData={setHeaders} />;
        })}
      </div>
      <div className={`${styles.input_box} ${styles.sub_input_box}`}>
        <label className={styles.label}>Payload</label>
        <button
          onClick={addPayload}
          title="Add Payload"
          className={styles.icon}
        >
          <IoMdAdd />
        </button>
      </div>
      <div className={styles.input_box_1}>
        {payload.map(function (item, idx) {
          return <Child item={item} data={payload} setData={setPayload} />;
        })}
      </div>
      <div className={styles.input_box}>
        <label className={styles.label}>
          Response
          <button className={styles.dark_btn} onClick={handleButtonClick}>
            Run Test
          </button>
        </label>
        {Object.keys(response).length > 0 && (
          <JSONView
            data={convertJson(response)}
            onExpectedKeys={handleExpectedKeys}
          />
        )}
      </div>
      <div className={styles.input_box}>
        <label className={styles.label}>Expected Keys</label>
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "1.5vh 1vw",
            justifyContent: "flex-start",
          }}
          className={styles.input}
        >
          {renderedOutput}
        </span>
      </div>
      <div className={styles.btn_container}>
        <button onClick={save} className={styles.dark_btn}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Create;
