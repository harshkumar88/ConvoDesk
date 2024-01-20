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
import SingleWithCreatable from "./FieldComponents/SingleWithCreatable";

function ConditionRender({
  item,
  automationData,
  handleAddCondition,
  conditions,
  setConditions,
  idx,
}) {
  const [fieldType, setFieldType] = useState("");
  const [constantsMapping, setConstantsMapping] = useState({});
  const [ticketFields, setTicketFields] = useState([]);
  const [issueId, setIssueId] = useState(0);
  const [choices, setChoices] = useState([]);
  const [loader, setLoader] = useState(true);
  const [hover, setHover] = useState(false);
  const [hide, setHide] = useState(false);

  const ticketOptions = [
    { label: "Ticket", value: "Tickets" },
    { label: "Creation", value: "Creation" },
  ];

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
    let data = { ...item, [label]: value };
    let conditionData = conditions;
    conditionData.properties[idx] = data;
    conditions = conditionData;
    setConditions({ ...conditions });
  }

  function renderComponentSwitch() {
    if (item?.operator == "lte" || item?.operator == "gte") {
      return <Text value={item?.value} callbackfn={handleTypeChange} />;
    } else if (item?.operator == "equal" && fieldType == "dependent") {
      return (
        <SingleSelect
          value={item?.value}
          callbackfn={handleTypeChange}
          choices={choices}
        />
      );
    } else if (item?.operator == "equal") {
      return (
        <MultiWithCreatable
          value={item?.value || []}
          callbackfn={handleTypeChange}
        />
      );
    } else if (
      (item?.operator == "not_equal" || item?.operator == "any") &&
      fieldType == "dependent"
    ) {
      return (
        <MultiSelect
          value={item?.value || []}
          callbackfn={handleTypeChange}
          choices={choices}
        />
      );
    } else if (item?.operator == "not_equal" || item?.operator == "any") {
      return (
        <MultiWithCreatable
          value={item?.value || []}
          callbackfn={handleTypeChange}
        />
      );
    } else if (
      item?.operator == "contains" ||
      item?.operator == "not_contains"
    ) {
      return (
        <MultiWithCreatable
          value={item?.value || []}
          callbackfn={handleTypeChange}
        />
      );
    }
  }
  return (
    <div className={styles.action_delete}>
      <div>
        <div className={styles.arrow_wrapper}>
          <Select
            options={ticketFields?.map((info) => {
              return { ...info, value: info.key };
            })}
            placeholder="key"
            className={styles.condition_select1}
            onChange={(e) => {
              item.operator = "";
              setFieldType(e.field_type);
              handleTypeChange("key", e.value);
              setChoices(e?.choices || []);
            }}
            value={ticketFields?.filter((info) => info.key == item?.key)}
            required
          />

          <Select
            options={constantsMapping?.operator_choices?.filter((info) => {
              return constantsMapping?.field_opertaor_mapping?.[
                fieldType
              ]?.includes(info.value);
            })}
            placeholder="Operator"
            className={styles.condition_select2}
            value={constantsMapping?.operator_choices?.filter(
              (info) => info.value == item?.operator
            )}
            required
            onChange={(e) => handleTypeChange("operator", e.value)}
          />
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

        {!hide && item?.operator ? (
          <div className={styles.condition_item2}>
            {renderComponentSwitch()}
          </div>
        ) : null}

        {conditions?.property_cluster?.length == 1 && idx == 0
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
  );
}

export default ConditionRender;
