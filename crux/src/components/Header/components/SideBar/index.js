import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.css";
import { ReactComponent as Close } from "../../../../assets/CloseIcon.svg";
import Select from "react-select";
import Content from "./Content";
import { get_agent_name, get_time } from "../../../../ReactLib/auth";
import { get_data } from "../../../../ReactLib/networkhandler";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
function SideBar({ show, setShow }) {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  let [staticData, setStaticData] = useState([]);
  let [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "Today",
    label: "Today",
  });

  const [optionTitles, setOptionTitles] = useState([]);

  function handleClick() {
    setShow(false);
  }

  function handleSelectChange(selectedOption) {
    setSelectedOption(selectedOption);
    const selectedData = staticData?.find(
      (item) => item.title === selectedOption.value
    );

    if (selectedData) {
      get_data(
        `${API_URL}/crux/agent/metrics/v1/?from_slot=${selectedData?.from_slot}&to_slot=${selectedData?.to_slot}`,
        appContext
      ).then(function (data) {
        if (data) {
          setDetails(data?.data);
        }
      });
    }
  }

  useEffect(() => {
    setLoader(true);
    get_data(`${API_URL}/crux/slots/v1/`, appContext).then(function (data) {
      if (data) {
        setStaticData(data?.data);
        const newOptionTitles = data?.data?.map((item) => ({
          value: item.title,
          label: item.title,
        }));
        setOptionTitles(newOptionTitles);
        setLoader(false);
        get_data(
          `${API_URL}/crux/agent/metrics/v1/?from_slot=${data?.data[0]?.from_slot}&to_slot=${data?.data[0]?.to_slot}`,
          appContext
        ).then(function (data) {
          if (data) {
            setDetails(data?.data);
            setLoader(false);
          }
        });
      }
    });
  }, [appContext.reload]);
  return (
    <div
      className={styles.sidenav}
      style={{
        width: show ? "100%" : "0",
      }}
    >
      <div className={styles.sidenav_body}>
        <p onClick={handleClick} className={styles.close}>
          <Close />
        </p>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.svg}>
              <div className={styles.round}>{get_agent_name()?.charAt(0)}</div>
            </div>
            <div className={styles.content}>
              <p className={styles.name}>{get_agent_name()}</p>
              <p className={styles.email}>
                {localStorage.getItem("agent-email")}
              </p>
            </div>
            <span
              className={styles.logout_btn}
              onClick={() => navigate("/logout")}
            >
              <FiLogOut />
            </span>
          </div>{" "}
          <hr className={styles.grey_hr} />
          {loader ? (
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {" "}
              <Select
                options={optionTitles}
                value={selectedOption}
                onChange={handleSelectChange}
              />
              {selectedOption && <Content data={details} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
