import React from "react";
import { NavLink } from "react-router-dom";

function UserInfo({ data }) {
  return (
    <NavLink to={`/user/details/${data.id}`} className="item-row">
      {/* <div className="item-col">
        <div className="item-heading">ID</div>
        <div className="item-value">{data.id}</div>
      </div> */}
      <div className="item-col">
        <div className="item-heading">Name</div>
        <div className="item-value">{data.name ? data.name : "-"}</div>
      </div>
      <div className="item-col">
        <div className="item-heading">Phone</div>
        <div className="item-value">{data.phone ? data.phone : "-"}</div>
      </div>
      <div className="item-col">
        <div className="item-heading">Email</div>
        <div className="item-value">{data.email ? data.email : "-"}</div>
      </div>
    </NavLink>
  );
}

export default UserInfo;
