import React from "react";
import styles from "./css/style.module.css";
import SideItem from "./Components/SideItem";
function SideBar({ callbackfn }) {
  const sideData = [
    { label: "T", value: "Text", type: "text" },
    { label: "D", value: "Dropdown", type: "dropdown" },
    { label: "DF", value: "Dependent Fields", type: "dependent" },
    { label: "D", value: "Date", type: "date" },
    { label: "N", value: "Number", type: "number" },
  ];

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
