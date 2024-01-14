import React from "react";
import List from "./List";
import { TicketCreation as data } from "./seed";
function TicketCreation({ searchType }) {
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

export default TicketCreation;
