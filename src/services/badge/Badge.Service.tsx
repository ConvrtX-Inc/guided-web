import axios from "axios";
import AuthHeader from "../Auth-Header";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const config = (token?: string) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: AuthHeader(),
  },
  params: {
    /*'s': {
      badge_name: 'Fishing'
    }*/
  },
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
  return axios.get(API_URL + "api/v1/badges", config()).then((response) => {
    //console.log("from loaddata..");
    //console.log("load data", response);
    return response;
  });
};

const filterData = (data: any) => {
  const customConfig = () => ({
    headers: {
      "Content-Type": "application/json",
      Authorization: AuthHeader(),
    },
    params: {
      s: data,
    },
  });
  //console.log(customConfig());
  return axios
    .get(API_URL + "api/v1/badges", customConfig())
    .then((response) => {
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
