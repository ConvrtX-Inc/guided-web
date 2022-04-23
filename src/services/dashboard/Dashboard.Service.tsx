import axios from "axios";
import AuthHeader from "../Auth-Header";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const config = (token?: string) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: AuthHeader(),
  },
  params: {},
});
const loadSubAdminRecentPosts = (id: string) => {
  config()["params"] = {};
  return axios
    .get(API_URL + `api/v1/sub-admin-post/activity-recent-post/${id}`, config())
    .then((response) => {
      return response;
    });
};
const loadCountAllUsers = () => {
  config()["params"] = {};
  return axios
    .get(API_URL + "api/v1/dashboard-related/all-users", config())
    .then((response) => {
      return response.data;
    });
};
const loadCountActiveUsers = () => {
  config()["params"] = {};
  return axios
    .get(API_URL + "api/v1/dashboard-related/active-users", config())
    .then((response) => {
      return response.data;
    });
};
const loadCountOnlineUsers = () => {
  config()["params"] = {};
  return axios
    .get(API_URL + "api/v1/dashboard-related/online-users", config())
    .then((response) => {
      return response.data;
    });
};
const loadCountTotalDownloads = () => {
  config()["params"] = {};
  return axios
    .get(API_URL + "api/v1/dashboard-related/total-downloads", config())
    .then((response) => {
      return response.data;
    });
};
const loadRecentPosts = () => {
  config()["params"] = {};
  return axios
    .get(API_URL + "api/v1/dashboard-related/recent-post", config())
    .then((response) => {
      //console.log(response);
      return response.data;
    });
};

const loadUserActivityPostSummary = (id: string) => {
  config()["params"] = {};
  return axios
    .get(
      API_URL + `api/v1/dashboard-related/user-activity-post-summary/${id}`,
      config()
    )
    .then((response) => {
      return response;
    });
};

const DashboardService = {
  loadSubAdminRecentPosts,
  loadRecentPosts,
  loadCountTotalDownloads,
  loadCountOnlineUsers,
  loadCountActiveUsers,
  loadCountAllUsers,
  loadUserActivityPostSummary,
};

export default DashboardService;
