import React, { useState } from "react";
import styles from "./style.module.css";
import { AiOutlineLeftSquare, AiOutlineRightSquare } from "react-icons/ai";
import Assign from "./components/Assign";
import Close from "./components/Close";
import Delete from "./components/Delete";
import Export from "./components/Export";
import SideBar from "./components/SideBar";
import { AppContext } from "../../../../App";
import { useContext } from "react";

function Cta({ ticket_ids }) {
  return (
    <div className={styles.cta}>
      <Assign ticket_ids={ticket_ids} />
      <Close ticket_ids={ticket_ids} />
      {/* <button className="btn">Bulk Update</button>
      <button className="btn">Merge</button>
      <button className="btn">Spam</button> */}
      {/* <Delete ticket_ids={ticket_ids} /> */}
    </div>
  );
}
function Navbar({
  select,
  allSelected,
  setSelect,
  setAllSelected,
  tickets,
  setTickets,
  showFilter,
  setShowFilter,
  order,
  setOrder,
  ticketCount,
}) {
  let [show, setShow] = useState(false);
  let sortOptions = [
    { name: "Date Created", value: "-id" },
    { name: "Due Time", value: "-resolution_time" },
    { name: "Last Modified", value: "-updated_at" },
    {
      name: "Priority",
      value: "-priority",
    },
    { name: "Status", value: "-status" },
  ];
  const appContext = useContext(AppContext);
  function handleSort(e) {
    setOrder(e.target.value);
  }
  function handleSelect(e) {
    setTickets(
      tickets.map(function (order, idx) {
        return { ...order, isChecked: e.target.checked };
      })
    );
    setSelect(e.target.checked);
    setAllSelected(e.target.checked);
  }
  function handleClick() {
    setShow(!show);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.subnav}>
        <input
          type="checkbox"
          checked={allSelected}
          className={styles.checkbox}
          onChange={handleSelect}
        />
        {select ? (
          <Cta
            ticket_ids={tickets
              .filter(function (item, idx) {
                return item.isChecked;
              })
              .map(function (item, idx) {
                return item.id;
              })}
          />
        ) : (
          <div className={styles.cta_1}>
            <label>Sort By</label>
            <select className="select" onChange={handleSort} value={order}>
              {sortOptions.map(function (item, idx) {
                return <option value={item.value}>{item.name}</option>;
              })}
            </select>
          </div>
        )}
      </div>

      <div className={styles.subnav}>
        <span>
          Ticket Count: {ticketCount !== undefined ? ticketCount : "---"}
        </span>
        {/* <Export /> */}
        <button className="btn" onClick={handleClick}>
          Export
        </button>
        {show ? (
          <SideBar show={show} setShow={setShow} appContext={appContext} />
        ) : (
          <></>
        )}
        <span
          className={styles.filter}
          onClick={function (e) {
            setShowFilter(!showFilter);
          }}
        >
          {showFilter ? <AiOutlineRightSquare /> : <AiOutlineLeftSquare />}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
