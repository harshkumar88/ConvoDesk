import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./style.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import List from "./components/List";
import Filter from "./components/Filter";
import { AppContext } from "../../../App";
import { get_data, post_data } from "../../../ReactLib/networkhandler";
import { API_URL } from "../../../config";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDate } from "../../../utils/utility";

function Conversation() {
  const appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [next, setNext] = useState(true);
  let [page, setPage] = useState(1);
  let [details, setDetails] = useState({});
  let [selectedDate, setSelectedDate] = useState({
    from_slot: formatDate(new Date()),
    to_slot: formatDate(new Date()),
  });

  let [query, setQuery] = useState("");
  let [selectedFilter, setSelectedFilter] = useState({
    status: "O",
    n_slot_id: [formatDate(new Date()), formatDate(new Date())],
  });

  const scrollableDivRef = useRef(null);

  const handleScroll = () => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableDiv;
      const scrollPosition = scrollTop + clientHeight;
      const maxHeight = 800 * window.innerHeight; // Calculate the height in pixels based on 800vh

      if (scrollPosition >= maxHeight && next) {
        // When the scroll position reaches 800vh and there is more data to load, call fetchMoreData
        fetchMoreData();
      }
    }
  };

  let filter_dict = {
    status: "key",
    n_slot_id: "range",
  };

  useEffect(() => {
    if (query != "") {
      get_data(
        `${API_URL}/hook/conversation/search/v1/?query_str=${query}&page=1`,
        appContext
      ).then(function (data) {
        setDetails(data.data);
        setNext(data?.has_next);
        setPage(data?.page);
      });
    } else {
      post_data(
        `${API_URL}/hook/agent/conversation/v1/`,
        {
          filters: Object.entries(selectedFilter).map(function (item) {
            return {
              key: item[0],
              value: item[1],
              type: filter_dict[item[0]],
            };
          }),
          page: 1,
        },
        appContext
      ).then(function (data) {
        setDetails(data?.data);
        setNext(data?.has_next);
        setPage(data?.page);
        setLoader(false);
      });
    }
  }, [query, selectedFilter]);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      const { scrollHeight, clientHeight } = scrollableDiv;

      // Check if content doesn't cover the whole height and there is more data to load
      if (scrollHeight <= clientHeight && next) {
        fetchMoreData();
      }
    }
  });

  function fetchMoreData() {
    if (query != "") {
      get_data(
        `${API_URL}/hook/conversation/search/v1/?query_str=${query}&page=${page}`,
        appContext
      ).then(function (data) {
        setDetails(details.concat(data.data));
        setNext(data?.has_next);
        setPage(data?.page);
      });
    } else {
      post_data(
        `${API_URL}/hook/agent/conversation/v1/`,
        {
          filters: Object.entries(selectedFilter).map(function (item) {
            return {
              key: item[0],
              value: item[1],
              type: filter_dict[item[0]],
            };
          }),
          page: page,
        },
        appContext
      ).then(function (data) {
        setDetails(details.concat(data.data));
        setNext(data?.has_next);
        setPage(data?.page);
      });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.conversation_wrapper}>
          <div className={styles.header}>
            <h2 className={styles.heading}>Conversation List</h2>
            <p className={styles.p}>
              View all the messages exchanged between your customers and your
              bot in real-time. Use filters and deep dive into these
              conversations as necessary.
            </p>

            <div className={styles.search_bar}>
              <AiOutlineSearch className={styles.search_icon} />
              <input
                type="text"
                className={styles.search}
                placeholder="Select By Conversation ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.conversation_header}>
            <div className={styles.conversation_heading}>Conversation ID</div>
            <div className={styles.conversation_heading}>Customer Name</div>
            <div className={styles.conversation_heading}>Time</div>
            <div className={styles.conversation_heading}>Status</div>
          </div>
          {loader ? (
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          ) : (
            <div
              id="scrollableDiv"
              className={styles.scroll_div}
              ref={scrollableDivRef}
              onScroll={handleScroll}
            >
              <InfiniteScroll
                dataLength={Object.keys(details).length !== 0 && details.length}
                pageStart={1}
                scrollableTarget="scrollableDiv"
                next={fetchMoreData}
                hasMore={next}
                loader={<h4 style={{ textAlign: "center" }}>Loading ... </h4>}
                endMessage={
                  details.length > 0 ? (
                    <p style={{ textAlign: "center", padding: "2vh 0" }}>
                      <b>Yay! You have seen all conversations !!</b>
                    </p>
                  ) : (
                    <></>
                  )
                }
              >
                {details?.length !== 0 ? (
                  <div>
                    {details?.map(function (item, index) {
                      return <List item={item} />;
                    })}
                  </div>
                ) : (
                  <p style={{ textAlign: "center", padding: "2vh 0" }}>
                    <b>No conversations found !!</b>
                  </p>
                )}
              </InfiniteScroll>
            </div>
          )}
        </div>
        <div className={styles.filter_container}>
          <Filter
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setQuery={setQuery}
          />
        </div>
      </div>
    </div>
  );
}
export default Conversation;
