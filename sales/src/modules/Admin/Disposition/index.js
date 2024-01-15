import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";
import styles from "./css/style.module.css";
import {
  delete_data,
  get_data,
  post_data,
  put_data,
} from "../../../ReactLib/networkhandler";

import IssueLayout from "./components/IssueLayout";
import TabBar from "../../../components/TabBar";
import JobTitleLayout from "./components/JobTitleLayout";
function Disposition(props) {
  const appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [dispositionDict, setDispositionDict] = useState({});
  let [active, setActive] = useState({}); //contains dict of key and value like issue:5
  let [newBtn, setNewBtn] = useState({}); //contains dict like issue:true which indicates which button type is active
  let [trigger, setTrigger] = useState({}); //contains dict of requestType and boolean like add:true
  let [status, setStatus] = useState({}); // contains dict of key and boolean like issue:true
  let [newIssue, setNewIssue] = useState("");
  let [newSubIssue, setNewSubIssue] = useState("");
  let [newFurtherBreakup, setNewFurtherBreakup] = useState("");
  let [searchType, setSearchType] = useState("issue");
  let [newJobTitle, setNewJobTitle] = useState("");

  const issueContext = {
    dispositionDict,
    handler,
    putDataHandler,
    deleteDataHandler,
    active,
    setActive,
    newBtn,
    setNewBtn,
    handleAdd,
    addNewHandler,
    newIssue,
    setNewIssue,
    newSubIssue,
    setNewSubIssue,
    newFurtherBreakup,
    setNewFurtherBreakup,
  };

  const jobContext = {
    dispositionDict,
    handler,
    putDataHandler,
    deleteDataHandler,
    active,
    setActive,
    newJobTitle,
    setNewJobTitle,
    newBtn,
    setNewBtn,
    handleAdd,
    addNewHandler,
  };

  useEffect(() => {
    appContext.setTitle("Disposition");

    let dispositionData = {};

    get_data(`${API_URL}/crux/sales/filter/v1/`, appContext).then(function (
      data
    ) {
      setDispositionDict({});
      setNewBtn({
        issue: false,
        subIssue: false,
        furtherBreakup: false,
      });
      dispositionData = checkValidData(data.data);
      setDispositionDict(dispositionData);

      if (trigger.update) {
        setActive({ ...active });
      } else if (trigger.add) {
        handleAddActiveState(dispositionData);
      } else {
        handleActiveState(dispositionData);
      }
      setLoader(false);
    });
  }, [appContext.reload]);

  //It handles the active state after addition of new item
  function handleAddActiveState(dispositionData) {
    if (status.issue) {
      const len = dispositionData["issue"].length - 1;
      setActive({
        issue: dispositionData["issue"][len].value,
      });
    } else if (status.sub_issue) {
      const issue_val = active.issue;

      const sub_active_issue = dispositionData["sub_issue"].filter(
        (item, idx) => {
          return item.additional_key == issue_val;
        }
      );
      if (sub_active_issue.length > 0) {
        const sub_issue_len = sub_active_issue.length - 1;
        setActive({
          ...active,
          sub_issue: sub_active_issue[sub_issue_len].value,
        });
      }
    } else if (status.further_breakup) {
      const fb_value = active.sub_issue;
      const fb_issue = dispositionData["further_breakup"].filter(
        (item, idx) => {
          return item.additional_key == fb_value;
        }
      );

      if (fb_issue.length > 0) {
        const fb_len = fb_issue.length - 1;
        setActive({ ...active, further_breakup: fb_issue[fb_len].value });
      }
    }
  }

  // It handles the active state after deletetion of item and first time UI Load
  function handleActiveState(dispositionData) {
    let issueKey = -1;
    let subIssueKey = -1;
    let furtherBreakupKey = -1;
    if (dispositionData["issue"]?.length > 0) {
      issueKey = dispositionData["issue"][0].value;
    }
    if (dispositionData["sub_issue"]?.length > 0) {
      let arr = dispositionData["sub_issue"].filter(function (item) {
        return item.additional_key === issueKey;
      });
      subIssueKey = arr.length > 0 ? arr[0].value : -1;
    }
    if (dispositionData["further_breakup"]?.length > 0) {
      let arr = dispositionData["further_breakup"].filter(function (item) {
        return item.additional_key === subIssueKey;
      });
      furtherBreakupKey = arr.length > 0 ? arr[0].value : -1;
    }

    setActive({
      issue: issueKey,
      sub_issue: subIssueKey,
      further_breakup: furtherBreakupKey,
    });
  }

  //It handles the creation of dict of only specified items
  function checkValidData(data) {
    let dict = [];
    data.map((item) => {
      if (
        item.key === "issue" ||
        item.key === "sub_issue" ||
        item.key === "further_breakup" ||
        item.key == "job_title"
      ) {
        dict[item?.key] = item?.choices;
      }
      return item;
    });
    return dict;
  }

  // It handles the active state on click on particular item
  function handler(type, value) {
    if (type === "issue") {
      let arr = dispositionDict["sub_issue"].filter(function (item) {
        return item.additional_key === value;
      });
      let activeValue = arr.length > 0 ? arr[0].value : -1;

      let items = dispositionDict["further_breakup"].filter(function (item) {
        return item.additional_key === activeValue;
      });
      let activeValue1 = items.length > 0 ? items[0].value : -1;
      setActive({
        issue: value,
        sub_issue: activeValue,
        further_breakup: activeValue1,
      });
    } else if (type === "sub_issue") {
      setActive({ ...active, sub_issue: value });
    } else if (type === "further_breakup") {
      setActive({ ...active, further_breakup: value });
    } else if (type === "job_title") {
      setActive({ ...active, job_title: value });
    }
  }

  //handles the addButton display
  function addNewHandler(type) {
    setNewBtn({ ...newBtn, [type]: true });
  }

  //handles and provide data based on particular item type
  function getModifiedData(key) {
    switch (key) {
      case "issue": {
        return {
          attribute: key,
          label: newIssue.trim(),
          additional_key: 0,
        };
      }
      case "sub_issue": {
        return {
          attribute: key,
          label: newSubIssue.trim(),
          additional_key: active.issue,
        };
      }
      case "further_breakup": {
        return {
          attribute: key,
          label: newFurtherBreakup.trim(),
          additional_key: active.sub_issue,
        };
      }
      case "job_title": {
        return {
          attribute: key,
          label: newJobTitle.trim(),
        };
      }
    }
  }

  // handles the different type of states after item is added
  function handleStatesAfterRequest(label) {
    switch (label) {
      case "issue": {
        setNewIssue("");
        setNewBtn({ ...newBtn, issue: false });
        setStatus({ issue: true });
        break;
      }
      case "sub_issue": {
        setNewSubIssue("");
        setNewBtn({ ...newBtn, subIssue: false });
        setStatus({ sub_issue: true });
        break;
      }
      case "further_breakup": {
        setNewFurtherBreakup("");
        setNewBtn({ ...newBtn, furtherBreakup: false });
        setStatus({ further_breakup: true });
        break;
      }
      case "job_title": {
        setNewJobTitle("");
        setNewBtn({ ...newBtn, job_title: false });
        setStatus({ job_title: true });
        break;
      }
    }
  }
  function handleAdd(key) {
    let data = getModifiedData(key);
    if (data.label != "") {
      post_data(
        `${API_URL}/crux/sales/disposition/v1/`,
        data,
        appContext,
        true
      ).then(function (res) {
        if (res) {
          handleStatesAfterRequest(data.attribute);
          setTrigger({ add: true });
        }
      });
    }
  }

  // handles the update Request
  function putDataHandler(data, type, value, prevLabel) {
    let putData = {
      attribute: type,
      label: data.trim(),
      value: value,
    };
    if (data.trim() !== "" && prevLabel !== data.trim()) {
      put_data(
        `${API_URL}/crux/sales/disposition/v1/`,
        putData,
        appContext,
        true
      );
      setTrigger({ update: true });
    }
  }

  //handles the delete request
  function deleteDataHandler(type, value) {
    delete_data(
      `${API_URL}/crux/sales/disposition/v1/?attribute=${type}&value=${value}`,
      appContext,
      true
    );
    setTrigger({ delete: true });
    setStatus({ [type]: true });
  }

  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <div>
      <TabBar
        tabs={[
          {
            title: "Issue",
            execute: { func: setSearchType, value: "issue" },
          },
          {
            title: "Job Title",
            execute: { func: setSearchType, value: "job_title" },
          },
        ]}
        styles={styles}
      />

      {searchType == "job_title" ? (
        <JobTitleLayout jobContext={jobContext} />
      ) : (
        <IssueLayout issueContext={issueContext} />
      )}
    </div>
  );
}

export default Disposition;
