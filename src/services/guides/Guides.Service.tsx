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
const registerSubAdmin = (data: any) => {
  config()["params"] = {};
  return axios
    .post(API_URL + `api/v1/auth/email/register`, data, config())
    .then((response) => {
      return response;
    });
};
const getUserTypeID = (name: string) => {
  config()["params"] = {};
  return axios
    .get(
      API_URL + `api/v1/user-types?limit=1&filter=name||$eq||${name}`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const getSubAdminUsers = (limit: number = 5, page: number = 1) => {
  config()["params"] = {};
  return axios
    .get(
      API_URL +
        `api/v1/sub-admin-post/sub-admin-users?limit=${limit}&page=${page}`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const GuidesServices = {
  getUserTypeID,
  getSubAdminUsers,
  registerSubAdmin,
};
export default GuidesServices;
