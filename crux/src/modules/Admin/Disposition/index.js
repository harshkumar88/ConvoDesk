import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";
import {
  delete_data,
  get_data,
  post_data,
  put_data,
} from "../../../ReactLib/networkhandler";
import OutcomeLayout from "./components/OutcomeLayout";
import TicketTypeLayout from "./components/TicketTypeLayout";
import IssueLayout from "./components/IssueLayout";
import TabBarLayout from "./components/TabBarLayout";

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
  let [newOutcome, setNewOutcome] = useState("");
  let [newTicketType, setnewTicketType] = useState("");
  let [searchType, setSearchType] = useState("Issues");

  const tabBarContext = { setSearchType };

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

  const outcomeContext = {
    dispositionDict,
    handler,
    putDataHandler,
    deleteDataHandler,
    active,
    setActive,
    newOutcome,
    setNewOutcome,
    newBtn,
    setNewBtn,
    handleAdd,
    addNewHandler,
  };

  const ticketContext = {
    dispositionDict,
    handler,
    putDataHandler,
    deleteDataHandler,
    active,
    setActive,
    newTicketType,
    setnewTicketType,
    newBtn,
    setNewBtn,
    handleAdd,
    addNewHandler,
  };

  useEffect(() => {
    appContext.setTitle("Disposition");

    let dispositionData = {};

    get_data(`${API_URL}/crux/filters/v1/`, appContext).then(function (data) {
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
    } else if (status.ticket_outcome) {
      const len = dispositionData["ticket_outcome"].length - 1;
      setActive({
        ...active,
        ticket_outcome: dispositionData["ticket_outcome"][len].value,
      });
    } else if (status.ticket_type) {
      const len = dispositionData["ticket_type"].length - 1;
      setActive({
        ...active,
        ticket_type: dispositionData["ticket_type"][len].value,
      });
    }
  }

  // It handles the active state after deletetion of item and first time UI Load
  function handleActiveState(dispositionData) {
    let issueKey = -1;
    let subIssueKey = -1;
    let furtherBreakupKey = -1;
    let ticketOutcome = -1;
    let ticketType = -1;
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
    if (dispositionData["ticket_outcome"]?.length > 0) {
      ticketOutcome = dispositionData["ticket_outcome"][0].value;
    }

    if (dispositionData["ticket_type"]?.length > 0) {
      ticketType = dispositionData["ticket_type"][0].value;
    }

    setActive({
      issue: issueKey,
      sub_issue: subIssueKey,
      further_breakup: furtherBreakupKey,
      ticket_outcome: ticketOutcome,
      ticket_type: ticketType,
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
        item.key === "ticket_outcome" ||
        item.key === "ticket_type"
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
    } else if (type === "ticket_outcome") {
      setActive({ ...active, ticket_outcome: value });
    } else if (type === "ticket_type") {
      setActive({ ...active, ticket_type: value });
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
          key: key,
          label: newIssue.trim(),
          additional_key: 0,
        };
      }
      case "sub_issue": {
        return {
          key: key,
          label: newSubIssue.trim(),
          additional_key: active.issue,
        };
      }
      case "further_breakup": {
        return {
          key: key,
          label: newFurtherBreakup.trim(),
          additional_key: active.sub_issue,
        };
      }
      case "ticket_outcome": {
        return {
          key: key,
          label: newOutcome.trim(),
          additional_key: 0,
        };
      }
      case "ticket_type": {
        return {
          key: key,
          label: newTicketType.trim(),
          additional_key: 0,
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
      case "ticket_outcome": {
        setNewOutcome("");
        setStatus({ ticket_outcome: true });
        break;
      }
      case "ticket_type": {
        setnewTicketType("");
        setStatus({ ticket_type: true });
      }
    }
  }
  function handleAdd(key) {
    let data = getModifiedData(key);
    if (data.label != "") {
      post_data(
        `${API_URL}/crux/ticket/disposition/v1/`,
        data,
        appContext,
        true
      ).then(function (res) {
        if (res) {
          handleStatesAfterRequest(data.key);
          setTrigger({ add: true });
        }
      });
    }
  }

  // handles the update Request
  function putDataHandler(data, type, value, prevLabel) {
    let putData = {
      key: type,
      label: data.trim(),
      value: value,
    };
    if (data.trim() !== "" && prevLabel !== data.trim()) {
      put_data(
        `${API_URL}/crux/ticket/disposition/v1/`,
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
      `${API_URL}/crux/ticket/disposition/v1/?key=${type}&value=${value}`,
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
      <TabBarLayout tabBarContext={tabBarContext} />
      {searchType == "Issues" ? (
        <IssueLayout issueContext={issueContext} />
      ) : searchType == "Outcome" ? (
        <OutcomeLayout outcomeContext={outcomeContext} />
      ) : (
        <TicketTypeLayout ticketContext={ticketContext} />
      )}
    </div>
  );
}

export default Disposition;
