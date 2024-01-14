import React, { useContext } from "react";
import styles from "../css/style.module.css";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { delete_data } from "../../../React-lib/src/networkhandler";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";

function WebhookData({ data }) {
  const appContext = useContext(AppContext);
  function handleDelete(id) {
    delete_data(
      `${API_URL}/neon/webhook/v1/?webhook_id=${id}`,
      appContext,
      true
    );
  }
  const getMethodClass = `${styles.method} ${styles.getMethod}`;
  const postMethodClass = `${styles.method} ${styles.postMethod}`;
  const putMethodClass = `${styles.method} ${styles.putMethod}`;
  const deleteMethodClass = `${styles.method} ${styles.deleteMethod}`;
  return (
    <>
      {data?.map(function (item, idx) {
        let methodClass = getMethodClass;
        if (item?.method === "GET") {
          methodClass = getMethodClass;
        } else if (item?.method === "POST") {
          methodClass = postMethodClass;
        } else if (item?.method === "PUT") {
          methodClass = putMethodClass;
        } else if (item?.method === "DELETE") {
          methodClass = deleteMethodClass;
        }
        return (
          <div className={styles.list_container}>
            <NavLink to={`/webhook/update/${item?.id}`} className={styles.info}>
              <div>
                <p className={methodClass}>{item?.method}</p>
                <p className={styles.bold}>{item?.name}</p>
                <p>
                  Created: {item?.created_at} | Modified: {item?.updated_at}
                </p>
              </div>
            </NavLink>
            <div className={styles.icons_div}>
              <NavLink
                to={`/webhook/update/${item?.id}`}
                className={styles.icons}
              >
                <MdModeEditOutline />
              </NavLink>
              <MdDelete
                className={styles.icons}
                onClick={() => handleDelete(item?.id)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
export default WebhookData;
