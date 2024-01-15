import React, { useContext, useState, useEffect } from "react";
import styles from "./css/style.module.css";
import SideBar from "./components/SideBar";
import Flow from "./components/Flow";
import { AppContext } from "../../App";
import { get_data } from "../../ReactLib/networkhandler";
import { API_URL } from "../../config";
import Condition from "./components/Conditions";

function Home() {
  const [flows, setFlows] = useState([]);
  const [dialogues, setDialogues] = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [properties, setProperties] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [load, setLoad] = useState(true);
  const [activeFlow, setActiveFlow] = useState({});
  const [active, setActive] = useState(false);
  let [activeDialogue, setActiveDialogue] = useState(0);
  const appContext = useContext(AppContext);

  useEffect(
    function () {
      setWebhooks(appContext.webhooks);
      setProperties(appContext.properties);
      setFlows(appContext.flows);
      setGroups(appContext.groups);
    },
    [
      appContext.reload,
      appContext.flows,
      appContext.properties,
      appContext.webhooks,
      appContext.groups,
    ]
  );
  useEffect(
    function () {
      get_active_flow();
    },
    [flows]
  );

  useEffect(() => {
    if (!(activeFlow && activeFlow?.id)) {
      return;
    }
    setLoad(true);
    get_dialogues();
  }, [activeFlow, appContext.reload]);

  function get_active_flow() {
    if (activeFlow && activeFlow.id) {
      return;
    }
    if (flows.length > 0) {
      setActiveFlow(flows[0]);
    }
  }
  function get_dialogues() {
    get_data(
      `${API_URL}/neon/dialogue/v1/?flow_id=${activeFlow?.id}`,
      appContext
    ).then(function (data) {
      setDialogues(data?.data);
      setLoad(false);
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar_container}>
        <SideBar
          flows={flows}
          dialogues={dialogues}
          activeFlow={activeFlow}
          setActiveFlow={setActiveFlow}
        />
      </div>

      {load ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className={styles.flow_container}>
          <div className={styles.flow} id="crofarm_bot">
            <Flow
              flows={flows}
              dialogues={dialogues}
              setDialogues={setDialogues}
              activeFlow={activeFlow}
              setActiveDialogue={setActiveDialogue}
              webhooks={webhooks}
              groups={groups}
              properties={properties}
              setActive={setActive}
              setConditions={setConditions}
            />
          </div>
          {active && (
            <div className={styles.condition}>
              <Condition
                setActive={setActive}
                conditions={conditions}
                setConditions={setConditions}
                dialogues={appContext.dialogues}
                activeDialogue={activeDialogue}
                appContext={appContext}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
