import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "./components/Detail";
import styles from "./style.module.css";
import { AppContext } from "../../../App";
import { get_data } from "../../../networkHandler";
import { API_URL } from "../../../config";
import InfiniteScroll from "react-infinite-scroll-component";
function ConversationActivity() {
  let { id } = useParams();
  const appContext = useContext(AppContext);
  let [userDetails, setUserDetails] = useState([]);
  let [page, setPage] = useState(1);
  let [next, setNext] = useState(true);

  useEffect(
    function () {
      get_data(
        `${API_URL}/neon/conversation/activity/v1/?conversation_id=${id}&page=1`,
        appContext
      ).then(function (data) {
        if (data) {
          setUserDetails(data.data);
          setNext(data?.has_next);
          setPage(data?.page);
        }
      });
    },
    [appContext.reload]
  );
  return (
    <div className={styles.container}>
      <div className={styles.main_container}>
        <div className={styles.wrapper}>
          <h2 className={styles.main_heading}>Conversation ID #{`${id}`}</h2>
          <div className={styles.header}>
            <span className={styles.heading}>Time</span>
            <span className={styles.heading}>Flow Name</span>
            <span className={styles.heading}>Dialogue ID</span>
            <span className={styles.heading}>Action</span>
            <span
              className={styles.heading}
              style={{ flex: "0.2", visibility: "hidden" }}
            >
              isPrivate
            </span>
          </div>
        </div>

        <InfiniteScroll
          dataLength={userDetails?.length}
          pageStart={1}
          scrollableTarget="scrollableDiv"
          next={function () {
            get_data(
              `${API_URL}/neon/conversation/activity/v1/?conversation_id=${id}&page=${page}`,
              appContext
            ).then(function (data) {
              if (data) {
                setUserDetails(userDetails.concat(data.data));
                setNext(data?.has_next);
                setPage(data?.page);
              }
            });
          }}
          hasMore={next}
          loader={<h4 style={{ textAlign: "center" }}>Loading ... </h4>}
          endMessage={
            userDetails.length > 0 ? (
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen all activity !!</b>
              </p>
            ) : (
              <></>
            )
          }
        >
          {userDetails?.length > 0 ? (
            userDetails?.map(function (item, idx) {
              return <Detail item={item} key={idx} />;
            })
          ) : (
            <p style={{ textAlign: "center" }}>
              <b>No activity found !!</b>
            </p>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
export default ConversationActivity;
