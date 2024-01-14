import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../../App";
import styles from "./style.module.css";
import { API_URL } from "../../../../config";
import { get_data } from "../../../../networkHandler";
function Search(props) {
  const appContext = useContext(AppContext);
  let search = appContext.search;
  let setSearch = appContext.setSearch;
  let [txt, setTxt] = useState("");
  let [conversations, setConversations] = useState([]);
  let [page, setPage] = useState(1);
  let [next, setNext] = useState(true);
  let [loader, setLoader] = useState(true);
  function handleChange(e) {
    setTxt(e.target.value);
  }
  function handleClick() {
    setTxt("");
    setSearch(false);
  }
  useEffect(
    function () {
      setNext(true);
      get_data(
        `${API_URL}/hook/conversation/search/v1/?query_str=${txt}&page=1`,
        appContext
      ).then(function (data) {
        if (data) {
          setConversations(data.data);
          setNext(data?.has_next);
          setLoader(false);
          setPage(data?.page);
        }
      });
    },
    [txt]
  );
  return !search ? (
    <input
      className={styles.input}
      type="text"
      value={txt}
      onChange={handleChange}
      onFocus={function () {
        setSearch(true);
      }}
      placeholder="Search by number or ID"
    />
  ) : (
    <div className={styles.search} ref={appContext.searchRef}>
      <input
        className={styles.input}
        type="text"
        value={txt}
        onChange={function (e) {
          if (e.target.value.length > 10) {
            return false;
          }
          setTxt(e.target.value);
        }}
        placeholder="Search by number or ID"
      />
      <ul className={styles.ul} id="scrollableDiv">
        <InfiniteScroll
          dataLength={conversations.length}
          pageStart={1}
          scrollableTarget="scrollableDiv"
          next={function () {
            get_data(
              `${API_URL}/hook/conversation/search/v1/?page=${page}&query_str=${txt}`,
              appContext
            ).then(function (data) {
              if (data) {
                setConversations(conversations.concat(data.data));
                setNext(data?.has_next);
                setPage(data?.page);
              }
            });
          }}
          hasMore={next}
          loader={<h4 style={{ textAlign: "center" }}>Loading ... </h4>}
          endMessage={
            conversations.length > 0 ? (
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen all the conversations !!</b>
              </p>
            ) : (
              <></>
            )
          }
        >
          {conversations.length > 0 ? (
            conversations.map(function (item, idx) {
              return (
                <NavLink
                  key={idx}
                  to={`/conversation/details/${item.id}`}
                  onClick={handleClick}
                >
                  <b>
                    {item.name}&nbsp;#{item.id}
                  </b>
                  <br />
                  <p className={styles.row_div}>
                    <span>{item.phone}</span> <span>{item.created_at}</span>
                  </p>
                  <br />
                </NavLink>
              );
            })
          ) : (
            <p style={{ textAlign: "center" }}>
              <b>No conversation found !!</b>
            </p>
          )}
        </InfiniteScroll>
      </ul>
    </div>
  );
}

export default Search;
