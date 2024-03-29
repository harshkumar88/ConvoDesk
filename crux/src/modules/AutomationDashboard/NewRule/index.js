import React, { useContext, useEffect, useState } from "react";
import styles from "./css/style.module.css";
import Actions from "./Components/Actions";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../App";
import ConditionList from "./Components/ConditionList";
import EventList from "./Components/EventList";
import { post_data, get_data } from "../../../ReactLib/networkhandler";
import { getTicketFields } from "./Components/Constants";

function NewRule() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [automationData, setAutomationData] = useState([]);
  const [conditions, setConditions] = useState({
    match_type: "any",
    properties: [{}],
  });
  const [event, setEvent] = useState({
    match_type: "any",
    properties: [{}],
  });
  const [countEvents, setCountEvents] = useState([1]);
  const [error, setError] = useState(false);

  const [actions, setActions] = useState([]);
  const [key, setKey] = useState(0);
  const { type } = useParams();
  const [payload, setPayload] = useState({
    type: type,
    condition_type: "or",
  });
  // const [filterType, setFilterType] = useState("or");
  const [countConditions, setCountConditions] = useState([1]);
  useEffect(() => {
    fetchTicketConstants();
    handleAddAction();
  }, [appContext.reload]);

  async function fetchTicketConstants() {
    const automation_data = await getTicketFields();
    setAutomationData(automation_data);
  }
  //handling action validation
  function handleActionValidation() {
    if (actions.length == 0) {
      return true;
    }
    for (let i = 0; i < actions.length; i++) {
      let item = actions[i];
      if (item?.type == "property") {
        if (
          !item.properties ||
          !item.properties.value ||
          !item.properties.key
        ) {
          appContext.setAlert("fill previous action", "alert_error");
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
          appContext.setAlert("fill previous action", "alert_error");
          return false;
        }
      } else {
        appContext.setAlert("fill previous action", "alert_error");
        return false;
      }
    }
    return true;
  }

  //handling new action
  function handleAddAction() {
    // let checkAction = handleActionValidation();
    // if (!checkAction) {
    //   return;
    // }
    let uuid = key;
    setActions([...actions, { uid: uuid + 1 }]);
    setKey(uuid + 1);
  }

  //handling condition validation
  function handleAddConditionValidation(data) {
    if (!data.match_type) {
      return false;
    }
    for (let i = 0; i < data?.properties?.length; i++) {
      let info = data?.properties[i];

      if (!info.operator || !info.key || !info.value) {
        appContext.setAlert("fill previous condition", "alert_error");
        return false;
      }
    }
    return true;
  }

  //handling event validation
  function handleAddEventValidation(data) {
    if (!data.match_type) {
      return false;
    }
    for (let i = 0; i < data?.properties?.length; i++) {
      let info = data?.properties[i];
      if (!info.key || !info.old_value || !info.new_value) {
        appContext.setAlert("fill previous event", "alert_error");
        return false;
      }
    }
    return true;
  }

  //handling new condition
  function handleAddCondition(idx, matchType) {
    let info = conditions;
    // let checkAction = handleAddConditionValidation(info);
    // if (!checkAction) {
    //   return;
    // }
    info = { match_type: matchType, properties: [...info.properties, {}] };
    let data = conditions;
    data = info;
    setConditions({ ...data });
  }

  //handling new event
  function handleAddEvent(idx, matchType) {
    let info = event;

    // let checkAction = handleAddEventValidation(info);
    // if (!checkAction) {
    //   return;
    // }
    info = { match_type: matchType, properties: [...info.properties, {}] };

    setEvent({ ...info });
  }

  //handling rule submit
  function handleSubmit(e) {
    e.preventDefault();

    let finalPayload = {
      ...payload,
      actions: actions,
      conditions: conditions,
    };

    if (type == "updation") {
      finalPayload.events = event;
    }
    setPayload({
      ...finalPayload,
    });

    checkValidationErrors(finalPayload);
  }

  function cleanPayload(payload) {
    if (payload === null || payload === undefined) {
      return null;
    }

    if (Array.isArray(payload)) {
      return payload.map((item) => cleanPayload(item));
    }

    if (typeof payload === "object") {
      const cleanedObj = {};

      for (const key in payload) {
        const cleanedValue = cleanPayload(payload[key]);

        if (cleanedValue !== null) {
          cleanedObj[key] = cleanedValue;
        }
      }

      // Special handling for 'actions', 'conditions', and 'events'
      if (cleanedObj.actions) {
        cleanedObj.actions = cleanedObj.actions.map((action) =>
          cleanPayload(action)
        );
      }

      if (cleanedObj.conditions) {
        cleanedObj.conditions = cleanPayload(cleanedObj.conditions);
      }

      if (cleanedObj.events) {
        cleanedObj.events = cleanPayload(cleanedObj.events);
      }

      return Object.keys(cleanedObj).length > 0 ? cleanedObj : null;
    }

    return payload;
  }

  function checkValidationErrors(final_payload) {
    const finalData = cleanPayload(final_payload);
    console.log(finalData, "last dtaa");
    handleAutomationCreation(finalData);
  }

  async function handleAutomationCreation(ticket_payload) {
    const data = await post_data(
      `https://qa1.crofarm.com/convo/automation/v1/`,
      ticket_payload,
      appContext,
      true
    );
    localStorage.setItem("automation", JSON.stringify(ticket_payload));
    navigate("/workflows/automation/dashboard");
  }

  //handling new condition filter
  function handleAddFilter() {
    let checkAction = handleAddConditionValidation(conditions[0]);
    if (!checkAction) {
      setError(true);
      return;
    }
    setCountConditions([...countConditions, 2]);
    setConditions({ ...conditions, match_type: "any", properties: [{}] });
  }

  //handle match_type for condition
  function handleConditionData(type, idx) {
    let info = conditions;
    info = { ...info, match_type: type };
    setConditions({ ...info });
  }

  //handle match_type for event
  function handleEventData(type) {
    let info = event;
    info = { ...info, match_type: type };
    setEvent({ ...info });
  }

  useEffect(() => {
    setError(false);
  }, [conditions]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <span className={styles.header_rule_label}>New rule for:</span>
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

      {type == "updation" && (
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
                  automationData={automationData}
                  edit={false}
                />
              </React.Fragment>
            );
          })}
        </div>
      )}
      <div className={styles.header_label}>
        <label>Perform these Conditions:</label>{" "}
        {countConditions?.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <ConditionList
                handleConditionData={handleConditionData}
                handleAddCondition={handleAddCondition}
                conditions={conditions}
                setConditions={setConditions}
                countIndex={idx}
                error={error}
                automationData={automationData}
                edit={false}
              />
            </React.Fragment>
          );
        })}
      </div>

      <div className={styles.header_label}>
        <label>Perform these actions:</label>
        <div className={styles.condition_container}>
          <div className={styles.action_container}>
            {actions?.map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  <Actions
                    item={item}
                    actions={actions}
                    idx={idx}
                    setActions={setActions}
                    automationData={automationData}
                    edit={false}
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

export default NewRule;
