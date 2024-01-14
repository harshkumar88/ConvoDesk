import React from "react";
import List from "./List";
import { TicketUpdate as data } from "./seed";
function TicketUpdate({ searchType }) {
  return (
    <>
      {data?.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            <List item={item} idx={idx} searchType={searchType} />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default TicketUpdate;
