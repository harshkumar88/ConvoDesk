import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../App";
import { API_URL } from "../../config";
import { get_data } from "../../networkHandler";
import WebhookData from "./components/WebhookData";
import styles from "./css/style.module.css";
function Webhook() {
  const appContext = useContext(AppContext);
  appContext.setPage("api library");
  let [data, setData] = useState([]);
  let [load, setLoad] = useState(false);
  useEffect(
    function () {
      setLoad(true);
      get_data(`${API_URL}/neon/webhook/v1/`, appContext)
        .then(function (data) {
          console.log(data?.data);
          setData(data?.data);
          let arr = [];
          data?.data?.map(function (item, idx) {
            arr.push(item);
          });
          console.log("item", arr);
          setLoad(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoad(false);
        });
    },
    [appContext.reload]
  );
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles.heading}>API Library</h2>
          <p className={styles.text}>
            Integrate your bot with your favorite apps through APIs to push and
            fetch data dynamically.
          </p>
        </div>
        <NavLink to="/webhook/create" className={styles.create_btn}>
          New API
        </NavLink>
      </div>

      {load ? "" : <WebhookData data={data} />}
    </div>
  );
}
export default Webhook;
