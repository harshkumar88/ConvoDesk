import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import {
  get_data,
  post_data,
  post_data_without_reload,
} from "../../networkHandler";
import { API_URL } from "../../config";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "./components/Navbar";
import styles from "./css/style.module.css";
import Ticket from "./components/Ticket";
import Filter from "./components/Filter";
import { get_agent_groups, get_agent_id } from "../../auth";

function Home() {
  const appContext = useContext(AppContext);
  let { selectedFilter: filter, setSelectedFilter: setFilter } = appContext;

  let [loader, setLoader] = useState(true);
  let [page, setPage] = useState(1);
  let [next, setNext] = useState(true);
  let [showFilter, setShowFilter] = useState(true);
  // let [filter, setFilter] = useState({
  // });
  let [tickets, setTickets] = useState([]);
  let [groups, setGroups] = useState([]);
  let [data, setData] = useState({});
  let [agents, setAgents] = useState([]);
  let [select, setSelect] = useState(false);
  let [allSelected, setAllSelected] = useState(false);
  let [order, setOrder] = useState("-id");
  let [temp, setTemp] = useState(0);
  let [ticketCount, setTicketCount] = useState(0);
  useEffect(function () {
    appContext.setTitle("All Tickets");
    appContext.setPage("home");
    get_data(`${API_URL}/crux/group/v1/`, {}, appContext).then(function (data) {
      if (data) {
        setGroups(data.data);
      }
    });
    get_data(`${API_URL}/crux/all/agent/v1/`, {}, appContext).then(function (
      data
    ) {
      if (data) {
        setAgents(data.data);
      }
    });
    //check empty filter
    // if (Object.keys(filter).length === 0) {
    //   let filterData = localStorage.getItem("filter");
    //   console.log(filterData, filter, "313", JSON.parse(filterData));
    //   if (filterData) {
    //     setFilter(JSON.parse(filterData));
    //     console.log(filter);
    //     setTemp(Math.random());
    //   }
    // }
    // setFilter({
    //   ...filter,
    //   agent_id: get_agent_id(),
    //   group_id: get_agent_groups(),
    //   n_slot_id: new Date()
    //     .toLocaleDateString()
    //     .split("/")
    //     .reverse()
    //     .join("")
    //     .substr(2),
    //   status: ["P"],
    // });
    // setTemp(Math.round(Math.random() * 100000));
  }, []);
  function generateFormattedDate() {
    const date = new Date();
    const year = String(date.getFullYear()).substr(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  }

  useEffect(
    function () {
      setNext(true);
      const formattedDate = generateFormattedDate();
      post_data_without_reload(
        `${API_URL}/crux/ticket/v1/?page=1`,
        {
          filters: Object.entries(filter).map((item) => ({
            [item[0]]: item[1],
          })),
          order_by: order,
          page: 1,
        },
        appContext
      ).then(function (data) {
        if (data) {
          setData(data);
          setNext(data?.has_next);
          setTickets(
            data?.data.map(function (item, idx) {
              return { ...item, isChecked: false };
            })
          );
          setLoader(false);
          setPage(data?.page);
        }
      });
      post_data_without_reload(
        `${API_URL}/crux/ticket/count/v1/`,
        {
          filters: Object.entries(filter).map((item) => ({
            [item[0]]: item[1],
          })),
        },
        appContext
      ).then(function (data) {
        if (data) {
          setTicketCount(data?.data?.tickets_ct);
        }
      });
    },
    [appContext.reload, order, temp]
  );
  return (
    <div className={styles.home}>
      <Navbar
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
        ticketCount={ticketCount}
      />
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className={styles.ticket_container}>
          <div className={styles.ticket} id="scrollableDiv">
            <InfiniteScroll
              dataLength={tickets.length}
              pageStart={1}
              scrollableTarget="scrollableDiv"
              next={function () {
                post_data_without_reload(
                  `${API_URL}/crux/ticket/v1/`,
                  {
                    filters: Object.entries(filter).map((item) => ({
                      [item[0]]: item[1],
                    })),
                    order_by: order,
                    page: page,
                  },
                  appContext
                ).then(function (data) {
                  if (data) {
                    setTickets(
                      tickets.concat(
                        data?.data.map(function (item, idx) {
                          return { ...item, isChecked: false };
                        })
                      )
                    );
                    setAllSelected(false);
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
                  return (
                    <Ticket
                      item={item}
                      key={idx}
                      shortHandFilters={data.filters}
                      tickets={tickets}
                      setTickets={setTickets}
                      select={select}
                      setSelect={setSelect}
                      setAllSelected={setAllSelected}
                    />
                  );
                })
              ) : (
                <p style={{ textAlign: "center" }}>
                  <b>No tickets found !!</b>
                </p>
              )}
            </InfiniteScroll>
          </div>
          {showFilter && (
            <div className={styles.filter}>
              <Filter filter={filter} setFilter={setFilter} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
