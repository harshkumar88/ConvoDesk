import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Child from "../components/Child";
import styles from "../css/update.module.css";
import Select from "react-select";
import MentionArea from "../../../components/MentionArea";
import JSONView from "../components/JsonViewer";
import { API_URL } from "../../../config";
import { AppContext } from "../../../App";
import {
  get_data,
  post_data,
  put_data,
} from "../../../React-lib/src/networkhandler";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom";

function Update(props) {
  let { webhookId } = useParams();
  let [disabled, setDisabled] = useState(false);
  let [headers, setHeaders] = useState([]);
  let [url, setUrl] = useState("");
  let [name, setName] = useState("");
  let [payload, setPayload] = useState([]);
  let [expectedKeys, setExpectedKeys] = useState([]);
  let [method, setMethod] = useState("GET");
  let [str, setStr] = useState("");
  const [response, setResponse] = useState({});
  const [expectedArray, setExpectedArray] = useState([]);
  let [load, setLoad] = useState(true);
  const options = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
  ];
  let [isKey, setIsKey] = useState(false);
  const appContext = useContext(AppContext);
  useEffect(
    function () {
      get_data(
        `${API_URL}/neon/webhook/v1/?webhook_id=${webhookId}`,
        appContext
      ).then(function (data) {
        setUrl(data.url);
        setMethod(data.method);
        setIsKey(true);

        setExpectedKeys(data.expected_keys);

        let header_arr = [];
        let header_obj = data.headers;
        Object.keys(header_obj).map(function (item, idx) {
          header_arr.push({ idx: idx, key: item, value: header_obj[item] });
        });
        setHeaders(header_arr);
        setMethod(data.method);
        let payload_arr = [];
        let payload_obj = data.body;
        Object.keys(payload_obj).map(function (item, idx) {
          payload_arr.push({ idx: idx, key: item, value: payload_obj[item] });
        });
        setPayload(payload_arr);
        setName(data.name);
        setLoad(false);
      });
    },
    [webhookId, appContext.reload]
  );
  useEffect(
    function () {
      getValue();
    },
    [expectedKeys]
  );

  function handleExpectedKeys(arr) {
    let expectedArr = expectedKeys;
    let keys = expectedArr.map(function (item, idx) {
      return item["key"];
    });
    arr.map(function (item, idx) {
      if (keys.includes(item["key"])) {
        return;
      } else {
        setExpectedKeys([...expectedKeys, item]);
      }
    });
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
    console.log("header obj", header_obj);
    try {
      let requestBody = {
        method: method,
        headers: {
          ...header_obj,
          "Content-Type": "application/json",
        },
      };
      let payload_obj = {};
      payload.map(function (item, idx) {
        payload_obj[item["key"]] = item["value"];
      });
      if (method === "POST" || method === "PUT") {
        requestBody["body"] = JSON.stringify(payload_obj);
      }
      console.log("body", requestBody);
      const response = await fetch(url, requestBody);
      const data = await response.json();

      setResponse(JSON.stringify(data, null, 2));
      setIsKey(false);
      if (data.success === false) {
        appContext.setAlert(data.error.message, "alert_error");
        setDisabled(!disabled);
      }
    } catch (error) {
      console.log("eeeeeeeeeeeeeee", error);
      appContext.setAlert(error.message, "alert_error");
      // setResponse(error.message);
    }
  };

  function save(e) {
    if (disabled === false) {
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
        expected_keys: expectedKeys,
      };
      if (method == "POST" || method == "PUT") {
        body["payload"] = payload_obj;
      }
      let finalBody = { webhook_id: webhookId, data: body };
      console.log("final body", finalBody);
      put_data(`${API_URL}/neon/webhook/v1/`, finalBody, appContext, true).then(
        function (data) {
          window.location.href = "/webhook";
        }
      );
    }
  }

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }
  function getValue() {
    let a = "";
    expectedKeys.map(function (item, idx) {
      a = a + item["key"] + ",";
    });
    console.log("in get value", expectedKeys, str);
    setStr(a);
  }
  return load ? (
    <h1>Loading</h1>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
      {console.log("expected keys hv ", expectedKeys)}
      <h1 className={styles.heading}>New API</h1>
      <div className={styles.input_box}>
        <label className={styles.label}>API name</label>
        <input
          type="text"
          className={styles.input}
          value={name}
          // onChange={function (e) {
          //   setName(e.target.value);
          // }}
          disabled
          placeholder="Enter API Name"
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
            data={JSON.parse(response)}
            onExpectedKeys={handleExpectedKeys}
            hvarr={expectedKeys}
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
          <input
            type="text"
            value={str}
            style={{ width: "100%", border: "none", outline: "none" }}
            readOnly
          />
        </span>
      </div>
      <div className={styles.btn_container}>
        <button onClick={save} className={styles.dark_btn} disabled={disabled}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Update;
