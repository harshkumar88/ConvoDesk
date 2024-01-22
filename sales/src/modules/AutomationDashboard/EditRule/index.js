import React, { useContext, useEffect, useState } from "react";
import styles from "../NewRule/css/style.module.css";
import Actions from "../NewRule/Components/Actions";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../App";
import ConditionList from "../NewRule/Components/ConditionList";
import EventList from "../NewRule/Components/EventList";
import {
  get_data,
  patch_data,
  post_data,
} from "../../../ReactLib/networkhandler";
import { getTicketFields } from "../NewRule/Components/Constants";
function EditRule() {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [automationData, setAutomationData] = useState([]);
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
  const [payload, setPayload] = useState({});
  const [filterType, setFilterType] = useState("or");
  const [countConditions, setCountConditions] = useState([1]);

  useEffect(() => {
    fetchTicketConstants();
    fetchAutomationData();
  }, [appContext.reload]);

  async function fetchTicketConstants() {
    const automation_data = await getTicketFields();
    setAutomationData(automation_data);
  }

  async function fetchAutomationData() {
    const data = await get_data(
      `https://qa1.crofarm.com/convo/automation/${id}/v1/`,
      appContext
    );

    let automationData = data?.data;
    setPayload(data?.data);
    let uuid = key;
    let actionData = automationData?.actions;
    let filterActionData = actionData?.map((item) => {
      uuid++;
      if (item?.webhook && item?.properties) {
        return { ...item, type: item?.type, uid: uuid };
      } else if (item?.webhook) {
        return { webhook: item?.webhook, type: item?.type, uid: uuid };
      } else {
        return { properties: item?.properties, type: item?.type, uid: uuid };
      }
    });
    setKey(uuid);
    setActions(filterActionData);
    setConditions(automationData?.conditions);
    setEvent(automationData?.events);
    setFilterType(automationData?.condition_type);
    if (automationData?.conditions?.length > 1) {
      setCountConditions([...countConditions, 2]);
    }
  }

  function handleActionValidation() {
    if (actions?.length == 0) {
      return true;
    }
    for (let i = 0; i < actions?.length; i++) {
      let item = actions[i];
      if (item?.type == "property") {
        if (
          !item.properties ||
          !item.properties.value ||
          !item.properties.key
        ) {
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
    // let checkAction = handleActionValidation();
    // if (!checkAction) {
    //   return;
    // }
    let uuid = key;
    setActions([...actions, { uid: uuid + 1 }]);
    setKey(uuid + 1);
  }

  function handleAddConditionValidation(data) {
    if (!data?.match_type) {
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

  function handleEventData(type) {
    console.log("update");
    let info = event;
    info = { ...info, match_type: type };
    setEvent({ ...info });
  }

  function handleAddEvent(idx, matchType) {
    let info = event;

    // let checkAction = handleAddEventValidation(info);
    // if (!checkAction) {
    //   return;
    // }
    info = { match_type: matchType, properties: [...info.properties, {}] };
    setEvent({ ...info });
  }
  function handleAddCondition(idx, matchType) {
    let info = conditions;
    // let checkAction = handleAddConditionValidation(info);
    // if (!checkAction) {
    //   return;
    // }
    info = { match_type: matchType, properties: [...info.properties, {}] };
    setConditions({ ...info });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let finalPayload = {
      name: payload?.name,
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
    handleAutomationUpdate(finalData);
  }
  async function handleAutomationUpdate(ticket_payload) {
    const data = await patch_data(
      `https://qa1.crofarm.com/convo/automation/${id}/v1/`,
      ticket_payload,
      appContext,
      true
    );
    localStorage.setItem("automation", JSON.stringify(ticket_payload));

    navigate("/workflows/automation/dashboard");
  }

  // function handleAddFilter() {
  //   let checkAction = handleAddConditionValidation(conditions[0]);
  //   if (!checkAction) {
  //     setError(true);
  //     appContext.setAlert("error", "alert_error");
  //     return;
  //   }
  //   setCountConditions([...countConditions, 2]);
  //   setConditions({ ...conditions, match_type: "any", properties: [{}] });
  // }

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
                  edit={true}
                />
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
                automationData={automationData}
                edit={true}
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
                    edit={true}
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
