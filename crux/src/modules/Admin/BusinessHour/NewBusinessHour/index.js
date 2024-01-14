import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { post_data } from "../../../../React-lib/src/networkhandler";

function NewBusinessHour(props) {
  const appContext = useContext(AppContext);
  useEffect(function () {
    appContext.setTitle("Business Hour");
  }, []);
  let [name, setName] = useState("");
  let [bh, setBh] = useState([
    { idx: 1, day: "Sunday", from: "1200", to: "2000" },
    { idx: 2, day: "Monday", from: "1200", to: "2000" },
    { idx: 3, day: "Tuesday", from: "1200", to: "2000" },
    { idx: 4, day: "Wednesday", from: "1200", to: "2000" },
    { idx: 5, day: "Thursday", from: "1200", to: "2000" },
    { idx: 6, day: "Friday", from: "1200", to: "2000" },
    { idx: 7, day: "Saturday", from: "1200", to: "2000" },
  ]);
  const navigate = useNavigate();

  function handleSubmit() {
    let payload = { meta: bh, name: name };
    if (!name) {
      appContext.setAlert("Provide valid name !!", "alert_error");
      return;
    }
    post_data(
      `${API_URL}/crux/business/hours/v1/`,
      payload,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        navigate("/business-hour");
      }
    });
  }
  return (
    <>
      <div className="btn-container">
        <input
          type="text"
          placeholder="Business Hour .."
          value={name}
          className="input"
          required
          onChange={function (e) {
            setName(e.target.value);
          }}
        />
      </div>
      <h1 className="text-center">Enter the working hours</h1>

      <div className="form">
        {bh.map(function (item, idx) {
          return (
            <div className="input-box-row">
              <label className="label">{item.day}</label>
              <input
                type="time"
                className="input cursor-pointer "
                value={item.from.substring(0, 2) + ":" + item.from.substring(2)}
                onChange={function (e) {
                  console.log(e.target.value);
                  setBh(
                    bh.map(function (element, index) {
                      if (index == idx) {
                        return {
                          ...element,
                          from: e.target.value.split(":").join(""),
                        };
                      } else {
                        return element;
                      }
                    })
                  );
                }}
              />
              <p>to</p>
              <input
                type="time"
                className="input cursor-pointer"
                value={item.to.substring(0, 2) + ":" + item.to.substring(2)}
                onChange={function (e) {
                  setBh(
                    bh.map(function (element, index) {
                      if (index == idx) {
                        return {
                          ...element,
                          to: e.target.value.split(":").join(""),
                        };
                      } else {
                        return element;
                      }
                    })
                  );
                }}
              />
            </div>
          );
        })}
        <div className="btn-container">
          <input type="submit" className="dark-btn" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}

export default NewBusinessHour;
