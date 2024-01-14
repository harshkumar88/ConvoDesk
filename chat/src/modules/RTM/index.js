import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { get_data } from "../../React-lib/src/networkhandler";
import { API_URL } from "../../config";
import ChartGraph from "./components/Chart";
import styles from "../RTM/css/style.module.css";
import ConversationMetrics from "./components/ConversationMetrics";

function RTM() {
  const appContext = useContext(AppContext);
  let [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [info, setInfo] = useState({});

  useEffect(
    function () {
      appContext.setTitle("RTM Dashboard");
      setLoader(true);
      getData();
    },
    [appContext.reload]
  );

  const getData = () => {
    get_data(`${API_URL}/neon/conversation/metrics/v1/`, {}, appContext).then(
      function (data) {
        if (data) {
          const res = data.data["hour_wise"];
          setInfo(data.data["ct_dict"]);
          let arr = [];
          res.map((item) => {
            let key = Object.keys(item);
            let dict = {};
            dict["time"] = key;
            dict["Chat Count"] = item[key];
            arr.push(dict);
          });
          setData(arr);
          setLoader(false);
        }
      }
    );
  };

  return (
    <div className={styles.container}>
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <div className={styles.header}>
            <h2>RTM Dashboard</h2>
          </div>
          <div className={styles.graphContainer}>
            <div className={styles.graph}>
              <ConversationMetrics info={info} />
              <ChartGraph data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RTM;
