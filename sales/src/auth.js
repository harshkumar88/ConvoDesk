function get_access_token() {
  return localStorage["access-token"];
}

function get_agent_access_token() {
console.log("hey");
  return localStorage["agent-access-token"];
}

function get_consumer_access_token() {
  return localStorage["consumer-access-token"];
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

export {
  get_access_token,
  get_agent_access_token,
  get_consumer_access_token,
  isAgentLoggedIn,
  isPartnerLoggedIn,
  get_agent_id,
  get_agent_groups,
  get_partner_phone,
};
