function get_access_token() {
  return localStorage["access-token"];
}

function get_agent_access_token() {
  return localStorage["access-token"];
}
function get_agent_id() {
  return localStorage["agent-id"];
}
function get_agent_name() {
  return localStorage["agent-name"];
}
function isAgentLoggedIn() {
  let agent_access_token = localStorage["access-token"];
  return agent_access_token && agent_access_token !== "undefined";
}

function get_time() {
  const currentTime = new Date();
  const epochTimeInSeconds = Math.floor(currentTime.getTime() / 1000);
  localStorage.setItem("epoch-time", epochTimeInSeconds);
  return epochTimeInSeconds;
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
  get_agent_id,
  get_agent_access_token,
  isAgentLoggedIn,
  get_agent_name,
  get_time,
  authorise,
};
