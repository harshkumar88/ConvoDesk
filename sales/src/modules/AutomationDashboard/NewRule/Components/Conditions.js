import React, { useEffect, useState } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import Text from "./FieldComponents/Text";
import SingleSelect from "./FieldComponents/SingleSelect";
import MultiSelect from "./FieldComponents/MultiSelect";
import MultiWithCreatable from "./FieldComponents/MultiWithCreatable";
import ConditionIssueRender from "./ConditionIssueRender";
import ConditionSubIssueRender from "./ConditionSubIssueRender";
import ConditionFurtherRender from "./ConditionFurtherRender";
import BooleanInput from "./FieldComponents/Boolean";
function Conditions({
  item,
  conditions,
  idx,
  selectedOption,
  setConditions,
  index,
  automationData,
  handleAddCondition,
  edit,
}) {
  const [hide, setHide] = useState(edit);
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

  useEffect(() => {
    setConstantsMapping(automationData?.constants);
    setTicketFields(automationData?.ticketFields);
    const automation_data = automationData?.ticketFields?.find(
      (info) => info.key == item?.key
    );

    setFieldType(automation_data?.field_type || "");
    setIssueChoices(automation_data?.choices || []);

    const issue_id =
      automation_data?.choices?.find((info) => info.label == item?.value?.[0])
        ?.id || 0;

    const subissue_id = automation_data?.choices
      ?.find((info) => info.label == item?.value)
      ?.choices?.find((info) => info.label == item?.property?.value?.[0])?.id;

    setIssueId(issue_id);
    setSubIssueId(subissue_id);

    setLoader(false);
  }, [item, automationData]);

  useEffect(() => {
    const automation_data = automationData?.ticketFields?.find(
      (info) => info.key == item?.key
    );
    const subData =
      automation_data?.choices?.find((info) => info.id == issueId)?.choices ||
      [];

    const fbData =
      subData?.find((info) => info.id == subIssueId)?.choices || [];

    setSubIssueChoices(subData);
    setFurtherChoices(fbData);
  }, [issueId, subIssueId]);

  //handle deletion of condition
  function handleConditionDelete() {
    let propertyData = conditions;
    let properyArr = propertyData.properties;
    properyArr.splice(idx, 1);
    propertyData.properties = properyArr;
    conditions = propertyData;
    setConditions({ ...conditions });
  }

  //handles the type of condition
  function handleTypeChange(label, value) {
    if (label == "operator") {
      item.value = "";
    }

    let data = { ...item, [label]: value };
    if (fieldType == "dependent") {
      data = { ...data, property: {} };
    }

    let conditionData = conditions;
    conditionData.properties[idx] = data;
    conditions = conditionData;
    setConditions({ ...conditions });
  }

  function renderComponentSwitch(item, fxn, choices, key) {
    if (item?.operator == "lte" || item?.operator == "gte") {
      return <Text value={item?.value} callbackfn={fxn} number={true} />;
    } else if (item?.operator == "equal" && fieldType == "dependent") {
      return (
        <SingleSelect
          value={item?.value}
          callbackfn={fxn}
          choices={choices}
          val={key}
          setIssueId={setIssueId}
          setSubIssueId={setSubIssueId}
        />
      );
    } else if (item?.operator == "equal" && fieldType == "boolean") {
      return <BooleanInput value={item?.value} callbackfn={fxn} />;
    } else if (item?.operator == "equal") {
      return <MultiWithCreatable value={item?.value || []} callbackfn={fxn} />;
    } else if (
      (item?.operator == "not_equal" || item?.operator == "any") &&
      fieldType == "dependent"
    ) {
      return (
        <MultiSelect
          value={item?.value || []}
          callbackfn={fxn}
          choices={choices}
          key={key}
        />
      );
    } else if (item?.operator == "not_equal" || item?.operator == "any") {
      return <MultiWithCreatable value={item?.value || []} callbackfn={fxn} />;
    } else if (
      item?.operator == "contains" ||
      item?.operator == "not_contains"
    ) {
      return <MultiWithCreatable value={item?.value || []} callbackfn={fxn} />;
    }
  }

  function checkValidValue(val) {
    if (Array.isArray(val)) {
      return val.length > 0;
    }
    return val !== "";
  }

  useEffect(() => {
    // console.log(conditions, "k");
  }, [conditions]);
  return loader ? (
    idx == 0 && <>Load</>
  ) : (
    <div
      className={styles.condition_box}
      key={idx}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.delete_wrapper}>
        <div className={styles.action_delete}>
          <div className={styles.wrapper}>
            {!hide ? (
              <div className={styles.open_wrapper}>
                <ConditionIssueRender
                  item={item}
                  ticketFields={ticketFields}
                  fieldType={fieldType}
                  setFieldType={setFieldType}
                  handleTypeChange={handleTypeChange}
                  choices={issueChoices}
                  setChoices={setIssueChoices}
                  constantsMapping={constantsMapping}
                  renderComponentSwitch={renderComponentSwitch}
                />
                {item?.property &&
                  item?.value &&
                  checkValidValue(item?.value) &&
                  item?.operator == "equal" && (
                    <ConditionSubIssueRender
                      issueData={item}
                      idx={idx}
                      conditions={conditions}
                      setConditions={setConditions}
                      item={item?.property}
                      ticketFields={ticketFields}
                      fieldType={fieldType}
                      setFieldType={setFieldType}
                      handleTypeChange={handleTypeChange}
                      choices={subIssueChoices}
                      setChoices={setSubIssueChoices}
                      constantsMapping={constantsMapping}
                      renderComponentSwitch={renderComponentSwitch}
                    />
                  )}
                {item?.property?.property &&
                  item?.property?.value &&
                  item?.property?.operator == "equal" &&
                  checkValidValue(item?.property?.value) && (
                    <ConditionFurtherRender
                      issueData={item}
                      subIssueData={item?.property}
                      idx={idx}
                      conditions={conditions}
                      setConditions={setConditions}
                      item={item?.property?.property}
                      ticketFields={ticketFields}
                      fieldType={fieldType}
                      setFieldType={setFieldType}
                      handleTypeChange={handleTypeChange}
                      choices={furtherChoices}
                      setChoices={setFurtherChoices}
                      constantsMapping={constantsMapping}
                      renderComponentSwitch={renderComponentSwitch}
                    />
                  )}
              </div>
            ) : (
              <div className={styles.open_wrapper}>
                <Select
                  options={ticketFields?.map((info) => {
                    return { ...info, value: info.key };
                  })}
                  placeholder="key"
                  className={styles.condition_select1}
                  value={ticketFields?.filter((info) => info.key == item?.key)}
                  isDisabled={true}
                />
              </div>
            )}

            <div>
              {!hide ? (
                <span
                  className={styles.wrapper_span}
                  onClick={() => setHide(!hide)}
                >
                  <IoMdArrowDropdown />
                </span>
              ) : (
                <span
                  className={styles.wrapper_span}
                  onClick={() => setHide(!hide)}
                >
                  <IoMdArrowDropup />
                </span>
              )}
            </div>
          </div>
          {conditions?.properties?.length == 1 && idx == 0
            ? null
            : hover && (
                <span
                  className={styles.delete_icon}
                  onClick={() => handleConditionDelete()}
                >
                  <FaTrash />
                </span>
              )}
        </div>
      </div>

      {conditions?.properties?.length > 1 && idx != 0 && (
        <span className={styles.operator}>{selectedOption}</span>
      )}
    </div>
  );
}

export default Conditions;
