import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import {
  get_data,
  post_data,
  post_data_without_reload,
} from "../../ReactLib/networkhandler";
import { API_URL } from "../../config";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "./components/Navbar";
import styles from "./css/style.module.css";
import Filter from "./components/Filter";
import User from "./components/User";
import UserHeader from "./components/UserHeader";

function Home() {
  const appContext = useContext(AppContext);
  let { selectedFilter: filter, setSelectedFilter: setFilter } = appContext;
  const filter_dict = {
    agent_id: "in",
    group_id: "in",
    issue: "equal",
    recurring_issue: "equal",
    sub_issue: "equal",
    further_breakup: "equal",
    retention_slot_id: "range",
    recharge_sold_slot: "range",
    n_slot_id: "range",
    recharge_sold: "range",
    status: "in",
    job_title: "in",
    retention_order_count: "range",
  };
  let [loader, setLoader] = useState(true);
  let [page, setPage] = useState(1);
  let [next, setNext] = useState(true);
  let [showFilter, setShowFilter] = useState(true);
  const [leadCount, setLeadCount] = useState(0);
  // let [filter, setFilter] = useState({

  // });
  let [users, setUsers] = useState([]);
  let [groups, setGroups] = useState([]);
  let [data, setData] = useState({});
  let [agents, setAgents] = useState([]);
  let [select, setSelect] = useState(false);
  let [allSelected, setAllSelected] = useState(false);
  let [order, setOrder] = useState("-updated_at");
  let [temp, setTemp] = useState(0);
  useEffect(function () {
    appContext.setTitle("All Leads");
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
  }, []);
  useEffect(
    function () {
      setNext(true);
      console.log(
        "Helooo----",
        Object.entries(filter).map(function (item) {
          return {
            key: item[0],
            value: item[1],
            type: filter_dict[item[0]],
          };
        })
      );

      const { retention_order_count, ...changes_filter } = filter;

      let updated_filter = filter;
      if (
        retention_order_count &&
        (retention_order_count[0] === "" || retention_order_count[1] === "")
      ) {
        updated_filter = changes_filter;
      }

      post_data_without_reload(
        `${API_URL}/crux/sales/leads/v1/`,
        {
          filters: Object.entries(updated_filter).map(function (item) {
            return {
              key: item[0],
              value: item[1],
              type: filter_dict[item[0]],
            };
          }),
          order_by: order,
          page: 1,
        },
        appContext
      ).then(function (data) {
        if (data) {
          setData(data);
          setNext(data?.has_next);
          setUsers(
            data?.data.map(function (item, idx) {
              return { ...item, isChecked: false };
            })
          );
          setLoader(false);
          setPage(data?.page);
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
        tickets={users}
        setTickets={setUsers}
        order={order}
        setOrder={setOrder}
        filters={Object.entries(filter).map(function (item) {
          return {
            key: item[0],
            value: item[1],
            type: filter_dict[item[0]],
          };
        })}
      />
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className={styles.user_container}>
          <div className={styles.user} id="scrollableDiv">
            <InfiniteScroll
              dataLength={users.length}
              pageStart={1}
              scrollableTarget="scrollableDiv"
              next={function () {
                post_data_without_reload(
                  `${API_URL}/crux/sales/leads/v1/`,
                  {
                    filters: Object.entries(filter).map(function (item) {
                      return {
                        key: item[0],
                        value: item[1],
                        type: filter_dict[item[0]],
                      };
                    }),
                    order_by: order,
                    page: page,
                  },
                  appContext
                ).then(function (data) {
                  if (data) {
                    setUsers(
                      users.concat(
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
              endMessage={users.length > 0 ? <></> : <></>}
            >
              {users.length > 0 ? (
                users.map(function (item, idx) {
                  if (idx == 0) {
                    return (
                      <>
                        <UserHeader />
                        <User
                          item={item}
                          key={idx}
                          shortHandFilters={data.filters}
                          tickets={users}
                          setTickets={setUsers}
                          select={select}
                          setSelect={setSelect}
                          setAllSelected={setAllSelected}
                        />
                      </>
                    );
                  } else {
                    return (
                      <User
                        item={item}
                        key={idx}
                        shortHandFilters={data.filters}
                        tickets={users}
                        setTickets={setUsers}
                        select={select}
                        setSelect={setSelect}
                        setAllSelected={setAllSelected}
                      />
                    );
                  }
                })
              ) : (
                <p style={{ textAlign: "center" }}>
                  <b>No leads found !!</b>
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
