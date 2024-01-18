import { get_access_token } from "./ReactLib/auth";
// const API_URL = "http://stageapi.crofarm.com/v2";
// const API_URL = "https://api.crofarm.com";
const IMG_URL = "https://img.crofarm.com/images/prodsmall/";
const ICON_URL = "https://fassets.freshdesk.com";

// const IMG_DETAILS_URL = "https://img.crofarm.com/images/retailers/baapp/images/";
const IMG_URLS = "https://img.crofarm.com/images/retailers/baapp/images/";
let access_token = get_access_token();
const STAGE_URL = "https://stagemain.crofarm.com";
const PROD_URL = "https://api.crofarm.com";
const API_URL = process.env.NODE_ENV === "development" ? STAGE_URL : PROD_URL;
console.log("api url", API_URL, process.env.NODE_ENV);
export { API_URL, IMG_URL, IMG_URLS, access_token, ICON_URL };
