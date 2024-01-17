import React, { useEffect, useState } from "react";
import styles from "./css/style.module.css";
import SideItem from "./Components/SideItem";
import { fieldData } from "../Components/seed";
function SideBar({ callbackfn }) {
  const [sideData, setSideData] = useState([]);

  useEffect(() => {
    setSideData(fieldData);
  }, []);

  //call parent fxn to add new ticket
  function handleItem(item) {
    callbackfn(item);
  }
  return (
    <div className={styles.container}>
      <p className={styles.side_header}>Click on Any Field</p>
      <div className={styles.ticket_fields}>
        {sideData?.map((item, idx) => {
          return (
            <div key={idx} onClick={() => handleItem(item)}>
              <SideItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
