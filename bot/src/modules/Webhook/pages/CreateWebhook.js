import React, { useContext, useState } from "react";
import Select from "react-select";
import styles from "../css/update.module.css";
import { post_data } from "../../../React-lib/src/networkhandler";
import { AppContext } from "../../../App";
import JSONView from "../components/JsonViewer";
import { API_URL } from "../../../config";
function CreateWebhook() {
  const [headers, setHeaders] = useState({});
  const [headerKeys, setHeaderKeys] = useState([""]);
  const [apiName, setApiName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [method, setMethod] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [response, setResponse] = useState({});
  const [expectedArray, setExpectedArray] = useState(null);
  const [payload, setPayload] = useState("");
  const appContext = useContext(AppContext);
  const options = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
  ];

  function handleExpectedKeys(expectedKeys) {
    console.log("create", expectedKeys);
    const uniqueKeys = expectedKeys.filter((item, index, self) => {
      // Find the index of the first occurrence of the current item
      const firstIndex = self.findIndex((i) => i.key === item.key);
      // Only keep the current item if its index is equal to the first index
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

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    let body = {
      name: apiName,
      url: apiUrl,
      bot_id: 1,
      method: selectedOption.value,
      headers: headers,
      expected_keys: expectedArray,
    };
    post_data(`${API_URL}/neon/webhook/v1/`, body, appContext, true)
      .then(function (data) {
        if (data.error) {
          throw new Error(data.error.message);
        }
        console.log("success", data.message);
        setApiName("");
        setApiUrl("");
        setSelectedOption("");
        setHeaders("");
        setExpectedArray("");
        setResponse("");
        setHeaderKeys("");
      })
      .catch(function (error) {
        console.log("error", error.message);
        setApiName("");
        setApiUrl("");
        setSelectedOption("");
        setHeaders("");
        setExpectedArray("");
        setResponse("");
        setHeaderKeys("");
      });
  }

  const handleAddRow = () => {
    setHeaderKeys([...headerKeys, ""]);
  };

  const handleRemoveRow = (index) => {
    const newKeys = [...headerKeys];
    newKeys.splice(index, 1);
    setHeaderKeys(newKeys);
    const newHeaders = { ...headers };
    delete newHeaders[index];
    setHeaders(newHeaders);
  };

  const handleChange = (event) => {
    const index = event.target.getAttribute("data-index");
    const name = event.target.getAttribute("name");
    if (name.startsWith("header")) {
      const newKeys = [...headerKeys];
      newKeys[index] = event.target.value;
      setHeaderKeys(newKeys);
    } else if (name.startsWith("value")) {
      const key = headerKeys[index];
      const newHeaders = { ...headers, [key]: event.target.value };
      setHeaders(newHeaders);
    }
  };

  const handleButtonClick = async (e) => {
    console.log("payload", payload);
    console.log(typeof headers, headers);
    e.preventDefault();
    try {
      let requestBody = {
        method: selectedOption?.value,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      };
      if (selectedOption?.value === "POST" || selectedOption?.value === "PUT") {
        requestBody.body = JSON.stringify(JSON.parse(payload));
      }
      const response = await fetch(apiUrl, requestBody);
      const data = await response.json();
      console.log("hi");
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>New API</h1>
        <div className={styles.input_box}>
          <label className={styles.label}>API name</label>
          <input
            type="text"
            className={styles.input}
            value={apiName}
            onChange={function (e) {
              setApiName(e.target.value);
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
            className={styles.input}
            onChange={setSelectedOption}
          />
        </div>
        <div className={styles.input_box}>
          <label className={styles.label}>API URL</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter API URL"
            value={apiUrl}
            onChange={function (e) {
              setApiUrl(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles.input_box}>
          <label className={styles.label}>
            Add Headers{" "}
            <button
              type="button"
              onClick={handleAddRow}
              className={styles.dark_btn}
            >
              +
            </button>
          </label>
          {headerKeys?.map((key, index) => (
            <div key={index} className={styles.subdiv}>
              <div className={styles.input_box}>
                <label
                  className={styles.label}
                  style={{ margin: "0", padding: "0.5vh 0" }}
                >
                  Key
                </label>
                <input
                  type="text"
                  name={`header-${index}`}
                  data-index={index}
                  value={headerKeys[index]}
                  onChange={(event) => handleChange(event, index)}
                  className={styles.input}
                  style={{ margin: "0" }}
                />
              </div>
              <div className={styles.input_box}>
                <label
                  className={styles.label}
                  style={{ margin: "0", padding: "0.5vh 0" }}
                >
                  Value
                </label>
                <input
                  type="text"
                  name={`value-${index}`}
                  data-index={index}
                  value={headers[headerKeys[index]]}
                  onChange={(event) => handleChange(event, index)}
                  className={styles.input}
                  style={{ margin: "0" }}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveRow(index)}
                className={styles.dark_btn}
              >
                -
              </button>
            </div>
          ))}
        </div>
        {(selectedOption?.value === "POST" ||
          selectedOption?.value === "PUT") && (
          <div className={styles.input_box}>
            <label className={styles.label}>Payload</label>
            <textarea
              className={styles.input}
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              placeholder="payload"
              required
              rows="5"
            ></textarea>
          </div>
        )}

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
            />
          )}
        </div>
        <div className={styles.input_box}>
          <label className={styles.label}>Expected Keys</label>
          <span
            style={{ display: "flex", flexDirection: "row" }}
            className={styles.input}
          >
            {renderedOutput}
          </span>
        </div>
        <div className={styles.btn_container}>
          <input type="submit" className={styles.dark_btn} value="Save" />
          <input type="button" className={styles.dark_btn} value="Cancel" />
        </div>
      </form>
    </div>
  );
}
export default CreateWebhook;
