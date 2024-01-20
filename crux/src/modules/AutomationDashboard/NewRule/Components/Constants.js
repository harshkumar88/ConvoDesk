import { get_data } from "../../../../ReactLib/networkhandler";
export async function getTicketFields(appContext) {
  const constant_data = await get_data(
    `https://qa1.crofarm.com/convo/automation/constants/v1/`,
    appContext
  );

  const ticket_fields_data = await get_data(
    `https://qa1.crofarm.com/convo/config/v1/`,
    appContext
  );
  const ticketFields = ticket_fields_data?.config?.ticket_fields;

  let automation_data = {
    ticketFields: ticketFields,
    constants: constant_data?.data,
  };

  return automation_data;
}
