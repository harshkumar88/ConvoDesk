import { get_access_token } from "./React-lib/src/auth";
// const API_URL = "http://stageapi.crofarm.com/v2";
// const API_URL = "https://api.crofarm.com";
const IMG_URL = "https://img.crofarm.com/images/prodsmall/";
// const IMG_DETAILS_URL = "https://img.crofarm.com/images/retailers/baapp/images/";
const IMG_URLS = "https://img.crofarm.com/images/retailers/baapp/images/";
const STAGING_URL = "https://stagemain.crofarm.com";
const PRODUCTION_URL = "https://api.crofarm.com";
const API_URL =
  process.env.NODE_ENV === "development" ? PRODUCTION_URL : PRODUCTION_URL;
let access_token = get_access_token();

export { API_URL, IMG_URL, IMG_URLS, access_token };
