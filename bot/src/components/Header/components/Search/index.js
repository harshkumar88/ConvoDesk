import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { get_data } from "../../../../networkHandler";
import TabBar from "../../../TabBar";
import styles from "./style.module.css";

function Search(props) {
  // let [search, setSearch] = useState(false);
  const appContext = useContext(AppContext);
  let search = appContext.search;
  let setSearch = appContext.setSearch;
  let [txt, setTxt] = useState("");
  let [tickets, setTickets] = useState([]);
  let [users, setUsers] = useState([]);
  let [searchType, setSearchType] = useState("ticket");
  let [page, setPage] = useState(1);
  let [next, setNext] = useState(true);
  let [loader, setLoader] = useState(true);

  function handleChange(e) {
    setTxt(e.target.value);
  }
  useEffect(
    function () {
      setNext(true);
      searchType == "ticket"
        ? get_data(
            `${API_URL}/crux/ticket/search/v1/?query_str=${txt}&page=1`,
            appContext
          ).then(function (data) {
            if (data) {
              setTickets(data.data);
              setNext(data?.has_next);
              setLoader(false);
              setPage(data?.page);
            }
          })
        : get_data(
            `${API_URL}/crux/users/search/v1/?query_str=${txt}&page=1`,
            appContext
          ).then(function (data) {
            if (data) {
              setUsers(data.data);
              setNext(data?.has_next);
              setLoader(false);
              setPage(data?.page);
            }
          });
    },
    [txt, appContext.reload, searchType]
  );
  return !search ? (
    <input
      // className={props.className}
      className={styles.input}
      type="text"
      value={txt}
      onChange={handleChange}
      onFocus={function () {
        setSearch(true);
      }}
      placeholder="Search"
    />
  ) : (
    <div className={styles.search} ref={appContext.searchRef}>
      <input
        // className={props.className}
        className={styles.input}
        type="text"
        value={txt}
        onChange={handleChange}
        placeholder="Search"
      />

      <ul className={styles.ul} id="scrollableDiv">
        <TabBar
          tabs={[
            {
              title: "Tickets",
              execute: { func: setSearchType, value: "ticket" },
            },
            { title: "Users", execute: { func: setSearchType, value: "user" } },
          ]}
          styles={styles}
        />
        {searchType == "user" ? (
          <InfiniteScroll
            dataLength={users.length}
            pageStart={1}
            scrollableTarget="scrollableDiv"
            next={function () {
              get_data(
                `${API_URL}/crux/users/search/v1/?page=${page}&query_str=${txt}`,
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
                return (
                  <NavLink key={idx} to={`/user/details/${item.id}`}>
                    <b>{item.name ? item.name : "Crux User"}</b>
                    <br />
                    <p>{item.phone}</p>
                  </NavLink>
                );
              })
            ) : (
              <p style={{ textAlign: "center" }}>
                <b>No users found !!</b>
              </p>
            )}
          </InfiniteScroll>
        ) : (
          <InfiniteScroll
            dataLength={tickets.length}
            pageStart={1}
            scrollableTarget="scrollableDiv"
            next={function () {
              get_data(
                `${API_URL}/crux/ticket/search/v1/?page=${page}&query_str=${txt}`,
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
              users.length > 0 ? (
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
                return (
                  <NavLink key={idx} to={`/ticket/details/${item.id}`}>
                    <b>
                      {item.subject}&nbsp;#{item.id}
                    </b>
                    <br />
                    <p>{item.phone}</p>
                    {/* <p>Created on {item.n_slot_id}</p> */}
                  </NavLink>
                );
              })
            ) : (
              <p style={{ textAlign: "center" }}>
                <b>No ticket found !!</b>
              </p>
            )}
          </InfiniteScroll>
        )}
      </ul>
    </div>
  );
}

export default Search;
