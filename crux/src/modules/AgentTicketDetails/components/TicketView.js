import React, { useState } from "react";
import styles from "../css/style.module.css";
import Details from "./Details";
import Filter from "./Filter";

function TicketView({
  loader,
  allFilters,
  issueDict,
  subiIssueDict,
  ticketFilter,
  setTicketFilter,
  details,
}) {
  const [slaFilter, setSlaFilter] = useState(undefined);
  const [npsFilter, setNpsFilter] = useState(undefined);

  return (
    <div>
      <div className={styles.ticket_details_container}>
        <div className={styles.check}>
          <Filter
            allFilters={allFilters}
            ticketFilter={ticketFilter}
            setTicketFilter={setTicketFilter}
            slaFilter={slaFilter}
            setSlaFilter={setSlaFilter}
            npsFilter={npsFilter}
            setNpsFilter={setNpsFilter}
          />

          <div className={styles.ticket_header}>
            <div className={styles.heading}>Ticket ID</div>
            <div className={styles.heading}>Date</div>
            <div className={styles.heading}>Issue</div>
            <div className={styles.heading}>Sub Issue </div>
            <div className={styles.heading} style={{ flex: ".5" }}>
              SLA
            </div>
            <div className={`${styles.heading} ${styles.h_margin}`}>
              User Review
            </div>
          </div>
        </div>
        {loader ? (
          <div className="loader_container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className={styles.ticket_details}>
            {details.length > 0 ? (
              details
                .filter(
                  (item) =>
                    (slaFilter === undefined || item?.sla === slaFilter) &&
                    (npsFilter === undefined || item?.nps === npsFilter)
                )
                .map(function (item, idx) {
                  return (
                    <Details
                      item={item}
                      idx={idx}
                      issueDict={issueDict}
                      subiIssueDict={subiIssueDict}
                    />
                  );
                })
            ) : (
              <p className={styles.view}>
                <b>No tickets found !!</b>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketView;
