import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import Ticket from "./components/Ticket";
import { AppContext } from "../../../../App";
import {
  get_data,
  post_data_without_reload,
} from "../../../../ReactLib/networkhandler";
import { API_URL } from "../../../../config";
import { NavLink } from "react-router-dom";

function UserActivity({ user_id, ticket_id, data }) {
  const appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [user, setUser] = useState({});
  let [tickets, setTickets] = useState([]);

  // useEffect(
  //   function () {
  //     if (user_id) {
  //       get_user_details();
  //       get_user_tickets();
  //     }
  //   },
  //   [appContext.reload, ticket_id, data.phone]
  // );
  useEffect(() => {
    if (user_id) {
      const fetchData = async () => {
        try {
          setLoader(true); // Set loader to true before making API calls
          await Promise.all([get_user_details(), get_user_tickets()]);
        } finally {
          setLoader(false); // Set loader to false after API calls complete
        }
      };
      fetchData();
    }
  }, [user_id, appContext.reload, ticket_id, data.phone]);

  async function get_user_details() {
    const response = await get_data(
      `${API_URL}/crux/users/details/v1/?user_id=${user_id}`,
      appContext
    );

    if (response && response.data) {
      setUser(response.data);
    }
  }

  async function get_user_tickets() {
    const response = await post_data_without_reload(
      `${API_URL}/crux/ticket/v1/?page=1`,
      {
        filters: [{ user_id: parseInt(user_id) }],
        page: 1,
      },
      appContext
    );

    if (response && response.data) {
      setTickets(response.data);
    }
  }

  function get_user_details() {
    get_data(
      `${API_URL}/crux/users/details/v1/?user_id=${user_id}`,
      appContext
    ).then(function (data) {
      if (data) {
        setUser(data.data);
        setLoader(false);
      }
    });
  }
  function get_user_tickets() {
    post_data_without_reload(
      `${API_URL}/crux/ticket/v1/?page=1`,
      {
        filters: [{ user_id: parseInt(user_id) }],
        page: 1,
      },
      appContext
    ).then(function (data) {
      if (data) {
        setLoader(false);
        setTickets(data.data);
        console.log("hii", data.data);
      }
    });
  }

  return (
    <div className={styles.home}>
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.user}>
            <div className={styles.user_details}>
              <b className={styles.heading}>Details</b>
              <div className={styles.user_info}>
                <b>{user.name ? user.name : "-"}</b>
              </div>
              <div className={styles.user_info}>
                <p>Work Phone</p>

                <NavLink to={`/user/details/${user.id}`}>{user.phone}</NavLink>
              </div>
              <div className={styles.user_info}>
                <p>Email</p>
                <b>{user.email ? user.email : "-"}</b>
              </div>
            </div>
          </div>
          <div className={styles.tickets} id="scrollableDiv">
            {tickets.length > 0 ? (
              tickets.slice(0, 5).map(function (item, idx) {
                return <Ticket data={item} key={idx} />;
              })
            ) : (
              <p style={{ textAlign: "center" }}>
                <b>No ticket found of this user!!</b>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserActivity;
