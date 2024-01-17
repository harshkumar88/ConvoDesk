import React, { useState } from "react";

function TabBar(props) {
  const { tabs, styles, sub_title } = props;
  const [active, setActive] = useState(tabs.length > 0 ? tabs[0].title : "");

  return (
    <div className={styles.tab_container}>
      {tabs?.map(function (item, idx) {
        return (
          <button
            style={item?.hidden ? { visibility: "hidden" } : {}}
            className={
              active === item.title
                ? `${styles.tab} ${styles.active}`
                : styles.tab
            }
            onClick={function (e) {
              if (sub_title) {
                item?.callbackfn(item?.execute?.value);
              }
              e.preventDefault();
              setActive(item.title);
              item?.execute?.func(item?.execute?.value);
            }}
            key={idx}
          >
            {sub_title ? (
              <div className={styles.icon_container}>
                <img src={item.icon} />
                <div className={styles.text_container}>
                  <span className={styles.title}>{item?.title}</span>
                  <span className={styles.sub_title}>{item?.sub_title}</span>
                </div>
              </div>
            ) : (
              item.title
            )}
            {item.value && item?.value !== "" ? `(${item.value})` : ""}
          </button>
        );
      })}
    </div>
  );
}

export default TabBar;
