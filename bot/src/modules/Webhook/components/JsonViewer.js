import React, { useState } from "react";
import styles from "../css/update.module.css";

const JSONView = ({ data, onExpectedKeys }) => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleKeyClick = (keyPath) => {
    const isKeySelected = selectedKeys.includes(keyPath);

    if (isKeySelected) {
      // Key already selected, remove it
      const updatedKeys = selectedKeys.filter((key) => key !== keyPath);
      setSelectedKeys(updatedKeys);
    } else {
      // Check if any previous selection exists for the same key
      const isKeyAlreadySelected = selectedKeys.some((key) => {
        const keys = key.split(".");
        return keys[keys.length - 1] === keyPath.split(".").pop();
      });
      if (!isKeyAlreadySelected) {
        // Key not selected or updated, add it
        const updatedKeys = [...selectedKeys, keyPath];
        setSelectedKeys(updatedKeys);
      }
    }

    // Construct the expected keys array
    const updatedKeys = isKeySelected
      ? selectedKeys.filter((key) => key !== keyPath)
      : [...selectedKeys, keyPath];

    const expectedKeysSet = new Set(
      updatedKeys.map((keyPath) => {
        const keys = keyPath.split(".");
        const formattedKeys = keys.map((key, index) => {
          if (index === 0) {
            return `[${key}]`;
          } else {
            const match = key.match(/(.*?)\[(\d+)\]/);
            if (match) {
              return `[${match[1]}[${match[2]}]]`;
            } else {
              return `[${key}]`;
            }
          }
        });

        const lastKey = formattedKeys.pop();
        const isList = checkIsList(data, keys);
        const arr = isList ? `[${keys[0]}]` : formattedKeys.join("");
        const type = isList ? "list" : getType(data, keys);
        const keys_1 = keyPath.split(".");
        const formattedKeys_1 = keys_1.map((key) => `[${key}]`);

        if (type === "key") {
          return {
            type: type,
            key: formattedKeys_1.join(""),
          };
        } else {
          const outputArr = isList ? "[arr]" : `${arr.replace(/\[\d+\]/g, "")}`;
          const lastKeyValue = isList ? "[arr]" : `arr${lastKey}`;
          return {
            type: type,
            arr: outputArr,
            key: lastKeyValue,
          };
        }
      })
    );

    const expectedKeys = Array.from(expectedKeysSet);
    onExpectedKeys(expectedKeys);
  };

  const renderJSON = (json, keyPath = "") => {
    if (Array.isArray(json)) {
      return (
        <ul>
          {json?.map((item, index) => {
            const currentKeyPath = keyPath
              ? `${keyPath}[${index}]`
              : `[${index}]`;
            const isSelected = selectedKeys.includes(currentKeyPath);
            const listClassName = "list" + (isSelected ? " selected" : "");

            return (
              <li
                key={currentKeyPath}
                style={{
                  listStyleType: "none",
                  marginBottom: "10px",
                }}
              >
                <button
                  className={`list-btn ${listClassName} ${styles.add}`}
                  onClick={() => handleKeyClick(currentKeyPath)}
                >
                  {isSelected ? "-" : "+"}
                </button>
                {renderJSON(item, currentKeyPath)}
              </li>
            );
          })}
        </ul>
      );
    } else if (typeof json === "object" && json !== null) {
      return (
        <ul style={{ marginLeft: "20px" }}>
          {Object?.entries(json)?.map(([key, value]) => {
            const currentKeyPath = keyPath ? `${keyPath}.${key}` : key;
            const isSelected = selectedKeys.includes(currentKeyPath);
            const listClassName = isSelected ? "selected" : "";

            return (
              <li
                key={currentKeyPath}
                style={{
                  listStyleType: "none",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <button
                  className={`list-btn ${listClassName} ${styles.add}`}
                  onClick={() => handleKeyClick(currentKeyPath)}
                >
                  {isSelected ? "-" : "+"}
                </button>
                <div>{key}: </div>
                <div className={styles.indent}>
                  {renderJSON(value, currentKeyPath)}
                </div>
              </li>
            );
          })}
        </ul>
      );
    } else {
      return <span>{json?.toString()}</span>;
    }
  };

  const checkIsList = (obj, keys) => {
    let currentObj = obj;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const match = key.match(/(.*?)\[(\d+)\]/);
      if (match) {
        const listKey = match[1];
        const index = parseInt(match[2]);
        if (
          Array.isArray(currentObj) &&
          currentObj.length > index &&
          currentObj[index].hasOwnProperty(listKey)
        ) {
          currentObj = currentObj[index][listKey];
        } else {
          currentObj = undefined;
          break;
        }
      } else {
        if (currentObj.hasOwnProperty(key)) {
          currentObj = currentObj[key];
        } else {
          currentObj = undefined;
          break;
        }
      }
    }
    return Array.isArray(currentObj);
  };

  const getType = (obj, keys) => {
    let currentObj = obj;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const match = key.match(/(.*?)\[(\d+)\]/);
      if (match) {
        const listKey = match[1];
        const index = parseInt(match[2]);
        if (
          Array.isArray(currentObj) &&
          currentObj.length > index &&
          currentObj[index].hasOwnProperty(listKey)
        ) {
          currentObj = currentObj[index][listKey];
        } else {
          currentObj = undefined;
          break;
        }
      } else {
        if (currentObj.hasOwnProperty(key)) {
          currentObj = currentObj[key];
        } else {
          currentObj = undefined;
          break;
        }
      }
    }
    return typeof currentObj === "string" ||
      typeof currentObj === "boolean" ||
      typeof currentObj === "number"
      ? "key"
      : "list";
  };

  const expectedKeys = selectedKeys.map((keyPath) => {
    const keys = keyPath.split(".");
    const formattedKeys = keys.map((key, index) => {
      if (index === 0) {
        return `[${key}]`;
      } else {
        const match = key.match(/(.*?)\[(\d+)\]/);
        if (match) {
          return `[${match[1]}[${match[2]}]]`;
        } else {
          return `[${key}]`;
        }
      }
    });

    const lastKey = formattedKeys.pop();
    const isList = checkIsList(data, keys);
    const arr = isList ? `[${keys[0]}]` : formattedKeys.join("");
    const type = isList ? "list" : getType(data, keys);
    const output =
      type === "key"
        ? `{type: ${type}, key: ${lastKey ? `[${lastKey}]` : ""}}`
        : `{type: ${type}, arr: ${arr}, key: ${lastKey}}`;

    if (type === "key") {
      return {
        type: type,
        key: lastKey,
      };
    } else {
      const outputArr = isList ? "[arr]" : `${arr.replace(/\[\d+\]/g, "")}`;
      const lastKeyValue = isList ? "[arr]" : `arr${lastKey}`;
      return {
        type: type,
        arr: outputArr,
        key: lastKeyValue,
      };
    }
  });

  console.log(expectedKeys);

  return (
    <>
      <div
        className={styles.json_input}
        style={{ maxHeight: "35vh", overflowY: "scroll" }}
      >
        {renderJSON(data)}
      </div>
    </>
  );
};
export default JSONView;
