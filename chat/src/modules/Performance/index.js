import React, { useContext, useState, createContext, useEffect } from "react";
import Groups from "./components/Groups";
import { AppContext } from "../../App";
import Download from "./components/Download";
import styles from "./css/style.module.css";
import TabBarLayout from "./components/TabBarLayout";

const PerformanceContext = createContext();
function Performance() {
  const appContext = useContext(AppContext);
  let [groupDetails, setGroupDetails] = useState([]);
  let value = { groupDetails, setGroupDetails };
  let [tab, setTab] = useState(false);
  let [date, setDate] = useState("");
  let [nslotId, setNSlotId] = useState("");
  const tabBarContext = { setTab };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear().toString();
    let yy = today.getFullYear().toString().substr(2);
    let month = (today.getMonth() + 1).toString().padStart(2, "0");
    let day = today.getDate().toString().padStart(2, "0");
    setDate(`${year}-${month}-${day}`);
    setNSlotId(`${yy}${month}${day}`);
  }, []);
  return (
    <PerformanceContext.Provider value={value}>
      <div>
        <div className={styles.header}>
          <h2>Performance</h2>
          <div className={styles.tabbar_container}>
            <TabBarLayout tabBarContext={tabBarContext} />
          </div>

          <div>
            <input
              type="date"
              value={date}
              className={styles.input}
              onChange={function (e) {
                let date = e.target.value;
                setDate(e.target.value);
                setNSlotId(date.split("-").join("").substr(2));
              }}
              required
            />
          </div>

          <Download date={date} />
        </div>
        <Groups filters={appContext.filters} tab={tab} nslotId={nslotId} />
      </div>
    </PerformanceContext.Provider>
  );
}

export default Performance;
export { PerformanceContext };
