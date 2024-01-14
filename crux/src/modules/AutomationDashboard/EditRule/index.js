import React, { useContext, useEffect, useState } from "react";
import styles from "../NewRule/css/style.module.css";
import Actions from "../NewRule/Components/Actions";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../App";
import ConditionList from "../NewRule/Components/ConditionList";
import EventList from "../NewRule/Components/EventList";
function EditRule() {
  const appContext = useContext(AppContext);
  const [conditions, setConditions] = useState({
    match_type: "any",
    properties: [{}],
  });
  const [event, setEvent] = useState({
    match_type: "any",
    properties: [{}],
  });
  const [countEvents, setCountEvents] = useState([1]);
  const [actions, setActions] = useState([]);
  const [key, setKey] = useState(0);
  const [error, setError] = useState(false);
  const { type } = useParams();
  const [payload, setPayload] = useState({});
  const [filterType, setFilterType] = useState("or");
  const [countConditions, setCountConditions] = useState([1]);
  useEffect(() => {
    let automationData = JSON.parse(localStorage.getItem("automation", {}));
    setPayload(automationData);
    let uuid = key;
    let actionData = automationData?.actions;
    let filterActionData = actionData?.map((item) => {
      uuid++;
      return { ...item, uid: uuid };
    });
    setKey(uuid);
    setActions(filterActionData);
    setConditions(automationData?.condition);
    setEvent(automationData?.event);
    setFilterType(automationData?.condition_type);
    if (automationData?.conditions?.length > 1) {
      setCountConditions([...countConditions, 2]);
    }
  }, []);

  function handleActionValidation() {
    if (actions.length == 0) {
      return true;
    }
    for (let i = 0; i < actions.length; i++) {
      let item = actions[i];
      if (item?.type == "property") {
        if (!item.property || !item.property.value || !item.property.key) {
          return false;
        }
      } else if (item?.type == "webhook") {
        if (
          !item.webhook ||
          !item.webhook.method ||
          !item.webhook.headers ||
          !item.webhook.body ||
          !item.webhook.params
        ) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }
  function handleAddAction() {
    let checkAction = handleActionValidation();
    if (!checkAction) {
      return;
    }
    let uuid = key;
    setActions([...actions, { uid: uuid + 1 }]);
    setKey(uuid + 1);
  }

  function handleAddConditionValidation(data) {
    if (!data.match_type) {
      return false;
    }
    for (let i = 0; i < data?.properties?.length; i++) {
      let info = data?.properties[i];

      if (!info.operator || !info.key || !info.value) {
        return false;
      }
    }
    return true;
  }

  function handleAddEventValidation(data) {
    if (!data.match_type) {
      return false;
    }
    for (let i = 0; i < data?.properties?.length; i++) {
      let info = data?.properties[i];
      if (!info.key || !info.old_value || !info.new_value) {
        return false;
      }
    }
    return true;
  }
  function handleAddCondition(idx, matchType) {
    let info = conditions;
    let checkAction = handleAddConditionValidation(info);
    if (!checkAction) {
      return;
    }
    info = { match_type: matchType, properties: [...info.properties, {}] };
    let data = conditions;
    data = info;
    setConditions({ ...data });
  }

  function handleEventData(type) {
    console.log("update");
    let info = event;
    info = { ...info, match_type: type };
    setEvent({ ...info });
  }

  function handleAddEvent(idx, matchType) {
    let info = event;

    let checkAction = handleAddEventValidation(info);
    if (!checkAction) {
      return;
    }
    info = { match_type: matchType, properties: [...info.properties, {}] };
    setEvent({ ...info });
  }
  function handleAddCondition(idx, matchType) {
    let info = conditions;
    let checkAction = handleAddConditionValidation(info);
    if (!checkAction) {
      return;
    }
    info = { match_type: matchType, properties: [...info.properties, {}] };
    setConditions({ ...info });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // let checkAction =
    //   handleActionValidation() && handleAddConditionValidation();
    // if (!checkAction) {
    //   appContext.setAlert("please fill all fields", "alert_error");
    //   return;
    // }

    let finalPayload = {
      ...payload,
      actions: actions,
      condition: conditions,
      event: event,
    };
    setPayload({
      ...payload,
      actions: actions,
      condition: conditions,
      event: event,
    });
    localStorage.setItem("automation", JSON.stringify(finalPayload));
    console.log(finalPayload, "final data");
  }

  function handleAddFilter() {
    let checkAction = handleAddConditionValidation(conditions[0]);
    if (!checkAction) {
      setError(true);
      appContext.setAlert("error", "alert_error");
      return;
    }
    setCountConditions([...countConditions, 2]);
    setConditions({ ...conditions, match_type: "any", properties: [{}] });
  }
  function handleConditionData(type, idx) {
    let info = conditions;
    info = { ...info, match_type: type };
    setConditions({ ...info });
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <span className={styles.header_rule_label}>Edit rule for:</span>
        <h2 className={styles.ticket_heading}>Ticket {type}</h2>
      </div>
      <div className={styles.header_label}>
        <label>Rule name</label>
        <input
          type="text"
          placeholder="Enter rule name"
          className={styles.header_label_input}
          value={payload?.name}
          name="name"
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
        />
      </div>

      {type == "update" && (
        <div className={styles.header_label}>
          <label>Involves any of these events:</label>{" "}
          {countEvents?.map((item, idx) => {
            return (
              <React.Fragment key={idx}>
                <EventList
                  handleEventData={handleEventData}
                  handleAddEvent={handleAddEvent}
                  event={event}
                  setEvent={setEvent}
                  countIndex={idx}
                  error={error}
                />
                {/* {item == 1 && (
                <div className={styles.add_filter}>
                  {countConditions.length == 1 ? (
                    <p
                      className={styles.add_filter_label}
                      onClick={handleAddFilter}
                    >
                      <span className={styles.plus_icon}>+</span>
                      Add new filter
                    </p>
                  ) : (
                    <p className={styles.add_filter_label2}>
                      <div className={styles.line}>
                        - - - -
                        <span style={{ visibility: "hidden" }}>- - - </span>- -
                        -
                      </div>
                      <span className={styles.filter_type}>
                        {" "}
                        <span
                          className={
                            filterType == "and"
                              ? `${styles.operator_item} ${styles.active_operator}`
                              : styles.operator_item
                          }
                          onClick={() => {
                            setFilterType("and");
                            setPayload({ ...payload, condition_type: "and" });
                          }}
                        >
                          AND
                        </span>
                        <span
                          className={
                            filterType == "or"
                              ? `${styles.operator_item} ${styles.active_operator}`
                              : styles.operator_item
                          }
                          onClick={() => {
                            setFilterType("or");
                            setPayload({ ...payload, condition_type: "or" });
                          }}
                        >
                          OR
                        </span>
                      </span>
                    </p>
                  )}
                </div>
              )} */}
              </React.Fragment>
            );
          })}
        </div>
      )}
      <div className={styles.header_label}>
        <label>On tickets with these properties:</label>
        {countConditions?.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <ConditionList
                handleConditionData={handleConditionData}
                handleAddCondition={handleAddCondition}
                conditions={conditions}
                setConditions={setConditions}
                countIndex={idx}
              />
              {/* {item == 1 && (
                <div className={styles.add_filter}>
                  {countConditions.length == 1 ? (
                    <p
                      className={styles.add_filter_label}
                      onClick={handleAddFilter}
                    >
                      <span className={styles.plus_icon}>+</span>
                      Add new filter
                    </p>
                  ) : (
                    <p className={styles.add_filter_label2}>
                      <div className={styles.line}>
                        - - - -
                        <span style={{ visibility: "hidden" }}>- - - </span>- -
                        -
                      </div>
                      <span className={styles.filter_type}>
                        {" "}
                        <span
                          className={
                            filterType == "and"
                              ? `${styles.operator_item} ${styles.active_operator}`
                              : styles.operator_item
                          }
                          onClick={() => {
                            setFilterType("and");
                            setPayload({ ...payload, condition_type: "and" });
                          }}
                        >
                          AND
                        </span>
                        <span
                          className={
                            filterType == "or"
                              ? `${styles.operator_item} ${styles.active_operator}`
                              : styles.operator_item
                          }
                          onClick={() => {
                            setFilterType("or");
                            setPayload({ ...payload, condition_type: "or" });
                          }}
                        >
                          OR
                        </span>
                      </span>
                    </p>
                  )}
                </div>
              )} */}
            </React.Fragment>
          );
        })}
      </div>
      <div className={styles.header_label}>
        <label>Perform these actions:</label>
        <div className={styles.condition_container}>
          <div>
            {actions?.map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  <Actions
                    item={item}
                    actions={actions}
                    idx={idx}
                    setActions={setActions}
                  />
                </React.Fragment>
              );
            })}
          </div>
          <div className={styles.condition_item3}>
            <button
              className={styles.new_condition_add}
              onClick={handleAddAction}
              type="button"
            >
              <span className={styles.plus_icon}>+</span>
              Add new action
            </button>
          </div>
        </div>
      </div>
      <div className={styles.border_bottom_line}></div>
      <div className={styles.save_btn}>
        <button className={styles.preview_btn}>Preview and save</button>
        <button className={styles.cancel_btn} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditRule;