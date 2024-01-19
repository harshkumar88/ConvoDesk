import React, { useState, useRef, useContext } from "react";
import styles from "../css/ticket.module.css";
import { ReactComponent as Delete } from "../../../assets/Automation/delete.svg";
import { useNavigate } from "react-router-dom";
import PopUp from "../../../utils/Popup";
import { delete_data, patch_data } from "../../../ReactLib/networkhandler";
import { AppContext } from "../../../App";

function List({ item, idx, searchType }) {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const formRef = useRef(null);

  //handle close event on outside overlay click
  function handleClick(e) {
    if (formRef && formRef.current && formRef.current.contains(e.target)) {
      return;
    }
    setShow(false);
  }

  async function handleDelete() {
    const data = await delete_data(
      `https://qa1.crofarm.com/convo/automation/${item?.id}/v1/`,
      appContext,
      true
    );
  }

  async function handleActiveUpdate() {
    const data = await patch_data(
      `https://qa1.crofarm.com/convo/automation/${item?.id}/v1/`,
      { is_active: !item.is_active },
      appContext,
      true
    );
  }
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.list_container}>
        <div className={styles.item_details1}>
          <div className={styles.item}>
            <span
              className={styles.heading}
              onClick={() =>
                navigate(
                  `/workflows/automation/editrule/${item.id}/${searchType}`
                )
              }
            >
              {idx + 1}.&nbsp; {item?.name}
            </span>
            <span className={styles.sub_heading}>
              &nbsp;&nbsp;&nbsp;&nbsp;{item?.description || "--"}
            </span>
          </div>
          <div className={styles.toggle_container} ref={formRef}>
            <div className={`${styles.incentive_info} ${styles.toggle}`}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={item?.is_active}
                  className={styles.hide}
                  onChange={handleActiveUpdate}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
            <div className={styles.delete_icon}>
              <PopUp
                btnName={<Delete />}
                btnStyling={styles.popup_btn}
                header={
                  <h2 className={styles.delete_label}>Delete Automation</h2>
                }
              >
                <div className={styles.delete_container}>
                  {" "}
                  <p className={styles.delete_text}>
                    Are you sure you want to delete automation
                  </p>
                  <button onClick={handleDelete} className={styles.delete_btn}>
                    confirm
                  </button>
                </div>
              </PopUp>
            </div>
          </div>
        </div>
        <div className={styles.item_details2}>
          <span className={styles.details_value}>
            <span className={styles.key}>Last Modified:</span>
            <span className={styles.pipe}>
              {item?.updated_at}
              {/* <span>|</span> */}
            </span>
          </span>
          <span className={styles.pipe_info}>|</span>
          <span className={styles.details_value}>
            <span className={styles.key}>By:</span>
            <span className={styles.pipe}>
              {item?.added_by}
              {/* <span>|</span> */}
            </span>
          </span>

          {/* <span className={styles.details_value}>
            <span className={styles.key}>Impacted tickets (Last 7 days) :</span>
            <span>{item?.impact}</span>
          </span> */}
        </div>
      </div>
    </div>
  );
}

export default List;
