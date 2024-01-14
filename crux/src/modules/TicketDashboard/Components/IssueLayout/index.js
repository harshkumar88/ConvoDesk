import React from "react";
import styles from "../../css/issue.module.css";
import Issue from "./Issue";
import SubIssue from "./SubIssue";
import FurtherBreakup from "./FurtherBreakup";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
function IssueLayout(props) {
  const {
    dispositionDict,
    handler,
    putDataHandler,
    deleteDataHandler,
    active,
    newBtn,
    handleAdd,
    addNewHandler,
    newIssue,
    setNewIssue,
    newSubIssue,
    setNewSubIssue,
    newFurtherBreakup,
    setNewFurtherBreakup,
    isActive,
    setDropState,
  } = props.issueContext;
  return (
    <>
      <p className={styles.issue_head}> DROPDOWN CHOICES</p>
      <div className={styles.container}>
        <li className={styles.list_container}>
          <h1 className={styles.list_heading}>Level 1</h1>
          <ul className={styles.list}>
            {dispositionDict.issue?.map(function (item, idx) {
              return (
                <Issue
                  key={idx}
                  label={item?.label}
                  value={item?.value}
                  type="issue"
                  clickHandler={(type, value) => handler(type, value)}
                  changeHandler={(data, type, value, prevLabel) =>
                    putDataHandler(data, type, value, prevLabel)
                  }
                  deleteHandler={(type, value) =>
                    deleteDataHandler(type, value)
                  }
                  activeValue={active.issue}
                />
              );
            })}
            {newBtn.issue ? (
              <li className={styles.list_item}>
                <input
                  type="text"
                  placeholder="Enter new Issue"
                  value={newIssue}
                  className={styles.new_issue}
                  onChange={function (e) {
                    setNewIssue(e.target.value);
                  }}
                />
                <span
                  className={styles.list_icon}
                  onClick={() => handleAdd("issue")}
                >
                  <MdCreateNewFolder />
                </span>
              </li>
            ) : (
              <button
                className={styles.add_btn}
                onClick={() => addNewHandler("issue")}
              >
                <AiFillPlusCircle />
              </button>
            )}
          </ul>
        </li>
        <li className={styles.list_container} style={{ marginTop: "2%" }}>
          <h1 className={styles.list_heading}>Level 2</h1>
          <ul className={styles.list}>
            {dispositionDict.sub_issue
              ?.filter((item) => item.additional_key === active.issue)
              ?.map((item, idx) => (
                <SubIssue
                  key={idx}
                  label={item?.label}
                  value={item?.value}
                  type="sub_issue"
                  clickHandler={(type, value) => handler(type, value)}
                  changeHandler={(data, type, value, prevLabel) =>
                    putDataHandler(data, type, value, prevLabel)
                  }
                  deleteHandler={(type, value) =>
                    deleteDataHandler(type, value)
                  }
                  activeValue={active.sub_issue}
                />
              ))}
            {newBtn.subIssue ? (
              <li className={styles.list_item}>
                <input
                  type="text"
                  placeholder="Enter new Sub Issue"
                  value={newSubIssue}
                  className={styles.new_issue}
                  onChange={function (e) {
                    setNewSubIssue(e.target.value);
                  }}
                />
                <span
                  className={styles.list_icon}
                  onClick={() => handleAdd("sub_issue")}
                >
                  <MdCreateNewFolder />
                </span>
              </li>
            ) : active.issue !== -1 ? (
              <button
                className={styles.add_btn}
                onClick={() => addNewHandler("subIssue")}
              >
                <AiFillPlusCircle />
              </button>
            ) : (
              <></>
            )}
          </ul>
        </li>
        <li className={styles.list_container} style={{ marginTop: "4%" }}>
          <h1 className={styles.list_heading} style={{ clipPath: "none" }}>
            Level 3
          </h1>
          <ul className={styles.list}>
            {dispositionDict.further_breakup
              ?.filter((item) => item.additional_key === active.sub_issue)
              ?.map((item, idx) => (
                <FurtherBreakup
                  key={idx}
                  label={item.label}
                  value={item.value}
                  type="further_breakup"
                  clickHandler={(type, value) => handler(type, value)}
                  changeHandler={(data, type, value, prevLabel) =>
                    putDataHandler(data, type, value, prevLabel)
                  }
                  deleteHandler={(type, value) =>
                    deleteDataHandler(type, value)
                  }
                  activeValue={active.further_breakup}
                />
              ))}

            {newBtn.furtherBreakup ? (
              <li className={styles.list_item}>
                <input
                  type="text"
                  placeholder="Enter new Further Breakup"
                  value={newFurtherBreakup}
                  className={styles.new_issue}
                  onChange={function (e) {
                    setNewFurtherBreakup(e.target.value);
                  }}
                />
                <span
                  className={styles.list_icon}
                  onClick={() => handleAdd("further_breakup")}
                >
                  <MdCreateNewFolder />
                </span>
              </li>
            ) : active.sub_issue !== -1 ? (
              <button
                className={styles.add_btn}
                onClick={() => addNewHandler("furtherBreakup")}
              >
                <AiFillPlusCircle />
              </button>
            ) : (
              <></>
            )}
          </ul>
        </li>
      </div>
      <div className={styles.issue_div}>
        <button
          className={styles.issue_cancel}
          onClick={() => {
            console.log("he:");
            setDropState(false);
          }}
        >
          Cancel
        </button>
        <button className={styles.issue_save}>Save</button>
      </div>
    </>
  );
}
export default IssueLayout;
