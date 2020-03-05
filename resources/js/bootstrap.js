import _ from "lodash";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
 axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

window._ = _;
window.axios = axios;
