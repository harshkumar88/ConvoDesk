import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./style.module.css";
import UserInfo from "./components/UserInfo";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { get_data } from "../../../../ReactLib/networkhandler";

function User() {
  const appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [page, setPage] = useState(1);
  let [next, setNext] = useState(true);
  let [users, setUsers] = useState([]);

  useEffect(
    function () {
      appContext.setTitle("All users");
      appContext.setPage("users");
      get_all_users();
    },
    [appContext.reload]
  );

  function get_all_users() {
    setNext(true);

    get_data(`${API_URL}/crux/users/all/v1/?page=1`, appContext).then(function (
      data
    ) {
      if (data) {
        setNext(data?.has_next);
        setUsers(data.data);
        setLoader(false);
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
        <div className={styles.ticket_container}>
          <div className={styles.ticket}>
            <InfiniteScroll
              dataLength={users.length}
              pageStart={1}
              className="item-row-container"
              // scrollableTarget="scrollableDiv"
              next={function () {
                get_data(
                  `${API_URL}/crux/users/all/v1/?page=${page}`,
                  appContext
                ).then(function (data) {
                  if (data) {
                    setUsers(users.concat(data.data));
                    setNext(data?.has_next);
                    setPage(data?.page);
                  }
                });
              }}
              hasMore={next}
              loader={<h4 style={{ textAlign: "center" }}>Loading ... </h4>}
              endMessage={
                users.length > 0 ? (
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen all users !!</b>
                  </p>
                ) : (
                  <></>
                )
              }
            >
              {users.length > 0 ? (
                users.map(function (item, idx) {
                  return <UserInfo data={item} key={idx} />;
                })
              ) : (
                <p style={{ textAlign: "center" }}>
                  <b>No users found !!</b>
                </p>
              )}
            </InfiniteScroll>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
