import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Ticket from "./components/Ticket";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import {
  get_data,
  post_data_without_reload,
} from "../../../../React-lib/src/networkhandler";

function UserDetails() {
  const appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [page, setPage] = useState(1);
  let [next, setNext] = useState(true);
  let [user, setUser] = useState({});
  let [tickets, setTickets] = useState([]);
  const { user_id } = useParams();
  let navigate = useNavigate();
  useEffect(
    function () {
      appContext.setTitle(`User Details`);
      appContext.setPage("user details");
      const isValidInteger = /^\d+$/.test(user_id);
      if (!isValidInteger) {
        navigate("/home");
        return;
      }
      if (user_id) {
        get_user_details();
        get_user_tickets();
      }
    },
    [appContext.reload, user_id, navigate]
  );
  function get_user_details() {
    setNext(true);

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
    setNext(true);

    post_data_without_reload(
      `${API_URL}/crux/ticket/v1/?page=1`,
      {
        filters: [{ user_id: parseInt(user_id) }],
        page: 1,
      },
      appContext
    ).then(function (data) {
      if (data) {
        setNext(data?.has_next);
        setTickets(data.data);
        setPage(data?.page);
      }
    });
  }

  return (
    <div className={styles.home}>
      {/* <Navbar
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        groups={groups}
        agents={agents}
        select={select}
        setSelect={setSelect}
        allSelected={allSelected}
        setAllSelected={setAllSelected}
        tickets={tickets}
        setTickets={setTickets}
        order={order}
        setOrder={setOrder}
      /> */}
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.tickets} id="scrollableDiv">
            <InfiniteScroll
              dataLength={tickets.length}
              pageStart={1}
              scrollableTarget="scrollableDiv"
              next={function () {
                post_data_without_reload(
                  `${API_URL}/crux/ticket/v1/`,
                  {
                    filters: [{ user_id: user_id }],
                    page: page,
                  },
                  appContext
                ).then(function (data) {
                  if (data) {
                    setTickets(tickets.concat(data.data));
                    setNext(data?.has_next);
                    setPage(data?.page);
                  }
                });
              }}
              hasMore={next}
              loader={<h4 style={{ textAlign: "center" }}>Loading ... </h4>}
              endMessage={
                tickets.length > 0 ? (
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen all tickets !!</b>
                  </p>
                ) : (
                  <></>
                )
              }
            >
              {tickets.length > 0 ? (
                tickets.map(function (item, idx) {
                  return <Ticket data={item} key={idx} />;
                })
              ) : (
                <p style={{ textAlign: "center" }}>
                  <b>No ticket found of this user!!</b>
                </p>
              )}
            </InfiniteScroll>
          </div>
          <div className={styles.user}>
            <div className={styles.user_details}>
              <p className={styles.heading}>Details</p>
              <div className={styles.user_info}>
                <b>{user.name ? user.name : "-"}</b>
              </div>
              <div className={styles.user_info}>
                <p>Work Phone</p>
                <b>{user.phone}</b>
              </div>
              <div className={styles.user_info}>
                <p>Email</p>
                <b>{user.email ? user.email : "-"}</b>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
