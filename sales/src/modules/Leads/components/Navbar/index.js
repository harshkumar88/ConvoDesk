import React from "react";
import styles from "./style.module.css";
import { AiOutlineLeftSquare, AiOutlineRightSquare } from "react-icons/ai";
import Assign from "./components/Assign";
import Close from "./components/Close";
import Delete from "./components/Delete";
import Export from "./components/Export";
import LeadCount from "./components/LeadCount";

function Cta({ ticket_ids }) {
  return (
    <div className={styles.cta}>
      <Assign ticket_ids={ticket_ids} />
      <Close ticket_ids={ticket_ids} />
      <button className="btn">Bulk Update</button>
      {/* <button className="btn">Merge</button> */}
      <button className="btn">Spam</button>
      <Delete ticket_ids={ticket_ids} />
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
  filters,
}) {
  let sortOptions = [
    { name: "Date Created", value: "-id" },
    { name: "Last Modified", value: "-updated_at" },

    { name: "Status", value: "-status" },
  ];

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
        <Export />
        <LeadCount filters={filters} />
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
