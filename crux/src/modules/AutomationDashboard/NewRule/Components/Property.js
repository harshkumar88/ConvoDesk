import React, { useState, useEffect } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";
import Text from "./FieldComponents/Text";
import SingleSelect from "./FieldComponents/SingleSelect";
import MultiSelect from "./FieldComponents/MultiSelect";
import MultiWithCreatable from "./FieldComponents/MultiWithCreatable";
import SingleWithCreatable from "./FieldComponents/SingleWithCreatable";
function Property({
  ticketOptions,
  item,
  actions,
  setActions,
  automationData,
}) {
  const [fieldType, setFieldType] = useState("");
  const [constantsMapping, setConstantsMapping] = useState({});
  const [ticketFields, setTicketFields] = useState([]);
  const [issueId, setIssueId] = useState(0);
  const [choices, setChoices] = useState([]);
  const [loader, setLoader] = useState(true);
  const [hover, setHover] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setConstantsMapping(automationData?.constants);
    setTicketFields(automationData?.ticketFields);
    const automation_data = automationData?.ticketFields?.find(
      (info) => info.key == item?.key
    );
    setFieldType(automation_data?.field_type || "");
    setChoices(automation_data?.choices || []);
    setLoader(false);
  }, [automationData, item]);

  function handleTicketChange(label, value) {
    console.log(label, value, "call");
    let actionList = actions?.map((data) => {
      if (item.uid == data.uid) {
        return { ...data, properties: { ...data?.properties, [label]: value } };
      }
      return data;
    });

    setActions([...actionList]);
  }

  function renderComponentSwitch() {
    if (item?.operator == "lte" || item?.operator == "gte") {
      return (
        <Text value={item?.properties?.value} callbackfn={handleTicketChange} />
      );
    } else if (item?.operator == "equal" && fieldType == "dependent") {
      return (
        <SingleSelect
          value={item?.properties?.value}
          callbackfn={handleTicketChange}
          choices={choices}
        />
      );
    } else if (item?.operator == "equal") {
      return (
        <MultiWithCreatable
          value={item?.properties?.value || []}
          callbackfn={handleTicketChange}
        />
      );
    } else if (
      (item?.operator == "not_equal" || item?.operator == "any") &&
      fieldType == "dependent"
    ) {
      return (
        <MultiSelect
          value={item?.properties?.value || []}
          callbackfn={handleTicketChange}
          choices={choices}
        />
      );
    } else if (item?.operator == "not_equal" || item?.operator == "any") {
      return (
        <MultiWithCreatable
          value={item?.properties?.value || []}
          callbackfn={handleTicketChange}
        />
      );
    } else if (
      item?.operator == "contains" ||
      item?.operator == "not_contains"
    ) {
      return (
        <MultiWithCreatable
          value={item?.properties?.value || []}
          callbackfn={handleTicketChange}
        />
      );
    }
    return (
      <Text value={item?.properties?.value} callbackfn={handleTicketChange} />
    );
  }

  return (
    <div className={styles.action_flex}>
      <Select
        options={ticketFields?.map((info) => {
          return { ...info, value: info.key };
        })}
        placeholder="key"
        className={styles.condition_select1}
        value={ticketFields?.filter(
          (info) => info?.key == item?.properties?.key
        )}
        onChange={(e) => {
          setFieldType(e.field_type);
          setChoices(e?.choices || []);
          handleTicketChange("key", e.value);
        }}
        required
      />

      <div className={styles.condition_select4}>{renderComponentSwitch()}</div>
      {/* <Select
        options={ticketOptions}
        placeholder="value"
        className={styles.condition_select1}
        value={ticketOptions?.filter(
          (info) => info.value == item?.properties?.value
        )}
        onChange={(e) => handleTicketChange("value", e.value)}
        required
      /> */}
    </div>
  );
}

export default Property;
