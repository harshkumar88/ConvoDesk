import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { put_data } from "../../../../ReactLib/networkhandler";

function Agent({ data, allRoles }) {
  const appContext = useContext(AppContext);
  let [roles, setRoles] = useState([]);
  useEffect(
    function () {
      setRoles(data.roles);
    },
    [data]
  );
  function handleSubmit(e) {
    e.preventDefault();
    console.log(roles, data.roles);
    if (roles == data.roles) {
      return;
    }
    let role_ids = roles.map(function (item, idx) {
      return item.role_id;
    });
    let payload = { agent_id: data.id, role_ids: role_ids };
    put_data(`${API_URL}/crux/users/agent/role/v1/`, payload, appContext, true);
  }
  return (
    <div className="item-row">
      <div className="item-col">
        <span className="item-heading">Agent</span>
        <span className="item-value">{data.name}</span>
      </div>
      <div className="item-col">
        <label className="item-heading">Roles</label>
        <Select
          //   className="select"
          closeMenuOnSelect={false}
          isMulti
          options={allRoles.map(function (item, idx) {
            return { label: item.name, value: item.id };
          })}
          value={roles.map(function (item, idx) {
            return { label: item.role_name, value: item.role_id };
          })}
          onBlur={handleSubmit}
          onChange={function (e) {
            setRoles(
              e.map(function (item, idx) {
                return { role_name: item.label, role_id: item.value };
              })
            );
          }}
        />
      </div>
      {/* <div className="item-col">
        <div className="btn-container">
          <button className="dark-btn" onClick={handleSubmit}>
            Save Role
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Agent;
