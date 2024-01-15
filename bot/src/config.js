import { get_access_token } from "./ReactLib/auth";
const API_URL = "https://stagemain.crofarm.com";
const IMG_URL = "https://img.crofarm.com/images/prodsmall/";
const IMG_URLS = "https://img.crofarm.com/images/retailers/baapp/images/";
let access_token = get_access_token();

export { API_URL, IMG_URL, IMG_URLS, access_token };
