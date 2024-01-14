import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { NavLink } from "react-router-dom";

function Card(props) {
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    if (props?.links.length === 0) {
      setIsEmpty(true);
    }
  }, []);
  return (
    <div className={isEmpty ? styles.card_empty : styles.card}>
      <div className={styles.name}>{props?.name}</div>
      <ul className={styles.links}>
        {props?.links?.map((item, idx) => {
          return (
            <li key={idx}>
              {/* <a href={item?.link_target}>{item?.name}</a> */}
              <NavLink className={styles.link} to={item?.path}>
                <div className={styles.icon}>{item?.icon}</div>
                {item?.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Card;
