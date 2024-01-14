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
  let [sourceRefund, setSourceRefund] = useState(null);
  let [riskAction, setRiskAction] = useState(null);
  let sourceChoices = [
    { label: "Dialler", value: 1 },
    { label: "Dashboard", value: 2 },
    { label: "Three Attempt", value: 3 },
    { label: "Chat Connect", value: 4 },
    { label: "Bot", value: 5 },
  ];
  let risk_action_choices = [
    { value: 1, label: "Action Pending" },
    { value: 2, label: "Action Taken" },
  ];
  let source_refund_choices = [
    { value: 1, label: "UPI" },
    { value: 2, label: "Gateway" },
    { value: 3, label: "Manual Refund" },
  ];
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
            sourceChoices={sourceChoices}
            risk_action_choices={risk_action_choices}
            source_refund_choices={source_refund_choices}
            setSourceRefund={setSourceRefund}
            setRiskAction={setRiskAction}
          />

          <div className={styles.ticket_header}>
            <div className={styles.heading}>Ticket ID</div>
            <div className={styles.heading}>Date</div>
            <div className={styles.heading}>Issue</div>
            <div className={styles.heading}>Sub Issue </div>
            <div className={styles.heading}>RIsk Action</div>
            <div className={`${styles.heading} ${styles.h_margin}`}>
              Source Refund
            </div>
          </div>
        </div>
        {loader ? (
          <div className="loader_container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className={styles.ticket_details}>
            {details?.length > 0 ? (
              details
                ?.filter((item) => {
                  if (riskAction && sourceRefund) {
                    return (
                      item.risk_action == riskAction &&
                      item.source_refund_type == sourceRefund
                    );
                  }

                  if (riskAction) {
                    return item.risk_action == riskAction;
                  }

                  if (sourceRefund) {
                    return item.source_refund_type == sourceRefund;
                  }

                  return true;
                })
                ?.map(function (item, idx) {
                  return (
                    <Details
                      item={item}
                      idx={idx}
                      issueDict={issueDict}
                      subiIssueDict={subiIssueDict}
                      risk_action_choices={risk_action_choices}
                      source_refund_choices={source_refund_choices}
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
