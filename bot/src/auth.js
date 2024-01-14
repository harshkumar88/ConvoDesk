function get_access_token() {
  return localStorage["access-token"];
}

function isAgentLoggedIn() {
  let access_token = localStorage["access-token"];
  if (access_token == undefined || access_token == "undefined") {
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

export { get_access_token, isAgentLoggedIn, get_agent_id, get_agent_groups };
