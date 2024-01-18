import React, { useEffect, useState } from "react";
import styles from "../../css/issue.module.css";
import Issue from "./Issue";
import SubIssue from "./SubIssue";
import FurtherBreakup from "./FurtherBreakup";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
import uuid4 from "uuid4";

function IssueLayout(props) {
  const { choices, setChoices } = props.issueContext;
  const [activeIssue, setActiveIssue] = useState(0);
  const [activeSubIssue, setActiveSubIssue] = useState(0);
  const [activeFurtherBreakup, setActiveFurtherBreakup] = useState(0);

  useEffect(() => {
    if (choices?.length) {
      setActiveIssue(choices[0]?.id);
      if (choices[0]?.choices?.length) {
        setActiveSubIssue(choices[0]?.choices[0]?.id);
        if (choices[0]?.choices[0]?.choices?.length) {
          setActiveFurtherBreakup(choices[0]?.choices[0]?.choices[0]?.id);
        }
      }
    }
  }, []);
  function addNewHandler(type) {
    // Generate a new UUID
    var id = uuid4();
    if (type == "issue") {
      setActiveIssue(id);
      setChoices([
        ...choices,
        {
          id: id,
          key: "issue",
          label: "",
          choices: [],
        },
      ]);
    } else if (type == "sub_issue") {
      setActiveSubIssue(id);
      const updatedChoices = choices?.map((item) => {
        if (item.id == activeIssue) {
          return {
            ...item,
            choices: [
              ...item.choices,
              {
                id: id,
                key: "sub_issue",
                label: "",
                choices: [],
              },
            ],
          };
        }
        return item;
      });

      setChoices([...updatedChoices]);
    } else {
      setActiveFurtherBreakup(id);
      const updatedChoices = choices?.map((item) => {
        if (item.id === activeIssue) {
          return {
            ...item,
            choices: item.choices.map((info) => {
              if (info.id === activeSubIssue) {
                return {
                  ...info,
                  choices: [
                    ...info.choices,
                    {
                      id: id,
                      key: "further_breakup",
                      label: "",
                      choices: [],
                    },
                  ],
                };
              }
              return info;
            }),
          };
        }
        return item;
      });

      setChoices(updatedChoices || []);
    }
  }

  function handleIssueChange(text, index) {
    const updatedChoices = choices?.map((item) => {
      if (item.id == activeIssue) {
        return { ...item, label: text };
      }
      return item;
    });
    setChoices([...updatedChoices]);
  }

  function handleSubIssueChange(text, index) {
    const updatedChoices = choices?.map((item) => {
      if (item.id === activeIssue) {
        return {
          ...item,
          choices: item.choices.map((info) => {
            if (info.id === activeSubIssue) {
              return { ...info, label: text };
            }
            return info;
          }),
        };
      }
      return item;
    });
    setChoices(updatedChoices || []);
  }
  function handleFurtherBreakupChange(text, index) {
    const updatedChoices = choices?.map((item) => {
      if (item.id === activeIssue) {
        return {
          ...item,
          choices: item.choices.map((info) => {
            if (info.id === activeSubIssue) {
              return {
                ...info,
                choices: info.choices.map((breakup) => {
                  if (breakup.id === activeFurtherBreakup) {
                    return {
                      ...breakup,
                      label: text, // Update the label as needed
                    };
                  }
                  return breakup;
                }),
              };
            }
            return info;
          }),
        };
      }
      return item;
    });

    // Assuming you are using a state hook to update the state, e.g., setChoices
    setChoices(updatedChoices || []);
  }

  function handleIssueDelete() {
    const updatedChoices = choices?.filter((item) => {
      return item.id != activeIssue;
    });
    setChoices([...updatedChoices]);
  }
  function handleSubIssueDelete(id) {
    const updatedChoices =
      choices?.map((item) => ({
        ...item,
        choices: (item?.choices || []).filter(
          (info) => info?.id !== activeSubIssue
        ),
      })) || [];
    setChoices([...updatedChoices]);
  }

  function handleFurtherBreakupDelete(id) {
    const updatedChoices =
      choices?.map((item) => ({
        ...item,
        choices: (item?.choices || []).map((info) => ({
          ...info,
          choices: (info?.choices || []).filter(
            (breakup) => breakup?.id !== activeFurtherBreakup
          ),
        })),
      })) || [];

    // Assuming you are using a state hook to update the state, e.g., setChoices
    setChoices([...updatedChoices]);
  }

  function deleteHandler(type) {
    if (type == "issue") {
      handleIssueDelete();
    } else if (type == "sub_issue") {
      handleSubIssueDelete();
    } else {
      handleFurtherBreakupDelete();
    }
  }

  function changeHandler(text, idx, type) {
    if (type == "issue") {
      handleIssueChange(text, idx);
    } else if (type == "sub_issue") {
      handleSubIssueChange(text, idx);
    } else {
      handleFurtherBreakupChange(text, idx);
    }
  }

  return (
    <>
      <p className={styles.issue_head}> DROPDOWN CHOICES</p>
      <div className={styles.container}>
        <li className={styles.list_container}>
          <h1 className={styles.list_heading}>Level 1</h1>
          <ul className={styles.list}>
            {choices?.map(function (item, idx) {
              return (
                <Issue
                  key={idx}
                  label={item?.label}
                  value={item?.value}
                  type="issue"
                  state={activeIssue}
                  setState={setActiveIssue}
                  idx={item.id}
                  changeHandler={changeHandler}
                  deleteHandler={deleteHandler}
                />
              );
            })}
            <button
              className={styles.add_btn}
              type="button"
              onClick={() => addNewHandler("issue")}
            >
              <AiFillPlusCircle />
            </button>
          </ul>
        </li>
        <li className={styles.list_container}>
          <h1 className={styles.list_heading}>Level 2</h1>
          <ul className={styles.list}>
            {choices
              ?.find((item) => {
                return item.id == activeIssue;
              })
              ?.choices?.map(function (item, idx) {
                return (
                  <Issue
                    key={idx}
                    label={item?.label}
                    value={item?.value}
                    type="sub_issue"
                    state={activeSubIssue}
                    setState={setActiveSubIssue}
                    idx={item.id}
                    changeHandler={changeHandler}
                    deleteHandler={deleteHandler}
                  />
                );
              })}
            {choices?.length ? (
              <button
                className={styles.add_btn}
                type="button"
                onClick={() => addNewHandler("sub_issue")}
              >
                <AiFillPlusCircle />
              </button>
            ) : null}
          </ul>
        </li>
        <li className={styles.list_container}>
          <h1 className={styles.list_heading}>Level 3</h1>
          <ul className={styles.list}>
            {choices
              ?.find((item) => {
                return item.id == activeIssue;
              })
              ?.choices?.find((item) => item.id == activeSubIssue)
              ?.choices?.map(function (item, idx) {
                return (
                  <Issue
                    key={idx}
                    label={item?.label}
                    value={item?.value}
                    type="further_breakup"
                    setState={setActiveFurtherBreakup}
                    state={activeFurtherBreakup}
                    idx={item.id}
                    changeHandler={changeHandler}
                    deleteHandler={deleteHandler}
                  />
                );
              })}
            {choices?.find((item) => {
              return item.id == activeIssue;
            })?.choices?.length ? (
              <button
                className={styles.add_btn}
                type="button"
                onClick={() => addNewHandler("further_breakup")}
              >
                <AiFillPlusCircle />
              </button>
            ) : null}
          </ul>
        </li>
      </div>
    </>
  );
}
export default IssueLayout;
