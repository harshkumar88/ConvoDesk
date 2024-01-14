function get_access_token() {
  return localStorage["access-token"];
}

function get_agent_access_token() {
  return localStorage["agent-access-token"];
}

function get_consumer_access_token() {
  return localStorage["consumer-access-token"];
}

function get_agent_name() {
  return localStorage["agent-name"];
}

function isAgentLoggedIn() {
  let access_token = localStorage["access-token"];
  if (access_token == undefined || access_token == "undefined") {
    return false;
  } else {
    return true;
  }
}

function isPartnerLoggedIn() {
  let agent_access_token = localStorage["agent-access-token"];
  if (agent_access_token == undefined || agent_access_token == "undefined") {
    return false;
  } else {
    return true;
  }
}
function get_agent_id() {
  return localStorage.getItem("agent-id", 0);
}

function get_agent_groups() {
  return JSON.parse(localStorage.getItem("groups", "[]"));
}

function get_partner_phone() {
  return localStorage["phone"];
}
function get_agent_email() {
  return localStorage["agent-email"];
}

function get_nslot_id() {
  let currentDate = new Date();
  let year = currentDate.getFullYear().toString().substr(-2);
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");
  let formattedDate = year + month + day;
  return formattedDate;
}

function get_file_name() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;
  const formattedTime = `${hours < 10 ? "0" + hours : hours}-${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return `${formattedDate} | ${formattedTime}`;
}

function authorise(role) {
  let roles = localStorage.getItem("roles");
  if (roles) {
    roles = JSON.parse(roles);
    if (roles) {
      return !role || roles.includes(role);
    }
  }
  return true;
}

export {
  get_access_token,
  get_agent_access_token,
  get_consumer_access_token,
  isAgentLoggedIn,
  isPartnerLoggedIn,
  get_agent_id,
  get_agent_groups,
  get_partner_phone,
  get_agent_email,
  get_nslot_id,
  get_file_name,
  get_agent_name,
  authorise,
};
