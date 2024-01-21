import React, { useState, useEffect } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";
import Text from "./FieldComponents/Text";
import SingleSelect from "./FieldComponents/SingleSelect";
import MultiSelect from "./FieldComponents/MultiSelect";
import MultiWithCreatable from "./FieldComponents/MultiWithCreatable";
import SingleWithCreatable from "./FieldComponents/SingleWithCreatable";
import PropertyIssueRender from "./PropertyIssueRender";
import PropertySubIssueRender from "./PropertySubIssueRender";
import PropertyFurtherRender from "./PropertyFurtherRender";
import SingleSelectText from "./FieldComponents/SingleSelectText";
import BooleanInput from "./FieldComponents/Boolean";
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
  const [subIssueId, setSubIssueId] = useState(0);
  const [issueChoices, setIssueChoices] = useState([]);
  const [subIssueChoices, setSubIssueChoices] = useState([]);
  const [furtherChoices, setFurtherChoices] = useState([]);
  const [loader, setLoader] = useState(true);
  const [hover, setHover] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setConstantsMapping(automationData?.constants);
    setTicketFields(automationData?.ticketFields);

    const automation_data = automationData?.ticketFields?.find(
      (info) => info.key == item?.properties?.key
    );

    setFieldType(automation_data?.field_type || "");
    setIssueChoices(automation_data?.choices || []);

    const issue_id =
      automation_data?.choices?.find(
        (info) => info.label == item?.properties?.value
      )?.id || 0;

    const subissue_id = automation_data?.choices
      ?.find((info) => info.label == item?.properties?.value)
      ?.choices?.find(
        (info) => info.label == item?.properties?.property?.value
      )?.id;

    setIssueId(issue_id);
    setSubIssueId(subissue_id);

    setLoader(false);
  }, [automationData, item]);

  useEffect(() => {
    const automation_data = automationData?.ticketFields?.find(
      (info) => info.key == item?.properties?.key
    );
    const subData =
      automation_data?.choices?.find((info) => info.id == issueId)?.choices ||
      [];

    const fbData =
      subData?.find((info) => info.id == subIssueId)?.choices || [];

    setSubIssueChoices(subData);
    setFurtherChoices(fbData);
  }, [issueId, subIssueId]);

  function handleTypeChange(label, value) {
    let actionList = actions?.map((data) => {
      if (item.uid == data.uid) {
        if (label == "value") {
          data.properties.property = {};
        }
        return { ...data, properties: { ...data?.properties, [label]: value } };
      }
      return data;
    });

    setActions([...actionList]);
  }

  function renderComponentSwitch(item, fxn, choices, key) {
    if (fieldType == "dependent") {
      return (
        <SingleSelectText
          value={item?.value}
          callbackfn={fxn}
          choices={choices}
          val={key}
          setIssueId={setIssueId}
          setSubIssueId={setSubIssueId}
        />
      );
    } else if (fieldType == "boolean") {
      return <BooleanInput value={item?.value} callbackfn={fxn} />;
    } else if (fieldType == "integer") {
      return <Text value={item?.value} callbackfn={fxn} number={true} />;
    } else {
      return <Text value={item?.value} callbackfn={fxn} />;
    }
  }

  function checkValidValue(val) {
    if (!val) return false;
    if (Array.isArray(val)) {
      return val.length > 0;
    }
    return val !== "";
  }

  useEffect(() => {
    console.log(actions, "kk");
  }, [actions]);
  return (
    <div className={styles.action_flex}>
      <PropertyIssueRender
        actions={actions}
        ticketFields={ticketFields}
        item={item}
        setFieldType={setFieldType}
        choices={issueChoices}
        handleTypeChange={handleTypeChange}
        renderComponentSwitch={renderComponentSwitch}
      />
      {item?.properties?.property &&
        fieldType == "dependent" &&
        checkValidValue(item?.properties?.value) && (
          <PropertySubIssueRender
            actions={actions}
            setActions={setActions}
            ticketFields={ticketFields}
            issueData={item}
            item={item?.properties?.property}
            setFieldType={setFieldType}
            choices={subIssueChoices}
            handleTypeChange={handleTypeChange}
            renderComponentSwitch={renderComponentSwitch}
          />
        )}

      {item?.properties?.property?.property &&
        fieldType == "dependent" &&
        checkValidValue(item?.properties?.property?.value) && (
          <PropertyFurtherRender
            actions={actions}
            setActions={setActions}
            ticketFields={ticketFields}
            issueData={item}
            subIssueData={item?.properties?.property}
            item={item?.properties?.property?.property}
            setFieldType={setFieldType}
            choices={furtherChoices}
            handleTypeChange={handleTypeChange}
            renderComponentSwitch={renderComponentSwitch}
          />
        )}
    </div>
  );
}

export default Property;
