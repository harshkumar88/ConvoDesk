import React, { useState, useEffect } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import EventIssueRender from "./EventIssueRender";
import IssueComponent from "./IssueComponent";
import EventBoolean from "./EventBoolean";
import EventText from "./EventText";
function Events({
  item,
  event,
  idx,
  selectedOption,
  setEvent,
  automationData,
}) {
  const [hover, setHover] = useState(false);
  const ticketOptions = [
    { label: "Ticket", value: "Tickets" },
    { label: "Creation", value: "Creation" },
  ];
  const [hide, setHide] = useState(false);
  const [fieldType, setFieldType] = useState("");
  const [constantsMapping, setConstantsMapping] = useState({});
  const [ticketFields, setTicketFields] = useState([]);
  const [issueId, setIssueId] = useState(0);
  const [subIssueId, setSubIssueId] = useState(0);
  const [issueChoices, setIssueChoices] = useState([]);
  const [subIssueChoices, setSubIssueChoices] = useState([]);
  const [furtherChoices, setFurtherChoices] = useState([]);
  const [loader, setLoader] = useState(true);

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

  function handleEventDelete() {
    let propertyData = event;
    let properyArr = propertyData.properties;
    properyArr.splice(idx, 1);
    propertyData.properties = properyArr;
    event = propertyData;
    setEvent({ ...event });
  }

  function handleTypeChange(label, value) {
    let data = { ...item, [label]: value };
    if (label == "old_value" || label == "new_value") {
      if (!data?.property) {
        data.property = { key: item.key };
      } else {
        data.property = { ...data.property, [label]: null };
      }
    }

    let conditionData = event;
    conditionData.properties[idx] = data;
    event = conditionData;
    setEvent({ ...event });
  }

  function RenderEventComponents() {
    if (fieldType == "dependent") {
      return (
        <IssueComponent
          issueChoices={issueChoices}
          subIssueChoices={subIssueChoices}
          furtherChoices={furtherChoices}
          setIssueId={setIssueId}
          setSubIssueId={setSubIssueId}
          item={item}
          handleTypeChange={handleTypeChange}
          event={event}
          setEvent={setEvent}
          automationData
          idx={idx}
        />
      );
    } else if (fieldType == "boolean") {
      return <EventBoolean item={item} callbackfn={handleTypeChange} />;
    } else if (fieldType == "integer") {
      return (
        <EventText item={item} callbackfn={handleTypeChange} number={true} />
      );
    } else {
      return <EventText item={item} callbackfn={handleTypeChange} />;
    }
  }
  return (
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
                <div className={styles.arrow_wrapper}>
                  <Select
                    options={ticketFields?.map((info) => {
                      return { ...info, value: info.key };
                    })}
                    placeholder="key"
                    className={styles.condition_select1}
                    onChange={(e) => {
                      item.old_value = null;
                      item.new_value = null;
                      setFieldType(e.field_type);
                      handleTypeChange("key", e.value);
                    }}
                    value={ticketFields?.filter(
                      (info) => info.key == item?.key
                    )}
                  />
                </div>
                {fieldType && (
                  <div className={styles.arrow_wrapper2}>
                    {" "}
                    {RenderEventComponents()}
                  </div>
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
        </div>
        {event?.properties?.length == 1 && idx == 0
          ? null
          : hover && (
              <span
                className={styles.delete_icon}
                onClick={() => handleEventDelete()}
              >
                <FaTrash />
              </span>
            )}
      </div>

      {event?.properties?.length > 1 && idx != 0 && (
        <span className={styles.operator}>{selectedOption}</span>
      )}
    </div>
  );
}

export default Events;
