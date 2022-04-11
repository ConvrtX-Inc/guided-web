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

const postData = (data: any) => {
  return axios
    .post(API_URL + `api/v1/badges/`, data, config())
    .then((response) => {
      return response.data;
    });
};

const patchData = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/badges/${id}`, data, config())
    .then((response) => {
      return response;
    });
};

const loadData = () => {
  config()["params"] = {};
  return axios.get(API_URL + "api/v1/badges", config()).then((response) => {
    //console.log("from loaddata..");
    //console.log("load data", response);
    return response;
  });
};

const filterData = (data: any) => {
  config()["params"] = {
    s: data,
  };
  return axios.get(API_URL + "api/v1/badges", config()).then((response) => {
    console.log("from filterdata..");
    console.log("filter data", response);
    return response;
  });
};

const BadgeService = {
  patchData,
  postData,
  loadData,
  filterData,
};

export default BadgeService;
