import React, { useEffect, useState } from "react";
import EventIssueRender from "./EventIssueRender";
import EventSubIssueRender from "./EventSubIssueRender";
import EventFurtherRender from "./EventFurtherRender";

function IssueComponent({
  item,
  issueChoices,
  subIssueChoices,
  furtherChoices,
  handleTypeChange,
  setIssueId,
  setSubIssueId,
  event,
  setEvent,
  idx,
}) {
  const [subOldChoices, setSubOldChoices] = useState([]);
  const [subNewChoices, setSubNewChoices] = useState([]);

  return (
    <>
      <EventIssueRender
        item={item}
        choices={issueChoices}
        handleTypeChange={handleTypeChange}
        setId={setIssueId}
      />

      {((item?.old_value && item?.old_value !== "--") ||
        (item?.new_value && item?.new_value !== "--")) && (
        <EventSubIssueRender
          issueItem={item}
          item={item?.property}
          issueChoices={issueChoices}
          event={event}
          setEvent={setEvent}
          idx={idx}
          setSubNewChoices={setSubNewChoices}
          setSubOldChoices={setSubOldChoices}
          subOldChoices={subOldChoices}
          subNewChoices={subNewChoices}
        />
      )}

      {((item?.property?.old_value && item?.property?.old_value !== "--") ||
        (item?.property?.new_value && item?.property?.new_value !== "--")) && (
        <EventFurtherRender
          issueItem={item}
          subIssueItem={item?.property}
          item={item?.property?.property}
          event={event}
          setEvent={setEvent}
          idx={idx}
          subOldChoices={subOldChoices}
          subNewChoices={subNewChoices}
        />
      )}
    </>
  );
}

export default IssueComponent;
