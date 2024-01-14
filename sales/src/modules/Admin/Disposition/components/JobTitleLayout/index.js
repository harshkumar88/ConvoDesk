import React from "react";
import styles from "../../css/style.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
import JobTitle from "./JobTitle";
export default function JobTitleLayout(props) {
  const {
    dispositionDict,
    handler,
    putDataHandler,
    deleteDataHandler,
    active,
    newJobTitle,
    setNewJobTitle,
    newBtn,
    handleAdd,
    addNewHandler,
  } = props.jobContext;

  return (
    <div className={styles.outcomeContainer}>
      <li className={styles.list_container}>
        <h1 className={styles.list_heading}>Job Title</h1>
        <ul className={styles.list}>
          {dispositionDict?.job_title?.map(function (item, idx) {
            return (
              <JobTitle
                key={idx}
                label={item?.label}
                value={item?.value}
                type="job_title"
                clickHandler={(type, value) => handler(type, value)}
                changeHandler={(data, type, value, prevLabel) =>
                  putDataHandler(data, type, value, prevLabel)
                }
                deleteHandler={(type, value) => deleteDataHandler(type, value)}
                activeValue={active.job_title}
              />
            );
          })}
          {newBtn.job_title ? (
            <li className={styles.list_item}>
              <input
                type="text"
                placeholder="Enter new job title"
                value={newJobTitle}
                className={styles.new_issue}
                onChange={function (e) {
                  setNewJobTitle(e.target.value);
                }}
              />
              <span
                className={styles.list_icon}
                onClick={() => handleAdd("job_title")}
              >
                <MdCreateNewFolder />
              </span>
            </li>
          ) : (
            <button
              className={styles.add_btn}
              onClick={() => addNewHandler("job_title")}
            >
              <AiFillPlusCircle />
            </button>
          )}
        </ul>
      </li>
    </div>
  );
}
