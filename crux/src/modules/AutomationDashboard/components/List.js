import React, { useState, useRef } from "react";
import styles from "../css/ticket.module.css";
import { ReactComponent as Dot } from "../../../assets/Automation/dot.svg";
import { ReactComponent as Edit } from "../../../assets/Automation/edit.svg";
import { ReactComponent as Delete } from "../../../assets/Automation/delete.svg";
import { useNavigate } from "react-router-dom";

function List({ item, idx, searchType }) {
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

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.list_container}>
        <div className={styles.item_details1}>
          <div className={styles.item}>
            <span
              className={styles.heading}
              onClick={() => navigate(`/automation/editrule/5/${searchType}`)}
            >
              {idx + 1}.&nbsp; {item?.heading}
            </span>
            <span className={styles.sub_heading}>
              &nbsp;&nbsp;&nbsp;&nbsp;{item?.subHeading}
            </span>
          </div>
          <div className={styles.toggle_container} ref={formRef}>
            <div className={`${styles.incentive_info} ${styles.toggle}`}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={item?.is_active}
                  className={styles.hide}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
            <span onClick={() => setShow(!show)} className={styles.dot_icon}>
              <Dot />
            </span>
            {show && (
              <div className={styles.dropdown}>
                <span
                  onClick={() =>
                    navigate(`/automation/editrule/5/${searchType}`)
                  }
                >
                  <Edit />
                  Edit
                </span>
                <span>
                  <Delete />
                  Delete
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.item_details2}>
          <span className={styles.details_value}>
            <span className={styles.key}>Last Modified:</span>
            <span className={styles.pipe}>
              {item?.last_modified}
              <span>|</span>
            </span>
          </span>
          <span className={styles.details_value}>
            <span className={styles.key}>By:</span>
            <span className={styles.pipe}>
              {item?.by} <span>|</span>
            </span>
          </span>

          <span className={styles.details_value}>
            <span className={styles.key}>Impacted tickets (Last 7 days) :</span>
            <span>{item?.impact}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default List;
