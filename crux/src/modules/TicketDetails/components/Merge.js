import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import {
  post_data_without_reload,
  post_data,
} from "../../../React-lib/src/networkhandler";
import styles from "../css/merge.module.css";
import PopUp from "../../../utils/Popup";
import { API_URL } from "../../../config";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Ticket from "./Ticket";

function Merge({ ticket_id, user_id }) {
  let [close, setClose] = useState(false);
  let [selectedIds, setSelectedIds] = useState([]);
  let [tickets, setTickets] = useState([]);
  let [loader, setLoader] = useState(true);
  let [page, setPage] = useState(1);
  let [next, setNext] = useState(true);
  const appContext = useContext(AppContext);
  let [clickStates, setClickStates] = useState([]);

  useEffect(
    function () {
      setClose(false);
      setNext(true);
      setPage(1);
    },
    [appContext.reload]
  );
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
        setNext(data?.has_next);
        setTickets(data.data);
        setPage(data?.page);
      }
    });
  }

  useEffect(() => {
    setClickStates(tickets.map(() => false));
  }, [tickets]);

  function handleClick(itemId) {
    setClickStates((prevStates) => {
      const updatedStates = [...prevStates];
      const index = tickets.findIndex((item) => item.id === itemId);
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });

    setSelectedIds((prevIds) => {
      if (!prevIds.includes(itemId)) {
        return [...prevIds, itemId];
      } else {
        return prevIds.filter((id) => id !== itemId);
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let body = {
      ticket_id: parseInt(ticket_id),
      child_ticket_ids: selectedIds,
    };
    setClose(true);
    post_data(`${API_URL}/crux/ticket/merge/v1/`, body, appContext, true).then(
      function (data) {
        if (data) {
          setClose(true);
          console.log(data);
        }
      }
    );
  }

  return (
    <>
      <PopUp
        btnName={"Merge"}
        btnStyling="btn"
        closeState={close}
        handleOpen={get_user_tickets}
      >
        <h1 className={styles.heading}>Merge Ticket</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div
            className={styles.tickets}
            id="scrollableDiv"
            style={{ maxHeight: "300px", overflowY: "scroll" }}
          >
            {console.log("---", next, page)}
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
                tickets
                  .filter((item) => item.id !== parseInt(ticket_id))
                  .map(function (item, idx) {
                    const originalIndex = tickets.findIndex(
                      (ticket) => ticket.id === item.id
                    );
                    const isClicked = clickStates[originalIndex];
                    return (
                      <Ticket
                        item={item}
                        idx={idx}
                        handleClick={handleClick}
                        isClicked={isClicked}
                      />
                    );
                  })
              ) : (
                <p style={{ textAlign: "center" }}>
                  <b>No ticket found of this user!!</b>
                </p>
              )}
            </InfiniteScroll>
          </div>
          <div
            className={`${styles.input_container} ${styles.submit_container}`}
          >
            <input className="dark-btn" type="submit" />
          </div>
        </form>
      </PopUp>
    </>
  );
}

export default Merge;
