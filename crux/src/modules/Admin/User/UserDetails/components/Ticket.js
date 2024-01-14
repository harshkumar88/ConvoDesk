import React from "react";
import { NavLink } from "react-router-dom";

function Ticket({ data }) {
  return (
    <NavLink to={`/ticket/details/${data.id}`} className="item-row">
      <div className="item-col">
        <div className="item-value">
          {data.subject}&nbsp;#{data.id}
        </div>
        <small className="item-heading">Created on {data.n_slot_id}</small>
      </div>
    </NavLink>
  );
}

export default Ticket;
