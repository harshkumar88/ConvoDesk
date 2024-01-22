import React from "react";
import List from "./List";
function TicketCreation({ searchType, automationData }) {
  return (
    <>
      {automationData?.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            <List item={item} idx={idx} searchType={searchType} />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default TicketCreation;
